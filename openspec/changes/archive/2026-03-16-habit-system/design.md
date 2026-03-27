## Context

The Habit Coach AI app has a complete auth system, DB schema for habits (`habit` + `habit_execution` tables), a shared UI component library (Radix/shadcn-based), and a protected dashboard layout. However, the entire habit feature module is missing — no routes, actions, components, or business logic exist yet. A previous attempt was removed (commit 7a805d9: "remove deprecated habit management components").

The project follows strict conventions from `docs/PATTERNS.md`: feature modules under `src/app/(private)/<feature>/`, async Server Components with `Suspense`, `next-safe-action` for mutations, React Hook Form + Zod for forms, and all text in pt-BR.

**Current state:**
- DB schema: ready (habit, habit_execution tables with indexes and constraints)
- Auth: middleware-based (cookie check), no `requireFullAuth()` helper — actions use `auth.api.getSession()` directly
- Safe action client: minimal setup (`createSafeActionClient()` with no middleware)
- Charting/date libraries: **not installed** (no recharts, date-fns, etc.)
- Dashboard: fully mocked/hardcoded data

## Goals / Non-Goals

**Goals:**
- Implement the full habit feature module following established project patterns
- Enable users to create, edit, archive, and complete habits with proper recurrence support
- Calculate and display streaks and completion rates accurately
- Provide a habit detail page with 90-day heatmap, stats, and trend visualization
- Enforce Free tier limit (max 3 active habits)
- All operations under 300ms for completions, dashboards under 2s

**Non-Goals:**
- Goal system integration (separate change)
- AI coaching/motivational messages on habit events (separate change)
- Notification/reminder system for preferred times (separate change)
- Dashboard home page integration (separate change — current dashboard is mocked)
- Offline support or real-time sync
- Dark mode considerations

## Decisions

### D1: Feature module structure follows PATTERNS.md conventions

The habits feature will live at `src/app/(private)/habits/` following the standard structure. The detail page uses a dynamic route at `src/app/(private)/habits/[id]/`.

```
src/app/(private)/habits/
├── page.tsx                           # List page (async Server Component)
├── [id]/
│   └── page.tsx                       # Detail page (async Server Component)
├── actions/
│   ├── index.ts                       # Re-exports
│   ├── get-habits.ts                  # Paginated query with search/filter
│   ├── get-habit-detail.ts            # Single habit + stats + executions
│   ├── upsert-habit.ts               # Create or update habit
│   ├── archive-habit.ts              # Soft-delete (isActive = false)
│   └── toggle-habit-completion.ts    # Mark/unmark completion for a date
├── components/
│   ├── habits-content.tsx             # Server Component (list page layout)
│   ├── habit-detail-content.tsx       # Server Component (detail page layout)
│   ├── add-habit-button.tsx           # Dialog trigger
│   ├── upsert-habit-form.tsx          # Create/edit form
│   ├── habit-card.tsx                 # Habit card for list view (name, streak, completion rate)
│   ├── habit-checklist.tsx            # Today's habits checklist with toggle
│   ├── habit-heatmap.tsx              # 90-day calendar heatmap
│   ├── habit-stats.tsx                # Streak, completion rate stats display
│   ├── habit-trend-chart.tsx          # Trend line chart (weekly completion)
│   └── table/
│       ├── table-columns.tsx          # Column definitions
│       └── table-actions.tsx          # Row actions (edit/archive)
├── hooks/
│   └── use-habits.ts                  # Shared hooks
└── schemas/
    └── upsert-habit-schema.ts         # Zod validation schema
```

**Rationale:** Matches the established pattern exactly. No architectural deviation needed.

### D2: Streak calculation — server-side on completion toggle

Streaks will be recalculated server-side in the `toggle-habit-completion` action. When a completion is added or removed, the action will:

1. Fetch all executions for the habit (ordered by `completedDate` DESC)
2. Walk backwards from today counting consecutive expected days (respecting recurrence type)
3. Update `currentStreak` and `longestStreak` on the habit record

**Alternative considered:** Cron job or scheduled recalculation. Rejected because completions are the only event that changes streaks, and calculating on-the-fly keeps data always consistent without extra infrastructure.

