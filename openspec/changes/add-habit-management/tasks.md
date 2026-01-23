# Tasks: Add Habit Management

Implementation checklist for the Habit Management module. Complete tasks in order for incremental, verifiable progress.

## Phase 1: Database Foundation

- [ ] **Task 1.1: Create database schema file**
  - Create `src/db/schema/habit-schema.ts`
  - Define `habit` table with all fields (id, userId, name, description, isActive, currentStreak, longestStreak, timestamps)
  - Add indexes on `userId` and `isActive`
  - Add foreign key to `user` table with cascade delete
  - Export table and relations

- [ ] **Task 1.2: Create recurrence table**
  - In `src/db/schema/habit-schema.ts`, define `habitRecurrence` table
  - Add fields: id, habitId, type (enum), intervalDays, weekdays (integer array), intervalMonths, intervalYears
  - Add unique constraint on `habitId`
  - Add foreign key to `habit` table with cascade delete
  - Define Drizzle relations (one-to-one)

- [ ] **Task 1.3: Create execution table**
  - In `src/db/schema/habit-schema.ts`, define `habitExecution` table
  - Add fields: id, habitId, completedAt (timestamp), completedDate (date), createdAt
  - Add composite unique constraint on `(habitId, completedDate)`
  - Add indexes on `habitId` and `completedDate`
  - Add foreign key to `habit` table with cascade delete
  - Define Drizzle relations (one-to-many)

- [ ] **Task 1.4: Export schema from index**
  - Update `src/db/schema/index.ts` to export habit schema
  - Verify types are exported correctly

- [ ] **Task 1.5: Generate and run migration**
  - Run `pnpm drizzle-kit generate` to create migration
  - Review generated SQL
  - Run `pnpm drizzle-kit push` to apply migration
  - Verify tables exist in database
  - Verify indexes and constraints are created

**Validation:** Query database to confirm all tables, indexes, and constraints exist.

---

## Phase 2: Zod Validation Schemas

- [ ] **Task 2.1: Create base Zod schemas**
  - Create `src/app/(private)/habits/schemas/habit-schema.ts`
  - Define `recurrenceTypeEnum` (daily, weekly, monthly, annual)
  - Create `recurrenceSchema` with discriminated union based on type:
    - Daily: requires `intervalDays` (min 1)
    - Weekly: requires `weekdays` (array of 1-7 values, each 0-6)
    - Monthly: requires `intervalMonths` (min 1)
    - Annual: requires `intervalYears` (min 1)
  - Create `createHabitSchema` with name (min 1, max 100), description (max 500, optional), recurrence
  - Create `updateHabitSchema` with partial fields

- [ ] **Task 2.2: Create execution schemas**
  - In same file, create `completeHabitSchema`:
    - habitId (uuid string)
    - completedDate (date string, parsed to Date)
    - Validation: completedDate not in future
    - Validation: completedDate not older than 7 days
  - Create `uncompleteHabitSchema` with habitId and completedDate

- [ ] **Task 2.3: Export all schemas**
  - Export schemas and their TypeScript types
  - Add JSDoc comments for clarity

**Validation:** Import schemas in a test file and verify type inference works.

---

## Phase 3: Core Business Logic (Utils)

- [ ] **Task 3.1: Create recurrence utils**
  - Create `src/lib/utils/recurrence.ts`
  - Implement `isActiveDay(date: Date, recurrence: Recurrence): boolean`
    - Handle all 4 recurrence types
    - Account for interval calculations
  - Add unit tests for each recurrence type
  - Test edge cases (leap years, month boundaries, etc.)

- [ ] **Task 3.2: Create streak calculation utils**
  - Create `src/lib/utils/streak.ts`
  - Implement `calculateCurrentStreak(habit: Habit, executions: Execution[], recurrence: Recurrence): number`
    - Iterate backwards from today
    - Skip non-active days
    - Count consecutive active completions
  - Implement `shouldUpdateLongestStreak(current: number, longest: number): number`
  - Add comprehensive unit tests with various scenarios

- [ ] **Task 3.3: Create date utils**
  - Create `src/lib/utils/date.ts`
  - Implement `isSameDate(date1: Date, date2: Date): boolean`
  - Implement `subtractDays(date: Date, days: number): Date`
  - Implement `isWithinDays(date: Date, days: number): boolean`
  - Implement `normalizeDateToMidnight(date: Date): Date`
  - Add unit tests

