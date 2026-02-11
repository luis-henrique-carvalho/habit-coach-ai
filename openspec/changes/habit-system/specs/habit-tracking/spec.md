## ADDED Requirements

### Requirement: User can mark a habit as complete for today
The system SHALL allow a user to mark an active habit as complete for the current date. A completion creates a `habit_execution` record with `completedDate` set to today and `completedAt` set to the current timestamp. The unique constraint on `(habitId, completedDate)` prevents double-completion.

#### Scenario: Successful completion for today
- **WHEN** a user toggles completion for their habit "Meditar" on today's date and no execution exists for today
- **THEN** the system creates a `habit_execution` record with today's date and recalculates the habit's streaks

#### Scenario: Already completed today
- **WHEN** a user toggles completion for a habit that already has an execution for today
- **THEN** the system removes the existing `habit_execution` record for today (uncomplete) and recalculates the habit's streaks

### Requirement: User can mark a habit as complete retroactively up to 7 days
The system SHALL allow a user to mark a habit as complete for any date within the past 7 days (inclusive of today). Dates in the future or more than 7 days in the past SHALL be rejected.

#### Scenario: Retroactive completion within 7 days
- **WHEN** a user marks their habit as complete for a date 3 days ago
- **THEN** the system creates a `habit_execution` record for that date and recalculates streaks

#### Scenario: Retroactive completion beyond 7 days
- **WHEN** a user attempts to mark a habit as complete for a date 8 days ago
- **THEN** the system returns an error with code `INVALID_DATE` and message "Só é possível registrar hábitos dos últimos 7 dias"

#### Scenario: Future date completion attempt
- **WHEN** a user attempts to mark a habit as complete for tomorrow's date
- **THEN** the system returns an error with code `INVALID_DATE` and message "Não é possível registrar hábitos para datas futuras"

### Requirement: Streak calculation is accurate for daily habits
The system SHALL calculate the current streak for daily habits by counting consecutive days of completion backwards from today. If today is not yet completed, the streak counts backwards from yesterday. The longest streak SHALL be the maximum of the current streak and the stored `longestStreak`.

#### Scenario: Consecutive daily completions
- **WHEN** a user has completed a daily habit for the last 5 days including today
- **THEN** the system sets `currentStreak = 5`

#### Scenario: Gap breaks the streak
- **WHEN** a user completed a daily habit today and yesterday, missed 2 days ago, then completed the 3 days before that
- **THEN** the system sets `currentStreak = 2` (only today + yesterday count)

#### Scenario: Today not completed yet — streak counts from yesterday
- **WHEN** a user completed a daily habit for the last 5 days but not yet today
- **THEN** the system sets `currentStreak = 5` (the streak is preserved until end of day)

#### Scenario: Longest streak is preserved
- **WHEN** a user had a streak of 30 days in the past but currently has a streak of 5 days
- **THEN** the system keeps `longestStreak = 30` and `currentStreak = 5`

#### Scenario: New longest streak is recorded
- **WHEN** a user's current streak (15) exceeds their stored longest streak (10)
- **THEN** the system updates `longestStreak = 15`

### Requirement: Streak calculation is accurate for weekly habits
The system SHALL calculate the current streak for weekly habits (specific weekdays) by counting consecutive expected days of completion. Only the configured weekdays count as expected days. A missed expected day breaks the streak.

#### Scenario: Weekly habit on Mon/Wed/Fri — all completed
- **WHEN** a habit is configured for Monday, Wednesday, Friday and the user completed all three days this week and all three days last week
- **THEN** the system counts 6 consecutive expected-day completions for the streak

#### Scenario: Weekly habit — missed an expected day
- **WHEN** a habit is configured for Monday, Wednesday, Friday and the user completed Monday and Friday but missed Wednesday
- **THEN** the streak resets at the missed Wednesday

### Requirement: Streak calculation is accurate for weekly count habits
The system SHALL calculate the current streak for weekly_count habits by checking whether the target count was met in each consecutive week (Monday–Sunday). The current week is only evaluated if complete (Sunday has passed) or if the target is already met.

#### Scenario: Weekly count target met for consecutive weeks
- **WHEN** a habit has `recurrenceWeeklyCount = 3` and the user completed 3+ times in each of the last 4 weeks
- **THEN** the system counts a streak of 4 weeks

#### Scenario: Weekly count target not met breaks streak
- **WHEN** a habit has `recurrenceWeeklyCount = 3` and the user completed only 2 times last week
- **THEN** the streak resets at last week

### Requirement: Completion rate calculation for 30/60/90 day windows
The system SHALL calculate completion rates as: `(completed days / expected days) * 100` for 30-day, 60-day, and 90-day windows ending today. Expected days are determined by the habit's recurrence configuration.

#### Scenario: Daily habit completion rate
- **WHEN** a daily habit was created 40 days ago and the user completed 25 out of the last 30 days
- **THEN** the 30-day completion rate is `83.3%` (25/30)

#### Scenario: Weekly habit completion rate
- **WHEN** a Mon/Wed/Fri habit has been active for 30 days (approximately 12-13 expected days) and the user completed 10 of them
- **THEN** the 30-day completion rate reflects `10 / (expected days in window) * 100`

#### Scenario: Habit created less than window days ago
- **WHEN** a habit was created 15 days ago and the 30-day window is requested
- **THEN** the system calculates the rate using only the 15 days since creation (not 30)

### Requirement: Toggle completion action validates ownership
The system SHALL verify that the habit belongs to the authenticated user before allowing completion toggle. Attempts to toggle someone else's habit SHALL return `NOT_FOUND`.

#### Scenario: User toggles their own habit
- **WHEN** a user toggles completion on a habit they own
- **THEN** the operation succeeds

#### Scenario: User toggles another user's habit
- **WHEN** a user attempts to toggle completion on a habit owned by another user
- **THEN** the system returns an error with code `NOT_FOUND`