**Alternative considered:** Client-side calculation. Rejected because streak must be authoritative (used for milestones, AI messages in future), so it must be server-calculated.

### D3: Completion rate — calculated at query time, not stored

Completion rates (30/60/90 day windows) will be computed in the `get-habit-detail` action by counting executions vs expected completions within each window. Not stored in the DB.

**Rationale:** These are derived metrics that change daily. Storing them would require a daily cron to keep fresh. Computing on-demand for a single habit's executions (max 90 rows) is trivial and fast.

### D4: Install `date-fns` for date calculations

The project currently has no date library. Streak calculation, recurrence logic (is this habit due today?), and heatmap rendering all require reliable date math. `date-fns` is tree-shakeable, has no side effects, and is the de-facto standard.

**Alternative considered:** Native `Date` only. Rejected because weekday calculation, date ranges, and timezone-safe comparisons are error-prone with native Date.

### D5: Install `recharts` for trend chart

The detail page needs a weekly completion trend chart. `recharts` is React-native, composable, and widely used. It's also the default recommendation for shadcn/ui chart components.

**Alternative considered:** `chart.js` via `react-chartjs-2`. Rejected because recharts has better React integration and shadcn/ui has built-in chart components based on recharts.

### D6: Heatmap — custom component using CSS Grid

The 90-day calendar heatmap will be a custom component using CSS Grid (7 columns for days of week × ~13 rows). Each cell is colored by completion status. No external library needed.

**Rationale:** A heatmap is a simple grid of colored squares. Adding a library for this would be over-engineering. A ~50-line component with CSS grid handles it.

### D7: Habit list page uses card grid, not DataTable

The habits list page will use a card-based grid layout instead of the DataTable pattern used elsewhere. Habits are visual entities where users need to see streak, completion rate, and today's status at a glance — a table row doesn't serve this well.

**Alternative considered:** DataTable as per PATTERNS.md. Rejected because habits are not tabular data — users interact with them daily (check/uncheck), and cards provide better UX for this interaction pattern. The DataTable pattern is better suited for entity management (CRUD lists), while habits need a more interactive, visual layout.

### D8: Tier limit enforcement — server-side only

The Free tier limit (3 active habits) is enforced in the `upsert-habit` action by counting active habits before insert. The client shows a message when the limit is reached but does not independently enforce it.

**Rationale:** Server-side is the only trustworthy enforcement. Client-side checks are UX helpers, not security.

### D9: Auth in actions — use `auth.api.getSession()` directly

Since there's no `requireFullAuth()` helper and the `actionClient` has no auth middleware, each action will call `auth.api.getSession({ headers: await headers() })` directly, following the existing pattern in PATTERNS.md.

### D10: Retroactive completion — up to 7 days back

The `toggle-habit-completion` action accepts a `date` parameter. Validation ensures the date is not in the future and not more than 7 days in the past. The `habit_execution` unique constraint on `(habitId, completedDate)` prevents double-completion for the same day.

## Risks / Trade-offs

**[Risk] Streak calculation on every toggle could be slow for long-lived habits** → Mitigation: Query only completions from the last 365 days for streak calculation. Even at daily frequency, that's max 365 rows — negligible.

**[Risk] No charting library currently installed — adds bundle size** → Mitigation: `recharts` is tree-shakeable. Only import needed chart types. The trend chart is on the detail page (lazy-loaded via dynamic route), not on the main list.

**[Risk] Completion rate computed on-the-fly may slow detail page** → Mitigation: Single SQL query with COUNT + date filter. For 90 days of data, this is sub-millisecond. Can add caching later if needed.

**[Risk] Heatmap custom component may have edge cases with timezones** → Mitigation: All dates stored as `date` type (no timezone). Use `date-fns` `startOfDay` consistently. The `completedDate` column is already a `date` (not timestamp).

**[Risk] Card layout deviates from PATTERNS.md DataTable convention** → Mitigation: This is intentional for UX reasons. The card components still follow the same file organization pattern. TableActions equivalent is embedded in each card.