**Validation:** Run unit tests with 100% coverage for utils.

---

## Phase 4: Server Actions (Queries)

- [ ] **Task 4.1: Create get-habits action**
  - Create `src/app/(private)/habits/actions/get-habits.ts`
  - Implement `getHabits` Server Action
  - Verify user session with Better Auth
  - Query habits with recurrence and execution counts
  - Filter by `isActive` (default true, optional param for archived)
  - Order by createdAt DESC
  - Return typed array of habits
  - Add error handling

- [ ] **Task 4.2: Create get-habit-by-id action**
  - Create `src/app/(private)/habits/actions/get-habit-by-id.ts`
  - Implement `getHabitById` Server Action
  - Accept habitId parameter
  - Verify user session
  - Query habit with recurrence
  - Query last 90 days of executions
  - Verify ownership (habit.userId === session.user.id)
  - Return habit with full details or null
  - Add error handling

- [ ] **Task 4.3: Create get-habit-count action**
  - Create `src/app/(private)/habits/actions/get-habit-count.ts`
  - Implement `getHabitCount` Server Action
  - Count active habits for current user
  - Used for free tier limit check
  - Return count as number

- [ ] **Task 4.4: Export all query actions**
  - Create `src/app/(private)/habits/actions/index.ts`
  - Export all actions
  - Verify TypeScript types are exported

**Validation:** Test actions in isolation with mock database calls.

---

## Phase 5: Server Actions (Mutations)

- [ ] **Task 5.1: Create create-habit action**
  - Create `src/app/(private)/habits/actions/create-habit.ts`
  - Use `next-safe-action` with `createHabitSchema`
  - Verify user session
  - Check free tier limit (call `getHabitCount`, block if >= 3 and not Pro)
  - Generate UUID for habit
  - Insert habit and recurrence in transaction
  - Set initial streaks to 0
  - Revalidate `/habits` path
  - Return created habit
  - Add comprehensive error handling

- [ ] **Task 5.2: Create update-habit action**
  - Create `src/app/(private)/habits/actions/update-habit.ts`
  - Use `next-safe-action` with `updateHabitSchema`
  - Verify user session and ownership
  - Update habit fields
  - If recurrence changed, update in transaction
  - If recurrence changed, recalculate current streak
  - Revalidate paths
  - Return updated habit

- [ ] **Task 5.3: Create delete-habit action**
  - Create `src/app/(private)/habits/actions/delete-habit.ts`
  - Use `next-safe-action`
  - Verify user session and ownership
  - Soft delete: set `isActive = false`
  - Revalidate `/habits` path
  - Return success boolean

- [ ] **Task 5.4: Create complete-habit action**
  - Create `src/app/(private)/habits/actions/complete-habit.ts`
  - Use `next-safe-action` with `completeHabitSchema`
  - Verify user session and ownership
  - Load habit with recurrence
  - Validate `completedDate` is an active day (use `isActiveDay` util)
  - Check for duplicate (unique constraint will also catch this)
  - Insert execution record
  - Recalculate and update streaks in transaction
  - Revalidate paths
  - Return updated streaks

- [ ] **Task 5.5: Create uncomplete-habit action**
  - Create `src/app/(private)/habits/actions/uncomplete-habit.ts`
  - Use `next-safe-action` with `uncompleteHabitSchema`
  - Verify user session and ownership
  - Delete execution record for given date
  - Recalculate streaks
  - Revalidate paths
  - Return updated streaks

- [ ] **Task 5.6: Export all mutation actions**
  - Update `src/app/(private)/habits/actions/index.ts`
  - Export all mutation actions

**Validation:** Test each action manually via API calls or temporary test page.

---

## Phase 6: UI Components (Base)

- [ ] **Task 6.1: Create HabitCard component**
  - Create `src/app/(private)/habits/components/habit-card.tsx`
  - Mark as Server Component
  - Display habit name, description, current streak
  - Show recurrence type summary
  - Add link to detail page
  - Add Delete button (client island)

- [ ] **Task 6.2: Create HabitCheckbox component**
  - Create `src/app/(private)/habits/components/habit-checkbox.tsx`
  - Mark as Client Component (`'use client'`)
  - Accept habitId, isCompletedToday, isActiveToda as props
  - Use `useOptimistic` for immediate feedback
  - Call `completeHabit` or `uncompleteHabit` action
  - Show loading state during mutation
  - Handle errors with toast notification

