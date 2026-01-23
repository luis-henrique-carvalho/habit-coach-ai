# Design: Habit Management

## Architecture Overview

The habit management module follows the established Next.js App Router patterns with Server Components, Server Actions, and Drizzle ORM for type-safe database operations.

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Habit List Page │  │ Habit Detail Page│                │
│  │  (Server Comp)   │  │  (Server Comp)   │                │
│  └────────┬─────────┘  └────────┬─────────┘                │
│           │                     │                            │
│  ┌────────▼─────────────────────▼─────────┐                │
│  │    Client Components (Interactive)      │                │
│  │  - HabitForm ('use client')             │                │
│  │  - HabitCheckbox ('use client')         │                │
│  │  - RecurrenceConfig ('use client')      │                │
│  └────────┬────────────────────────────────┘                │
└───────────┼─────────────────────────────────────────────────┘
            │ Server Action calls
┌───────────▼─────────────────────────────────────────────────┐
│                      Server Actions Layer                    │
│  ┌──────────────────────────────────────────────┐           │
│  │  Zod Schemas (habit-schema.ts)              │           │
│  └──────────────────────────────────────────────┘           │
│  ┌──────────────────────────────────────────────┐           │
│  │  Actions (next-safe-action)                 │           │
│  │  - createHabit                               │           │
│  │  - updateHabit                               │           │
│  │  - deleteHabit                               │           │
│  │  - getHabits                                 │           │
│  │  - getHabitById                              │           │
│  │  - completeHabit (execution)                │           │
│  └────────┬─────────────────────────────────────┘           │
└───────────┼─────────────────────────────────────────────────┘
            │ Database queries
┌───────────▼─────────────────────────────────────────────────┐
│                     Database Layer (Drizzle)                 │
│  ┌──────────────────────────────────────────────┐           │
│  │  Tables:                                     │           │
│  │  - habit                                     │           │
│  │  - habit_recurrence                          │           │
│  │  - habit_execution                           │           │
│  └──────────────────────────────────────────────┘           │
│                  PostgreSQL Database                         │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema Design

### Design Decision: Separate Recurrence Table

**Rationale:** Initially considered storing recurrence configuration as JSONB in the habit table. However, a separate table provides:
- Better type safety with Drizzle
- Easier querying for recurrence-specific operations
- Clear separation of concerns
- Simpler schema evolution

### Tables

#### 1. `habit`
Core habit information.

