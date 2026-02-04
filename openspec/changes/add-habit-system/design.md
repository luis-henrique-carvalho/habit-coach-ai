# Design: Core Habit System

## Context

The habit system is the MVP's core feature. It must be fast, reliable, and foundational for all downstream features (IA coaching, goal integration, analytics). The system spans:
- **Database layer**: Habit and completion tracking with efficient streak calculations
- **API layer**: Type-safe server actions with Zod validation
- **UI layer**: Multiple views (list, detail, analytics)
- **Business logic**: Streak calculation, completion rate, free tier limits

## Goals

- **Goals**:
  - Enable users to create and track habits instantly (<30s creation, <300ms mark-complete)
  - Calculate streaks with 100% accuracy (single source of truth)
  - Support flexible frequency patterns (daily, specific days, X times/week)
  - Enforce freemium model constraints (max 3 active habits free tier)
  - Load habit dashboards in <2 seconds
  - Provide foundation for IA coaching and analytics features

- **Non-Goals**:
  - Habit templates or categories (v2 feature)
  - Collaborative/shared habits
  - Notifications/reminders delivery (backend only, no service integrations in MVP)
  - Mobile app (responsive web only)

## Architecture Decisions

### 1. Streak Calculation Strategy

**Decision**: Single-pass SQL calculation at query time, cached with explicit invalidation.

**Reasoning**:
- Avoids denormalization complexity and sync bugs
- Streak is cheap to calculate (<100ms) with proper indexes
- Simpler code path than maintaining computed columns
- Can add caching layer if performance bottleneck emerges

**Schema**:
```sql
-- habits table: core habit definition
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  frequency VARCHAR(50), -- 'daily', 'specific_days', 'weekly_count'
  frequency_value JSON, -- {days: [1,3,5]} or {count: 3}
  preferred_time TIME,
  created_at TIMESTAMP,
  archived_at TIMESTAMP, -- soft delete
  UNIQUE(user_id, name)
);

-- habit_completions table: daily/timestamped records
CREATE TABLE habit_completions (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER NOT NULL,
  completed_date DATE NOT NULL, -- allows backdating
  created_at TIMESTAMP,
  UNIQUE(habit_id, completed_date) -- no duplicates same day
);
```

### 2. Frequency Model

**Decision**: Flexible JSON-based frequency definition, computed at runtime.

**Pattern**:
- `daily`: Always required (default)
- `specific_days`: `{type: 'specific_days', days: [0,2,4]}` (0=Sunday, Monday=1, etc.)
- `weekly_count`: `{type: 'weekly_count', count: 3}` (3 times per week, any days)

**Rationale**:
- Flexible without complex enum proliferation
- Easy to extend for future patterns
- Simple validation with Zod

### 3. Free Tier Limit Enforcement

**Decision**: Check at creation/update time; enforce in application layer (server action).

**Approach**:
```sql
SELECT COUNT(*) FROM habits
WHERE user_id = $1 AND archived_at IS NULL
```

Then validate: `if (count >= 3 && plan === 'free') throw TierError`

**Rationale**:
- Clearer error messaging at application layer
- Easier to test and reason about
- Can implement upgrade upsells in error handling

### 4. Performance Optimization

**Indexes**:
```sql
CREATE INDEX habits_user_id_archived ON habits(user_id, archived_at);
CREATE INDEX habit_completions_habit_date ON habit_completions(habit_id, completed_date);
CREATE INDEX habit_completions_date_range ON habit_completions(habit_id, completed_date DESC);
```

**Streak Query** (O(n) where n = streak length, typically <365):
```sql
WITH RECURSIVE streak_calc AS (
  SELECT completed_date, ROW_NUMBER() OVER (ORDER BY completed_date DESC) as rn
  FROM habit_completions
  WHERE habit_id = $1
  ORDER BY completed_date DESC
  LIMIT 100 -- Safety limit
)
SELECT COUNT(*) as streak_length
FROM streak_calc
WHERE DATE_SUB(completed_date, INTERVAL (rn - 1) DAY) = CURRENT_DATE
```

### 5. UI Architecture

**Components**:
- `HabitList` - Daily checklist view (server component for initial data)
- `HabitCard` - Individual habit summary (mark-complete button)
- `HabitDetail` - Full analytics view (heatmap, streak, rates)
- `HabitForm` - Create/edit modal
- `HabitHeatmap` - 90-day calendar visualization
- `CompletionChart` - Trend line/bar chart

**State Management**:
- Server state (initial data fetches via server actions)
- Client optimism for mark-complete (instant UI feedback, background sync)

## Decisions

| Decision | What & Why | Alternatives Considered |
|----------|-----------|------------------------|
| **Streak Calculation** | SQL query at request time with safe recursion limit | Denormalized column (sync risk) / Materialized view (cache invalidation complexity) |
| **Frequency Model** | JSON flexible pattern, validated at runtime | Enum with migration hell / String patterns with parsing |
| **Free Tier Check** | Application layer validation | Database trigger (hard to test) / Client-side (security risk) |
| **Deletion** | Soft delete (archived_at) | Hard delete (lose history, complicates streak) |
| **Backdating** | Allowed up to 7 days via `completed_date` | Fixed date only (UX friction) / Unlimited (gaming/audit risk) |

## Risks & Trade-offs

| Risk | Mitigation |
|------|-----------|
| Streak calculation gets slow as history grows | Indexes + query optimization; can add caching if <2s SLA breached |
| Free tier limit circumvented via API | Validate at server action layer, not client; monitor usage anomalies |
| Soft deletes confuse historical queries | Document clearly; always include `archived_at IS NULL` in queries |
| Mark-complete race condition (double-tap) | Database unique constraint on (habit_id, completed_date); idempotent update |

## Migration Plan

**Phase 1: Database**
- Create schema with indexes
- Add user_id foreign key and constraints

**Phase 2: API Layer**
- Implement server actions (create, update, archive, mark-complete)
- Add Zod schemas for validation
- Test with unit tests

**Phase 3: UI**
- Build habit list and daily checklist
- Build detail view with heatmap
- Integrate mark-complete with optimistic updates

**Phase 4: Polish**
- Add animations/transitions
- Optimize queries if needed
- Add analytics hooks

**Rollback**:
- If critical bug emerges, archive all features (set `archived_at = NOW()` for all habits)
- Users can still view history via archived view

## Open Questions

1. **Notification/Reminder Delivery**: Should MVP support actual push notifications, or just backend readiness? → Answer: Backend only (ready for v2), no active delivery in MVP.
2. **Timezone Handling**: How to handle users in different timezones for "today"? → Answer: Store as DATE in user's local timezone, apply `AT TIME ZONE` in queries if needed.
3. **Habit Import**: Should users be able to import existing habits from CSV/other apps? → Answer: No (v2 feature). Manual creation only in MVP.
4. **Analytics Delay**: Should completion stats update in real-time or batch? → Answer: Real-time (query-based, always current).