- [ ] **Task 6.3: Create StreakBadge component**
  - Create `src/app/(private)/habits/components/streak-badge.tsx`
  - Mark as Server Component
  - Display current streak with fire emoji 🔥
  - Highlight milestones (7, 14, 30, 60, 90 days)
  - Show longest streak as secondary info

- [ ] **Task 6.4: Create RecurrenceConfig component**
  - Create `src/app/(private)/habits/components/recurrence-config.tsx`
  - Mark as Client Component
  - Accept React Hook Form control
  - Render different fields based on recurrence type:
    - Daily: number input for interval
    - Weekly: checkboxes for days of week
    - Monthly: number input for interval
    - Annual: number input for interval
  - Display helpful examples/hints
  - Show validation errors inline

**Validation:** Test components in Storybook or isolated page.

---

## Phase 7: UI Components (Forms)

- [ ] **Task 7.1: Create HabitForm component**
  - Create `src/app/(private)/habits/components/habit-form.tsx`
  - Mark as Client Component
  - Use React Hook Form with Zod resolver (`createHabitSchema`)
  - Fields: name, description, recurrence type, recurrence config
  - Integrate `RecurrenceConfig` sub-component
  - Handle form submission with `createHabit` action
  - Show loading state and disable form during submission
  - Display success/error messages
  - Redirect to `/habits` on success

- [ ] **Task 7.2: Create HabitEditForm component**
  - Create `src/app/(private)/habits/components/habit-edit-form.tsx`
  - Similar to HabitForm but pre-populated with existing data
  - Use `updateHabitSchema`
  - Warn user if changing recurrence (affects streak)
  - Call `updateHabit` action
  - Revalidate and show updated data

**Validation:** Manually test form submission and validation.

---

## Phase 8: Pages

- [ ] **Task 8.1: Create habits list page**
  - Create `src/app/(private)/habits/page.tsx`
  - Mark as Server Component
  - Call `getHabits` action to fetch data
  - Display habits using `HabitCard` components
  - Add filter toggle for showing archived habits
  - Add "Create Habit" button linking to `/habits/new`
  - Handle empty state with helpful message

- [ ] **Task 8.2: Create new habit page**
  - Create `src/app/(private)/habits/new/page.tsx`
  - Mark as Server Component
  - Render `HabitForm` component
  - Add page title "Create New Habit"
  - Add back button to `/habits`

- [ ] **Task 8.3: Create habit detail page**
  - Create `src/app/(private)/habits/[id]/page.tsx`
  - Mark as Server Component
  - Call `getHabitById` action with ID from params
  - Handle 404 if habit not found
  - Handle 403 if not owned by user
  - Display habit details, recurrence info, streaks
  - Add Edit and Delete buttons
  - Add completion checkbox for today

- [ ] **Task 8.4: Create habit edit page**
  - Create `src/app/(private)/habits/[id]/edit/page.tsx`
  - Mark as Server Component
  - Fetch habit with `getHabitById`
  - Render `HabitEditForm` pre-populated with data
  - Add back button to detail page

**Validation:** Navigate through all pages and verify data flows correctly.

---

## Phase 9: Advanced UI Components

- [ ] **Task 9.1: Create HabitCalendar component**
  - Create `src/app/(private)/habits/components/habit-calendar.tsx`
  - Mark as Client Component
  - Install `react-calendar-heatmap` or similar library
  - Accept executions and recurrence as props
  - Render last 90 days as heatmap
  - Color coding:
    - Dark green: completed
    - Light gray: not active day
    - Red/empty: missed active day
  - Add tooltip on hover showing date and status

- [ ] **Task 9.2: Create HabitStats component**
  - Create `src/app/(private)/habits/components/habit-stats.tsx`
  - Mark as Server Component
  - Calculate and display:
    - Completion rate (last 30 days)
    - Total completions
    - Days missed
    - Best streak
  - Use shadcn/ui Card components for layout

- [ ] **Task 9.3: Integrate calendar into detail page**
  - Update `src/app/(private)/habits/[id]/page.tsx`
  - Add `HabitCalendar` component
  - Add `HabitStats` component
  - Improve layout with responsive grid

