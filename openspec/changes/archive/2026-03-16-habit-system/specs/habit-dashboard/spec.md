## ADDED Requirements

### Requirement: Habits list page displays all active habits
The system SHALL display a paginated list of the authenticated user's active habits at the `/habits` route. Each habit card SHALL show the habit name, current streak, recurrence description, and today's completion status. The page SHALL include search functionality to filter habits by name.

#### Scenario: User views their habit list
- **WHEN** an authenticated user navigates to `/habits`
- **THEN** the system displays a list of their active habits as cards showing name, streak, recurrence info, and today's completion status

#### Scenario: User has no habits
- **WHEN** an authenticated user with no habits navigates to `/habits`
- **THEN** the system displays an empty state with a message "Nenhum hábito encontrado" and a CTA to create the first habit

#### Scenario: User searches habits by name
- **WHEN** a user types "med" in the search field on the habits page
- **THEN** the system filters the list to show only habits whose name contains "med" (case-insensitive)

### Requirement: Daily checklist view shows today's due habits
The habits list page SHALL include a "Hoje" (Today) section at the top showing only the habits that are due today based on their recurrence configuration. Each habit in the checklist SHALL have a toggle to mark it as complete.

#### Scenario: Daily habit appears in today's checklist
- **WHEN** a user has a daily habit "Meditar"
- **THEN** "Meditar" appears in the today's checklist every day

#### Scenario: Weekly habit appears only on configured days
- **WHEN** a user has a weekly habit configured for Monday and Wednesday, and today is Tuesday
- **THEN** the habit does NOT appear in today's checklist

#### Scenario: Weekly count habit always appears in checklist
- **WHEN** a user has a weekly_count habit (3x per week) and has completed 2 times this week
- **THEN** the habit appears in today's checklist (target not yet met for the week)

#### Scenario: Weekly count habit target already met
- **WHEN** a user has a weekly_count habit (3x per week) and has completed 3 times this week
- **THEN** the habit still appears in the checklist but is visually marked as "meta semanal atingida"

#### Scenario: Toggle completion from checklist
- **WHEN** a user clicks the completion toggle on a habit in the daily checklist
- **THEN** the system marks the habit as complete for today and the UI updates immediately (optimistic update)

### Requirement: Habit detail page shows comprehensive statistics
The system SHALL provide a detail page at `/habits/[id]` showing: habit name, description, recurrence info, creation date, current streak, longest streak, completion rates (30/60/90 days), a 90-day heatmap calendar, and a weekly trend chart.

#### Scenario: User views habit detail
- **WHEN** a user navigates to `/habits/[id]` for their habit "Meditar"
- **THEN** the system displays the habit's full statistics including current streak, longest streak, and completion rates for 30, 60, and 90 day windows

#### Scenario: User views another user's habit detail
- **WHEN** a user navigates to `/habits/[id]` where the ID belongs to another user's habit
- **THEN** the system displays a "Hábito não encontrado" message or redirects to `/habits`

### Requirement: 90-day heatmap calendar visualization
The habit detail page SHALL display a heatmap calendar showing the last 90 days. Each day cell SHALL be colored to indicate: completed (green), missed/expected but not completed (light red/gray), or not expected (neutral/empty). The heatmap SHALL use a 7-column CSS grid layout (one column per weekday).

#### Scenario: Completed day shown in green
- **WHEN** a day in the heatmap has a corresponding `habit_execution` record
- **THEN** that day's cell is displayed with a green fill

#### Scenario: Missed expected day shown differently
- **WHEN** a day in the heatmap was an expected completion day (per recurrence config) but has no execution record
- **THEN** that day's cell is displayed with a distinct visual indicator (muted red or gray)

#### Scenario: Non-expected day shown as neutral
- **WHEN** a day in the heatmap was NOT an expected day (e.g., Tuesday for a Mon/Wed/Fri habit)
- **THEN** that day's cell is displayed with a neutral/empty appearance

### Requirement: Weekly trend chart
The habit detail page SHALL display a line chart showing weekly completion rates for the last 12 weeks. The X-axis shows weeks, the Y-axis shows completion percentage (0-100%).

#### Scenario: Trend chart with data
- **WHEN** a user views the trend chart for a habit active for 8 weeks
- **THEN** the chart displays 8 data points showing each week's completion rate as a percentage

#### Scenario: Trend chart for new habit
- **WHEN** a user views the trend chart for a habit created 3 days ago
- **THEN** the chart displays 1 data point for the current (partial) week

### Requirement: Habit card displays recurrence description in pt-BR
Each habit card and detail page SHALL display a human-readable recurrence description in Portuguese.

#### Scenario: Daily recurrence display
- **WHEN** a habit has recurrence type "daily"
- **THEN** the system displays "Diário"

#### Scenario: Weekly recurrence display
- **WHEN** a habit has recurrence type "weekly" with weekdays [1, 3, 5]
- **THEN** the system displays "Seg, Qua, Sex"

#### Scenario: Weekly count recurrence display
- **WHEN** a habit has recurrence type "weekly_count" with count 4
- **THEN** the system displays "4x por semana"

### Requirement: Add habit button and form dialog
The habits page SHALL include an "Adicionar Hábito" button that opens a dialog containing the habit creation form. On successful creation the dialog closes and the habit list refreshes.

#### Scenario: Open create habit dialog
- **WHEN** a user clicks "Adicionar Hábito" on the habits page
- **THEN** a dialog opens with the habit creation form

#### Scenario: Successful creation closes dialog
- **WHEN** a user successfully submits the create habit form
- **THEN** the dialog closes, a success toast "Hábito criado com sucesso" is shown, and the habit list refreshes

#### Scenario: Free tier limit shows upgrade message
- **WHEN** a Free tier user with 3 active habits clicks "Adicionar Hábito"
- **THEN** the system shows a message indicating the limit has been reached with a suggestion to upgrade to Pro

### Requirement: Edit and archive actions on habit card
Each habit card SHALL provide actions to edit or archive the habit. Edit opens the upsert form dialog pre-filled with the habit's data. Archive shows a confirmation dialog before archiving.

#### Scenario: Edit habit from card
- **WHEN** a user clicks the edit action on a habit card
- **THEN** the upsert form dialog opens with the habit's current data pre-filled

#### Scenario: Archive habit with confirmation
- **WHEN** a user clicks the archive action on a habit card
- **THEN** a confirmation dialog appears asking "Tem certeza que deseja arquivar este hábito?"

#### Scenario: Confirm archive
- **WHEN** a user confirms the archive action
- **THEN** the habit is archived, a toast "Hábito arquivado com sucesso" is shown, and the list refreshes

### Requirement: Page loading states
The habits list page and detail page SHALL display appropriate loading skeletons while data is being fetched, following the existing `PagesLoading` pattern with `Suspense`.

#### Scenario: Habits list loading
- **WHEN** the habits list page is loading
- **THEN** the system displays skeleton cards matching the expected layout

#### Scenario: Habit detail loading
- **WHEN** the habit detail page is loading
- **THEN** the system displays skeleton placeholders for stats, heatmap, and chart areas
