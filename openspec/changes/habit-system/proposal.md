## Why

The habit tracking system is the core of Habit Coach AI — without it, the product has no foundation. The DB schema (`habit` + `habit_execution` tables) already exists, but there are no routes, server actions, UI components, or business logic implemented. Users need to create, track, and visualize habits daily to get value from the platform. This is the MUST-have feature that everything else (goals, AI coaching, dashboards) builds upon.

## What Changes

- Add `/habits` route with paginated list of active habits, search, and filtering
- Add habit creation form with name, description, recurrence type (daily / specific weekdays / X times per week), and preferred reminder time
- Add habit editing and archiving (soft delete via `isActive` flag)
- Add `/habits/[id]` detail page with calendar/heatmap (90 days), streak stats, completion rate (30/60/90 days), and trend chart
- Add daily checklist view showing today's due habits with one-tap completion
- Add habit completion action supporting today + up to 7 days retroactively
- Add streak calculation logic (current streak, longest streak) that updates on every completion/uncompletion
- Enforce Free tier limit: max 3 active habits (Pro unlimited)
- Add completion rate calculations (30/60/90 day windows)

## Capabilities

### New Capabilities
- `habit-management`: CRUD operations for habits — create, read, update, archive. Includes form validation, tier limits (3 active for Free), recurrence configuration, and preferred time setting.
- `habit-tracking`: Daily habit completion tracking — mark/unmark habits as complete, retroactive completion (up to 7 days), streak calculation (current + longest), and completion rate stats (30/60/90 days).
- `habit-dashboard`: Habit listing and visualization — paginated habit list with search/filter, daily checklist view, habit detail page with 90-day calendar/heatmap, streak display, completion rates, and trend chart.

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Routes**: New `src/app/(private)/habits/` feature module (page, actions, components, schemas, hooks) and `src/app/(private)/habits/[id]/` detail page
- **Server Actions**: `create-habit`, `update-habit`, `archive-habit`, `toggle-habit-completion`, `get-habits`, `get-habit-detail`, `get-habit-stats`
- **DB**: No schema changes needed — `habit` and `habit_execution` tables already exist with correct structure
- **Dependencies**: May need `date-fns` for date calculations, a charting library (e.g., `recharts`) for trend graphs, and a heatmap component for the calendar view
- **Shared components**: Will use existing `PageContainer`, `PageHeader`, `DataTable`, `SearchInput`, `DynamicPagination` from the established patterns
