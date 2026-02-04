# Specification: Habit Management System

## ADDED Requirements

### Requirement: Create Habit

The system SHALL allow users to create a new habit with a name, optional description, and frequency pattern.

#### Scenario: User creates daily habit
- **WHEN** user navigates to Create Habit form and enters: name="Morning Run", description="30 min jog", frequency="daily"
- **THEN** habit is created, user sees confirmation, and habit appears in their daily checklist

#### Scenario: User creates habit with specific days
- **WHEN** user creates habit with frequency type "specific_days" and selects Mon/Wed/Fri
- **THEN** habit appears in checklist only on those days

#### Scenario: User creates habit with weekly count target
- **WHEN** user creates habit with frequency type "weekly_count" and sets count=3
- **THEN** system expects 3 completions per week (any days), tracked across 7-day rolling window

#### Scenario: User attempts to create habit with empty name
- **WHEN** user tries to create habit with blank name
- **THEN** form validation error displayed, habit not created

#### Scenario: Free user hits 3-habit limit
- **WHEN** user on free tier with 3 active habits tries to create 4th
- **THEN** error message displayed: "Free tier limited to 3 habits. Upgrade to Pro for unlimited.", with upsell link
- **AND** habit creation is blocked

#### Scenario: Pro user can create unlimited habits
- **WHEN** user on Pro plan attempts to create 4th, 5th, or Nth habits
- **THEN** habits are created successfully without limit

### Requirement: Edit Habit

The system SHALL allow users to modify habit details (name, description, frequency, reminder time) after creation.

#### Scenario: User edits habit name
- **WHEN** user opens habit detail view and clicks Edit, changes name from "Morning Run" to "Evening Run"
- **THEN** habit is updated, detail view reflects change immediately

#### Scenario: User changes frequency pattern
- **WHEN** user edits frequency from "daily" to "specific_days" and selects Tue/Thu
- **THEN** habit frequency is updated; next day's checklist reflects new pattern

#### Scenario: User cannot edit archived habit
- **WHEN** user attempts to edit an archived habit
- **THEN** edit button is disabled with tooltip "Habit archived"

### Requirement: Archive Habit

The system SHALL allow users to soft-delete habits without losing historical data.

#### Scenario: User archives habit
- **WHEN** user clicks Archive button in habit detail view
- **THEN** habit is marked archived, removed from daily checklist, but historical data retained for analytics

#### Scenario: User restores archived habit
- **WHEN** user views archived habits list and clicks Restore
- **THEN** habit is unarchived and returns to active daily checklist

### Requirement: Mark Habit Complete

The system SHALL allow users to mark habits as completed on any given day (today or up to 7 days in past).

#### Scenario: User marks habit complete today
- **WHEN** user clicks checkbox on habit in daily checklist
- **THEN** completion is recorded, UI updates instantly (<300ms), streak counter increments
- **AND** checkbox shows checkmark/completed state

#### Scenario: User backlogs completion from past 7 days
- **WHEN** user opens habit detail, clicks past date (up to 7 days ago), and confirms
- **THEN** completion is recorded for that date, streak is recalculated if affected

#### Scenario: User marks same day twice (idempotent)
- **WHEN** user double-clicks habit completion checkbox on same day
- **THEN** only one completion is recorded (no duplicate), no error shown

#### Scenario: User attempts to backlog beyond 7 days
- **WHEN** user tries to mark a completion from 8+ days ago
- **THEN** error message displayed: "Can only log completions up to 7 days in the past"

### Requirement: Daily Habit Checklist View

The system SHALL display a consolidated view of all habits due on the current day.

#### Scenario: User views daily checklist
- **WHEN** user navigates to Habits page
- **THEN** user sees list of all habits due today, with:
  - Habit name and description (if set)
  - Current streak badge
  - Interactive checkbox to mark complete
  - Quick link to detail view
- **AND** checklist is sorted by reminder time (if set) or creation order

#### Scenario: User with 0 habits due today
- **WHEN** user has no habits matching today's frequency pattern
- **THEN** motivational empty state displayed: "Rest day! No habits scheduled for today."

#### Scenario: Daily checklist loads quickly
- **WHEN** user navigates to Habits page
- **THEN** checklist renders in <2 seconds, even with 10+ habits

### Requirement: Habit Detail View - Analytics

The system SHALL provide detailed analytics for each habit, including streaks, heatmap, completion rates, and trends.

#### Scenario: User views habit streak
- **WHEN** user opens habit detail view
- **THEN** prominent streak badge displays: current streak (e.g., "12 days") and record streak (e.g., "32 days")

#### Scenario: User views 90-day heatmap
- **WHEN** user opens habit detail view
- **THEN** calendar heatmap displayed showing:
  - Last 90 days in grid format
  - Green fill for completed days
  - Gray fill for scheduled but incomplete days
  - White for days not scheduled (based on frequency)
  - Tooltip on hover showing date and completion status

#### Scenario: User views completion rates
- **WHEN** user opens habit detail view
- **THEN** completion rates displayed for:
  - Last 30 days: "28/30 (93%)"
  - Last 60 days: "55/60 (92%)"
  - Last 90 days: "82/90 (91%)"

