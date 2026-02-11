## 1. Setup & Dependencies

- [ ] 1.1 Install `date-fns` and `recharts` packages (`pnpm install date-fns recharts`). Verify they appear in `package.json` dependencies.
https://ui.shadcn.com/docs/components/radix/chart
- [ ] 1.2 Create the habit feature module directory structure under `src/app/(private)/habits/` with empty index files: `actions/index.ts`, `components/`, `hooks/`, `schemas/`. Follows PATTERNS.md feature module convention.

## 2. Zod Schema & TypeScript Types

- [ ] 2.1 Create `src/app/(private)/habits/schemas/upsert-habit-schema.ts` — Zod schema with fields: `id` (optional string), `name` (required, 1-100 chars), `description` (optional, max 500 chars), `recurrenceType` (enum: daily/weekly/weekly_count), `recurrenceWeekdays` (conditional: required array of 0-6 when weekly), `recurrenceWeeklyCount` (conditional: integer 1-7 when weekly_count), `preferredTime` (optional, HH:mm format). All validation messages in pt-BR. Export schema + inferred type.
- [ ] 2.2 Create `src/app/(private)/habits/hooks/use-habits.ts` — shared TypeScript types: `HabitWithStatus` (habit row + `completedToday: boolean` + `isDueToday: boolean`), `HabitDetail` (habit + stats + executions), `HabitStats` (currentStreak, longestStreak, completionRates). Add any reusable hooks (e.g., `useHabitDialog` for form dialog state).

## 3. Server Actions — Habit Management

- [ ] 3.1 Create `src/app/(private)/habits/actions/upsert-habit.ts` — `upsertHabitAction` using `actionClient.inputSchema(upsertHabitSchema)`. Auth via `auth.api.getSession()`. On create: enforce Free tier limit (max 3 active habits), generate UUID, insert into `habit` table. On update: verify ownership (userId match), update record. Handle unique constraint violation (ALREADY_EXISTS). `revalidatePath("/habits")`. Follows PATTERNS.md server action pattern.
- [ ] 3.2 Create `src/app/(private)/habits/actions/archive-habit.ts` — `archiveHabitAction` accepting `{ id: string }`. Auth + ownership check. Set `isActive = false` on the habit. `revalidatePath("/habits")`. Follows PATTERNS.md server action pattern.
- [ ] 3.3 Create `src/app/(private)/habits/actions/get-habits.ts` — `getHabitsAction` accepting `{ page, limit, query }`. Auth check. Query active habits for user with optional name ILIKE search, ordered by `createdAt` DESC. For each habit, check if a `habit_execution` exists for today and whether the habit is due today (based on recurrence). Return paginated results with total count.

## 4. Server Actions — Habit Tracking

- [ ] 4.1 Create `src/app/(private)/habits/actions/toggle-habit-completion.ts` — `toggleHabitCompletionAction` accepting `{ habitId: string, date: string }`. Auth + ownership check. Validate date is not future and not more than 7 days ago (pt-BR error messages). Toggle logic: if execution exists for that date, delete it; otherwise, insert new `habit_execution`. After toggle, recalculate streaks (call streak calculation helper). `revalidatePath("/habits")`.
- [ ] 4.2 Create `src/lib/utils/streak-calculator.ts` — helper functions for streak calculation. `calculateCurrentStreak(executions, recurrenceType, recurrenceConfig)`: walks backwards from today counting consecutive expected completions. `calculateCompletionRates(executions, recurrenceType, recurrenceConfig, createdAt)`: computes 30/60/90 day rates as `(completed / expected) * 100`. Handles all three recurrence types (daily, weekly, weekly_count). Uses `date-fns` for date math.
- [ ] 4.3 Create `src/app/(private)/habits/actions/get-habit-detail.ts` — `getHabitDetailAction` accepting `{ id: string }`. Auth + ownership check. Return habit data, all executions for last 90 days, current/longest streak, completion rates (30/60/90 days), and weekly completion data for last 12 weeks (for trend chart). Uses streak-calculator helpers.
- [ ] 4.4 Update `src/app/(private)/habits/actions/index.ts` — re-export all actions: `upsertHabitAction`, `archiveHabitAction`, `getHabitsAction`, `toggleHabitCompletionAction`, `getHabitDetailAction`.

## 5. UI Components — Habit Management

