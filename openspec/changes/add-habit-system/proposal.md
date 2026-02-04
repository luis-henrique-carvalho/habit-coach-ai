# Change: Add Core Habit System (MUST HAVE)

## Why

The habit system is the heart of the product. Without an efficient habit tracking system, there is no product. Users need a straightforward, fast way to:
- Create and manage habits with flexible frequency options
- Mark daily completions instantly (<300ms)
- View progress through streaks, heatmaps, and completion rates
- Receive timely reminders to stay engaged

This is the primary differentiator from competitors and the foundation for all downstream features (IA coaching, goal decomposition, dashboards).

## What Changes

**New Capability: Habit Management System**
- ✅ Create habits with name, description, and flexible frequency (daily, specific days, X times/week)
- ✅ Set preferred reminder time per habit
- ✅ Mark habits complete (today + backdating up to 7 days)
- ✅ Display daily checklist of habits
- ✅ Show detailed habit view: heatmap (90 days), current/record streaks, completion rates (30/60/90 days), trend graphs
- ✅ Edit or archive habits
- ✅ Enforce free tier limit (max 3 active habits), unlimited for Pro
- ✅ Performance: instant mark-complete (<300ms), dashboard load <2s, 100% streak accuracy

**Database Schema:**
- New tables: `habits`, `habit_completions` with proper constraints and indexes
- Enable efficient streak calculation and historical queries

**API Layer:**
- Server Actions for: create, update, archive, mark-complete
- Type-safe mutations with Zod validation

**UI Components:**
- Habit list view (today's checklist)
- Habit creation/edit form
- Habit detail view with analytics
- Heatmap visualization (90-day calendar)
- Streak display
- Completion rate charts
- IMPORTANT: Mobile-responsive design
- IMPORTANT: Use shadcn/ui components for consistency, if not intaled, install and configure it first.
- use `docs/DESIGN-GUIDELINES.md` for reference.

## Impact

- **Affected specs**: New capability - `habits` (habit-management, habit-analytics, habit-limits)
- **Affected code**:
  - New database schema files: `src/db/schema/habits.ts`
  - New server actions: `src/app/(private)/habits/actions/`
  - New UI components: `src/app/(private)/habits/components/`
  - New page: `src/app/(private)/habits/page.tsx`
  - Page modifications: `src/app/(private)/dashboard/page.tsx` (if needed)
  - New validation schemas: `src/app/(private)/habits/schemas/`
- **Breaking changes**: None
- **User-facing impact**: Core feature enabling the entire product experience