#### Scenario: User views trend graph
- **WHEN** user scrolls down in habit detail view
- **THEN** line graph displayed showing completion trend over last 90 days, with:
  - X-axis: weeks (or days, depending on space)
  - Y-axis: completion rate (0-100%)
  - Interactive tooltips on hover

#### Scenario: User compares current to record streak
- **WHEN** user views habit detail during an active streak
- **THEN** motivational message displayed if approaching or exceeding record: "You're on track to beat your record! 12 of 32 days complete."

### Requirement: Habit Frequency Patterns

The system SHALL support flexible frequency definitions to cover common use cases.

#### Scenario: User creates daily habit
- **WHEN** user selects frequency type "daily"
- **THEN** habit is due every single day without exception

#### Scenario: User creates specific days habit
- **WHEN** user selects frequency type "specific_days" and checks Mon/Wed/Fri
- **THEN** habit is due only on those 3 days each week, repeating weekly

#### Scenario: User creates weekly count habit
- **WHEN** user creates habit with frequency type "weekly_count" and sets count=4
- **THEN** system expects 4 completions within any 7-day rolling window
- **AND** completion rate is calculated as completions / expected_count per week

#### Scenario: User changes frequency for habit with history
- **WHEN** user edits frequency of habit with 30+ days of history
- **THEN** frequency changes take effect for future completions only; past completions are preserved
- **AND** historical streaks and heatmap remain unchanged

### Requirement: Preferred Reminder Time

The system SHALL allow users to set a preferred time for habit reminders (backend-ready, no active delivery in MVP).

#### Scenario: User sets reminder time
- **WHEN** user edits habit and sets "preferred_time" to 06:30 AM
- **THEN** time is saved in database, ready for v2 notification system integration

#### Scenario: User views reminder time
- **WHEN** user opens habit detail, reminder time displayed below name: "Reminder: 6:30 AM"

#### Scenario: User clears reminder time
- **WHEN** user removes reminder time from habit edit form
- **THEN** field is cleared, habit has no preferred time

### Requirement: Habit Performance Constraints

The system SHALL meet performance targets critical to user experience.

#### Scenario: Marking habit complete is instant
- **WHEN** user clicks habit checkbox in daily checklist
- **THEN** UI updates instantly (<50ms perceived latency), streak counter increments, backend sync in background (<300ms total)

#### Scenario: Daily checklist loads quickly
- **WHEN** user navigates to Habits page
- **THEN** page renders with all habit data in <2 seconds on typical 4G connection

#### Scenario: Habit detail view with 90-day heatmap loads fast
- **WHEN** user opens habit detail view
- **THEN** heatmap, streak, completion rates, and trend graph all render in <1.5 seconds

#### Scenario: Streak calculation has 100% accuracy
- **WHEN** user has 47 consecutive completed days with no breaks
- **THEN** streak displays exactly "47 days" (not 46 or 48)
- **AND** if user misses 1 day, streak resets to "0 days" and record is preserved

### Requirement: Free Tier Limit - Maximum 3 Active Habits

The system SHALL enforce free tier limit of maximum 3 concurrent active habits.

#### Scenario: Free user with 2 habits creates 3rd successfully
- **WHEN** free tier user with 2 active habits creates another
- **THEN** habit is created; now user has 3 active habits (at limit)

#### Scenario: Free user at limit sees blocked state
- **WHEN** free tier user with 3 active habits views Habits page
- **THEN** "Create Habit" button is disabled with tooltip: "Free tier limited to 3 habits. Upgrade to Pro for unlimited."
- **AND** upsell banner or modal can appear offering upgrade path

#### Scenario: Archiving habit under free tier removes block
- **WHEN** free tier user archives 1 of 3 active habits (now 2 active)
- **THEN** "Create Habit" button re-enables, user can create new habit

#### Scenario: Pro user has no limit
- **WHEN** Pro plan user creates habits (1st, 2nd, 5th, 10th, etc.)
- **THEN** all habits are created successfully with no limit enforced

#### Scenario: User upgrades from free to Pro
- **WHEN** user upgrades plan from free to Pro
- **THEN** all archived habits remain accessible and unaffected; user can create beyond 3 habits immediately

### Requirement: Data Persistence and Consistency

The system SHALL maintain accurate habit and completion data across concurrent requests and system restarts.

#### Scenario: Concurrent mark-complete requests
- **WHEN** user's app and web client both attempt to mark same habit complete simultaneously
- **THEN** only one completion is recorded (unique constraint on habit_id, completed_date); both requests return success (idempotent)

#### Scenario: Habit and completions survive database restart
- **WHEN** database restarts or service redeploys
- **THEN** all user habits, completions, and calculated metrics are intact and available immediately

#### Scenario: User deletes account
- **WHEN** user account is deleted (if feature implemented)
- **THEN** all associated habits and completions are deleted by foreign key cascade

## MODIFIED Requirements

(None currently - this is a new capability baseline.)

## REMOVED Requirements

(None currently - this is a new capability baseline.)