- [ ] 5.1 Create `src/app/(private)/habits/components/upsert-habit-form.tsx` — client component. React Hook Form + Zod resolver with `upsertHabitSchema`. Fields: name (Input), description (Textarea), recurrenceType (Select), conditional weekday checkboxes (when weekly), conditional weekly count input (when weekly_count), preferredTime (Input type time). Uses `useAction(upsertHabitAction)` with success/error toast handling. Supports edit mode (pre-filled defaultValues). All labels in pt-BR.
- [ ] 5.2 Create `src/app/(private)/habits/components/add-habit-button.tsx` — client component. "Adicionar Hábito" button that opens a Dialog containing `UpsertHabitForm`. On successful creation, close dialog. When Free tier limit reached, show upgrade message instead of form.
- [ ] 5.3 Create `src/app/(private)/habits/components/habit-card.tsx` — client component. Card displaying: habit name, recurrence description (pt-BR: "Diário", "Seg, Qua, Sex", "4x por semana"), current streak with fire icon, today's completion toggle button. Includes dropdown menu with Edit and Archive actions. Edit opens upsert form dialog pre-filled. Archive shows confirmation dialog. Optimistic UI update on completion toggle.

## 6. UI Components — Habit Dashboard & Visualization

- [ ] 6.1 Create `src/app/(private)/habits/components/habit-checklist.tsx` — client component. "Hoje" section showing habits due today as a checklist. Each item has a checkbox/toggle to mark complete. Optimistic update on toggle (calls `toggleHabitCompletionAction` with today's date). Shows "meta semanal atingida" badge for weekly_count habits that met their target.
- [ ] 6.2 Create `src/app/(private)/habits/components/habit-heatmap.tsx` — client component. 90-day calendar heatmap using CSS Grid (7 columns × ~13 rows). Colors: green (completed), muted red/gray (missed expected day), neutral (not expected). Accepts executions array and recurrence config. Uses `date-fns` for date range generation.
- [ ] 6.3 Create `src/app/(private)/habits/components/habit-stats.tsx` — component displaying: current streak, longest streak, completion rates (30/60/90 days) as stat cards. Uses icons from `lucide-react`.
- [ ] 6.4 Create `src/app/(private)/habits/components/habit-trend-chart.tsx` — client component. Line chart using `recharts` (ResponsiveContainer + LineChart + Line + XAxis + YAxis + Tooltip). Shows weekly completion rate percentage for last 12 weeks. X-axis: week labels, Y-axis: 0-100%.

## 7. Pages & Content Components

- [ ] 7.1 Create `src/app/(private)/habits/components/habits-content.tsx` — async server component. Calls `getHabitsAction`. Renders `PageContainer` > `PageHeader` (title "Hábitos", description, `AddHabitButton`) > `PageContent` with `SearchInput`, today's checklist section (`HabitChecklist`), and habit card grid. Empty state: "Nenhum hábito encontrado" with CTA. Includes `DynamicPagination`.
- [ ] 7.2 Create `src/app/(private)/habits/page.tsx` — async server component. Auth check via `auth.api.getSession()`. Reads `searchParams` (query, page). Renders `Suspense` with `PagesLoading` fallback wrapping `HabitsContent`. Follows PATTERNS.md page pattern.
- [ ] 7.3 Create `src/app/(private)/habits/components/habit-detail-content.tsx` — async server component. Calls `getHabitDetailAction`. Renders habit name/description header, stats section (`HabitStats`), heatmap (`HabitHeatmap`), trend chart (`HabitTrendChart`). Back link to `/habits`. Shows "Hábito não encontrado" if not found.
- [ ] 7.4 Create `src/app/(private)/habits/[id]/page.tsx` — async server component. Auth check. Reads `params.id`. Renders `Suspense` with loading skeleton fallback wrapping `HabitDetailContent`. Follows PATTERNS.md page pattern.

## 8. Integration & Loading States

- [ ] 8.1 Add loading skeleton components for habits list (card grid skeleton) and habit detail page (stats + heatmap + chart skeletons). Used as `PagesLoading` fallback in the `Suspense` wrappers on both pages.
- [ ] 8.2 Verify end-to-end flow: create habit → appears in list → appears in today's checklist → toggle completion → streak updates → view detail page with heatmap/stats/chart. Fix any integration issues.