**Validation:** View habit detail page and verify calendar and stats render correctly.

---

## Phase 10: Free Tier Enforcement

- [ ] **Task 10.1: Add upgrade prompt component**
  - Create `src/app/(private)/habits/components/upgrade-prompt.tsx`
  - Display when user hits free tier limit
  - Show comparison table (Free vs Pro)
  - Add "Upgrade to Pro" button (link to pricing page)

- [ ] **Task 10.2: Integrate limit checks in UI**
  - Update habits list page to show limit warning when at 2/3 habits
  - Show upgrade prompt when trying to create 4th habit
  - Disable "Create Habit" button if at limit (Free tier)

- [ ] **Task 10.3: Add Pro badge**
  - Create `src/components/pro-badge.tsx`
  - Display "Pro" badge for Pro users
  - Use in habit form to show Pro-only features (future-proof)

**Validation:** Test with Free and Pro user accounts.

---

## Phase 11: Testing

- [ ] **Task 11.1: Unit tests for utils**
  - Test `isActiveDay` for all recurrence types
  - Test `calculateCurrentStreak` with various scenarios
  - Test edge cases (leap years, DST, month boundaries)
  - Achieve >90% coverage for utils

- [ ] **Task 11.2: Integration tests for actions**
  - Test all Server Actions with mock database
  - Test authorization (unauthenticated, wrong user)
  - Test validation errors
  - Test success paths

- [ ] **Task 11.3: E2E tests with Playwright**
  - Test create habit flow (all recurrence types)
  - Test complete habit flow
  - Test edit habit flow
  - Test delete habit flow
  - Test streak visualization
  - Test free tier limit enforcement

**Validation:** All tests pass with 100% success rate.

---

## Phase 12: Polish and Documentation

- [ ] **Task 12.1: Add loading states**
  - Add `loading.tsx` for habits list page
  - Add `loading.tsx` for habit detail page
  - Use Suspense boundaries where appropriate
  - Add skeleton components for loading states

- [ ] **Task 12.2: Improve error handling**
  - Add `error.tsx` for error boundaries
  - Improve error messages to be user-friendly
  - Add Sentry or logging for production errors

- [ ] **Task 12.3: Add success notifications**
  - Integrate toast library (sonner or react-hot-toast)
  - Show success toasts for:
    - Habit created
    - Habit updated
    - Habit deleted
    - Habit completed
  - Show error toasts for failures

- [ ] **Task 12.4: Accessibility audit**
  - Verify all forms are keyboard accessible
  - Add ARIA labels where needed
  - Test with screen reader
  - Ensure color contrast meets WCAG AA

- [ ] **Task 12.5: Performance optimization**
  - Verify no N+1 queries
  - Add database query logging in dev
  - Test with large datasets (100+ executions)
  - Add pagination if needed

- [ ] **Task 12.6: Documentation**
  - Add JSDoc comments to all public functions
  - Update README with habit module overview
  - Document recurrence logic for future developers
  - Add inline code comments for complex algorithms

**Validation:** Manual QA pass on all features.

---

## Phase 13: Deployment Preparation

- [ ] **Task 13.1: Database migration for production**
  - Review migration SQL for production safety
  - Test migration on staging environment
  - Prepare rollback plan

- [ ] **Task 13.2: Environment variables check**
  - Verify all required env vars are set
  - Document any new env vars in `.env.example`

- [ ] **Task 13.3: Final testing on staging**
  - Deploy to staging environment
  - Run full E2E test suite
  - Manual QA on staging
  - Load testing (simulate multiple users)

- [ ] **Task 13.4: Production deployment**
  - Deploy to production
  - Monitor error logs for first 24 hours
  - Be ready to rollback if critical issues

- [ ] **Task 13.5: Post-deployment verification**
  - Test habit creation in production
  - Test habit completion in production
  - Verify streaks calculate correctly
  - Check database performance

**Validation:** Production is stable with no critical errors.

---

## Completion Checklist

- [ ] All database tables created and indexed
- [ ] All Server Actions implemented and tested
- [ ] All UI components functional
- [ ] All pages accessible and working
- [ ] Free tier limits enforced
- [ ] Tests passing (unit, integration, E2E)
- [ ] Accessibility standards met
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Production deployment successful

**Total Estimated Tasks:** 70+  
**Estimated Timeline:** 8-11 days (as per proposal)