```typescript
{
  id: text (uuid, PK)
  userId: text (FK -> user.id, indexed)
  name: text (required)
  description: text (nullable)
  isActive: boolean (default true)
  currentStreak: integer (default 0)
  longestStreak: integer (default 0)
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Indexes:**
- `habit_userId_idx` on `userId` (frequent queries by user)
- `habit_isActive_idx` on `isActive` (filtering active habits)

#### 2. `habit_recurrence`
Recurrence configuration. One-to-one relationship with habit.

```typescript
{
  id: text (uuid, PK)
  habitId: text (FK -> habit.id, unique, indexed)
  type: enum ('daily', 'weekly', 'monthly', 'annual')
  
  // Type-specific fields (nullable, validated by type)
  intervalDays: integer (for daily)
  weekdays: integer[] (for weekly, 0=Sunday, 6=Saturday)
  intervalMonths: integer (for monthly)
  intervalYears: integer (for annual)
  
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Indexes:**
- `habit_recurrence_habitId_idx` on `habitId`

**Validation Rules:**
- `type = 'daily'` → `intervalDays` must be ≥ 1, others null
- `type = 'weekly'` → `weekdays` must have 1-7 unique values [0-6], others null
- `type = 'monthly'` → `intervalMonths` must be ≥ 1, others null
- `type = 'annual'` → `intervalYears` must be ≥ 1, others null

#### 3. `habit_execution`
Records of habit completions.

```typescript
{
  id: text (uuid, PK)
  habitId: text (FK -> habit.id, indexed)
  completedAt: timestamp (indexed)
  completedDate: date (indexed) // Normalized date for easy queries
  createdAt: timestamp
}
```

**Indexes:**
- `habit_execution_habitId_idx` on `habitId`
- `habit_execution_completedDate_idx` on `completedDate`
- Composite: `habit_execution_habitId_completedDate_idx` on `(habitId, completedDate)` UNIQUE

**Unique Constraint:** One execution per habit per day (prevents duplicate completions)

### Cascading Deletes

```
user (DELETE) 
  → habit (CASCADE) 
    → habit_recurrence (CASCADE)
    → habit_execution (CASCADE)
```

When a habit is deleted (archived), all related recurrence and execution records are also deleted.

## Recurrence Logic

### Algorithm: Determine Active Days

For a given habit and date range, determine which days the habit should be active:

#### Daily Recurrence
```typescript
function getDailyActiveDays(startDate: Date, intervalDays: number): Date[] {
  // Every Nth day from startDate
  // E.g., intervalDays=1 → daily, intervalDays=2 → every other day
}
```

#### Weekly Recurrence
```typescript
function getWeeklyActiveDays(weekdays: number[]): Date[] {
  // Return dates matching specified weekdays
  // E.g., weekdays=[5,6,0] → Friday, Saturday, Sunday
}
```

#### Monthly Recurrence
```typescript
function getMonthlyActiveDays(startDate: Date, intervalMonths: number): Date[] {
  // Same day of month every N months
  // E.g., created on 15th, intervalMonths=1 → 15th of every month
}
```

#### Annual Recurrence
```typescript
function getAnnualActiveDays(startDate: Date, intervalYears: number): Date[] {
  // Same day/month every N years
  // E.g., created on Jan 15, intervalYears=1 → Jan 15 every year
}
```

### Streak Calculation Algorithm

**Current Streak:** Count of consecutive active days (working backward from today) where the habit was completed.

```typescript
function calculateCurrentStreak(habit: Habit, executions: Execution[]): number {
  const today = new Date()
  let streak = 0
  let checkDate = today
  
  // Get all active dates from recurrence config
  const activeDates = getActiveDates(habit.recurrence, checkDate)
  
  // Sort executions by date descending
  const sortedExecutions = executions.sort((a, b) => b.completedDate - a.completedDate)
  
  // Iterate backwards from today
  while (true) {
    // Is checkDate an active day?
    if (!isActiveDay(checkDate, habit.recurrence)) {
      // Skip non-active days
      checkDate = previousDay(checkDate)
      continue
    }
    
    // Active day: was it completed?
    const executed = sortedExecutions.find(e => sameDate(e.completedDate, checkDate))
    
    if (!executed) {
      // Active day not completed → streak broken
      break
    }
    
    // Increment streak and move to previous day
    streak++
    checkDate = previousDay(checkDate)
  }
  
  return streak
}
```

**Longest Streak:** Maximum streak ever achieved. Updated whenever current streak surpasses it.

```typescript
function updateStreaks(habit: Habit): void {
  const currentStreak = calculateCurrentStreak(habit, executions)
  const longestStreak = Math.max(currentStreak, habit.longestStreak)
  
  // Update database
  await db.update(habitTable)
    .set({ currentStreak, longestStreak })
    .where(eq(habitTable.id, habit.id))
}
```

### Edge Cases

| Case | Behavior |
|------|----------|
| First execution | Current streak = 1, Longest streak = 1 |
| Missed active day | Current streak resets to 0, Longest streak preserved |
| Execution on non-active day | Rejected with validation error |
| Retroactive completion (≤7 days) | Allowed, recalculates streak from that date forward |
| Retroactive completion (>7 days) | Rejected with validation error |
| Concurrent completions | Prevented by unique constraint on `(habitId, completedDate)` |
| Timezone handling | All dates normalized to user's timezone (future: user profile setting) |

## Server Actions Design

### Pattern: Type-Safe Actions with `next-safe-action`

All mutations use `next-safe-action` for:
- Automatic Zod validation
- Type inference
- Error handling
- Loading states

```typescript
// Example: Create Habit Action
import { action } from "@/lib/safe-action"
import { z } from "zod"

const createHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  recurrence: z.object({
    type: z.enum(['daily', 'weekly', 'monthly', 'annual']),
    intervalDays: z.number().min(1).optional(),
    weekdays: z.array(z.number().min(0).max(6)).optional(),
    intervalMonths: z.number().min(1).optional(),
    intervalYears: z.number().min(1).optional(),
  }).refine(/* validation for type-specific fields */)
})

export const createHabit = action
  .schema(createHabitSchema)
  .action(async ({ parsedInput, ctx }) => {
    // Get authenticated user
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) throw new Error("Unauthorized")
    
    // Check free tier limit (3 habits)
    const habitCount = await getHabitCount(session.user.id)
    if (habitCount >= 3 && !session.user.isPro) {
      throw new Error("Upgrade to Pro for unlimited habits")
    }
    
    // Create habit and recurrence in transaction
    const habit = await db.transaction(async (tx) => {
      const [habit] = await tx.insert(habitTable).values({
        userId: session.user.id,
        name: parsedInput.name,
        description: parsedInput.description,
      }).returning()
      
      await tx.insert(habitRecurrenceTable).values({
        habitId: habit.id,
        type: parsedInput.recurrence.type,
        intervalDays: parsedInput.recurrence.intervalDays,
        weekdays: parsedInput.recurrence.weekdays,
        intervalMonths: parsedInput.recurrence.intervalMonths,
        intervalYears: parsedInput.recurrence.intervalYears,
      })
      
      return habit
    })
    
    revalidatePath('/habits')
    return { habit }
  })
```

### Actions List

1. **`createHabit`** - Create new habit with recurrence
2. **`updateHabit`** - Update habit details or recurrence
3. **`deleteHabit`** - Soft delete (set `isActive = false`)
4. **`getHabits`** - List all user's habits (with filters)
5. **`getHabitById`** - Get single habit with full details
6. **`completeHabit`** - Mark habit as completed for a date
7. **`uncompleteHabit`** - Remove execution (undo completion)

## UI Component Structure

### Pages

```
app/(private)/habits/
├── page.tsx                    # Habit list (Server Component)
├── [id]/
│   └── page.tsx               # Habit detail (Server Component)
├── new/
│   └── page.tsx               # Create habit (Server Component)
├── actions/
│   ├── index.ts               # Export all actions
│   ├── create-habit.ts
│   ├── update-habit.ts
│   ├── delete-habit.ts
│   ├── get-habits.ts
│   ├── get-habit-by-id.ts
│   └── complete-habit.ts
├── components/
│   ├── habit-form.tsx         # Client Component (form)
│   ├── habit-list.tsx         # Server Component (display)
│   ├── habit-card.tsx         # Client Component (interactive)
│   ├── habit-checkbox.tsx     # Client Component (quick complete)
│   ├── recurrence-config.tsx  # Client Component (form section)
│   ├── streak-badge.tsx       # Server Component (display)
│   └── habit-calendar.tsx     # Client Component (heatmap)
└── schemas/
    └── habit-schema.ts        # Shared Zod schemas
```

### Key Components

**HabitForm** (`'use client'`)
- Form for creating/editing habits
- Uses React Hook Form + Zod validation
- Recurrence configuration section
- Preview of active days

**RecurrenceConfig** (`'use client'`)
- Sub-component of HabitForm
- Dynamic fields based on recurrence type
- Visual examples/hints

**HabitCheckbox** (`'use client'`)
- Quick completion toggle
- Optimistic UI update
- Server Action call
- Instant visual feedback

**HabitCalendar** (`'use client'`)
- Heatmap visualization (react-calendar-heatmap or custom)
- Shows executions over time
- Color intensity based on streaks

## Performance Considerations

### Query Optimization

1. **Habit List Query**
   ```sql
   SELECT h.*, hr.*, 
          COUNT(he.id) as total_completions
   FROM habit h
   LEFT JOIN habit_recurrence hr ON h.id = hr.habit_id
   LEFT JOIN habit_execution he ON h.id = he.habit_id
   WHERE h.user_id = ? AND h.is_active = true
   GROUP BY h.id
   ```

2. **Habit Detail Query**
   ```sql
   -- Main habit data
   SELECT * FROM habit WHERE id = ?
   
   -- Recurrence config
   SELECT * FROM habit_recurrence WHERE habit_id = ?
   
   -- Last 90 days of executions
   SELECT * FROM habit_execution 
   WHERE habit_id = ? 
     AND completed_date >= CURRENT_DATE - INTERVAL '90 days'
   ORDER BY completed_date DESC
   ```

### Caching Strategy

- Use Next.js `revalidatePath` after mutations
- Server Components fetch fresh data on navigation
- Client-side optimistic updates for immediate feedback

### Pagination

- Habit list: initially show all (limited by free tier max 3, Pro unlimited but reasonable)
- Executions: paginate at 90 days chunks (performance threshold)

## Testing Strategy

### Unit Tests
- Recurrence logic functions (pure functions)
- Streak calculation algorithm
- Validation schemas

### Integration Tests
- Server Actions (mock database)
- Database queries (test database)

### E2E Tests (Playwright)
- Create habit flow
- Complete habit flow
- Streak visualization
- Edge case scenarios

## Migration Strategy

1. Create migration file with all 3 tables
2. Seed development database with sample data
3. Run tests to verify schema
4. Deploy to staging
5. Deploy to production

```typescript
// Example migration (Drizzle)
import { sql } from 'drizzle-orm'

export default async function migrate(db) {
  await db.execute(sql`
    CREATE TABLE habit (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE INDEX habit_userId_idx ON habit(user_id);
    CREATE INDEX habit_isActive_idx ON habit(is_active);
    
    -- Additional tables...
  `)
}
```

## Security Considerations

1. **Authorization:** Every Server Action verifies user session
2. **Data Isolation:** All queries filter by `userId`
3. **Input Validation:** Zod schemas validate all inputs
4. **SQL Injection:** Drizzle ORM prevents SQL injection
5. **Rate Limiting:** (Future) Add rate limiting to prevent abuse

## Open Questions

1. **Timezone Handling:** Use server timezone or user profile setting?
   - **Decision:** Start with server timezone (UTC), add user timezone in future
   
2. **Habit Archival:** Soft delete or hard delete?
   - **Decision:** Soft delete (`isActive = false`) to preserve history

3. **Maximum Retroactive Days:** 7 days reasonable?
   - **Decision:** Yes, prevents data manipulation while allowing flexibility

4. **Streak Calculation Performance:** Calculate on-demand or pre-compute?
   - **Decision:** Calculate on completion, cache in `habit` table columns
