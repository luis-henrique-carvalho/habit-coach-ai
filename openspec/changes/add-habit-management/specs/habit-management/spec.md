# Habit Management Specification

## ADDED Requirements

### Requirement: Create Habit with Recurrence Configuration
**ID:** HM-001  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to create habits with flexible recurrence patterns to accommodate different tracking needs (daily routines, weekly activities, monthly goals, annual events).

#### Scenario: User creates daily habit with interval
**Given** the user is authenticated and on the habit creation page  
**When** the user fills in:
- Name: "Morning Meditation"
- Description: "10 minutes of mindfulness"
- Recurrence type: Daily
- Interval: 1 day
**And** submits the form  
**Then** the system creates the habit with daily recurrence  
**And** redirects to the habit list  
**And** displays a success message

#### Scenario: User creates weekly habit with specific days
**Given** the user is authenticated and on the habit creation page  
**When** the user fills in:
- Name: "Gym Workout"
- Recurrence type: Weekly
- Days: Monday, Wednesday, Friday
**And** submits the form  
**Then** the system creates the habit active only on Mon/Wed/Fri  
**And** the habit appears in the list with recurrence details

#### Scenario: User creates monthly habit
**Given** the user is authenticated and on the habit creation page  
**When** the user fills in:
- Name: "Financial Review"
- Recurrence type: Monthly
- Interval: 1 month
**And** submits the form  
**Then** the system creates the habit active on the same day each month  
**And** stores the creation date as the reference day

#### Scenario: User creates annual habit
**Given** the user is authenticated and on the habit creation page  
**When** the user fills in:
- Name: "Annual Health Checkup"
- Recurrence type: Annual
- Interval: 1 year
**And** submits the form  
**Then** the system creates the habit active once per year  
**And** stores the creation date as the reference date

#### Scenario: User exceeds free tier limit
**Given** the user is on the Free plan  
**And** already has 3 active habits  
**When** the user attempts to create a 4th habit  
**Then** the system blocks the creation  
**And** displays an upgrade prompt with Pro plan benefits

---

### Requirement: List All Habits
**ID:** HM-002  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to view all their habits in a clear, organized list to track their active commitments and access individual habit details.

#### Scenario: User views active habits
**Given** the user is authenticated  
**And** has 3 active habits  
**When** the user navigates to the habits page  
**Then** the system displays all 3 habits  
**And** each habit shows:
- Name
- Current streak
- Recurrence type summary
- Quick completion checkbox (if active today)

#### Scenario: User views empty habit list
**Given** the user is authenticated  
**And** has no habits  
**When** the user navigates to the habits page  
**Then** the system displays an empty state  
**And** shows a "Create your first habit" call-to-action

#### Scenario: User filters by active status
**Given** the user has 3 active habits and 2 archived habits  
**When** the user toggles the "Show archived" filter  
**Then** the system displays all 5 habits  
**And** clearly distinguishes archived habits visually

---

### Requirement: Retrieve Habit by ID
**ID:** HM-003  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to view detailed information about a specific habit, including statistics, execution history, and recurrence configuration.

#### Scenario: User views habit details
**Given** the user is authenticated  
**And** has a habit with ID "habit-123"  
**When** the user navigates to `/habits/habit-123`  
**Then** the system displays:
- Habit name and description
- Recurrence configuration details
- Current streak and longest streak
- Calendar heatmap of last 90 days
- Completion rate statistics
- Edit and Delete buttons

#### Scenario: User views habit they don't own
**Given** the user is authenticated  
**And** another user owns habit with ID "habit-456"  
**When** the user tries to access `/habits/habit-456`  
**Then** the system returns a 403 Forbidden error  
**And** redirects to the habits list

#### Scenario: User views non-existent habit
**Given** the user is authenticated  
**When** the user navigates to `/habits/invalid-id`  
**Then** the system returns a 404 Not Found error  
**And** displays a helpful message with a link to the habits list

---

### Requirement: Update Habit
**ID:** HM-004  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to edit their habits to correct mistakes, adjust recurrence patterns, or update details as their needs change.

#### Scenario: User updates habit name and description
**Given** the user is viewing habit "Morning Run"  
**When** the user clicks Edit  
**And** changes the name to "Morning Jog"  
**And** updates the description  
**And** saves the changes  
**Then** the system updates the habit  
**And** displays the updated information  
**And** preserves all execution history and streaks

#### Scenario: User changes recurrence pattern
**Given** the user has a daily habit  
**When** the user edits it and changes recurrence to Weekly (Mon/Wed/Fri)  
**And** saves the changes  
**Then** the system updates the recurrence configuration  
**And** recalculates the current streak based on new pattern  
**And** warns the user about streak recalculation

#### Scenario: User attempts to update another user's habit
**Given** the user is authenticated  
**When** the user tries to update a habit owned by another user  
**Then** the system rejects the request  
**And** returns a 403 Forbidden error

---

### Requirement: Delete Habit
**ID:** HM-005  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to remove habits they no longer wish to track, with appropriate confirmation to prevent accidental deletions.

#### Scenario: User soft-deletes a habit
**Given** the user is viewing habit "Evening Reading"  
**When** the user clicks Delete  
**And** confirms the deletion in the modal  
**Then** the system marks the habit as inactive (`isActive = false`)  
**And** removes it from the active habits list  
**And** preserves all data for potential restoration

#### Scenario: User cancels deletion
**Given** the user is viewing a habit  
**When** the user clicks Delete  
**And** cancels in the confirmation modal  
**Then** the system does nothing  
**And** the habit remains active

#### Scenario: Deleting habit cascades to related records
**Given** the user deletes a habit  
**When** the deletion is processed  
**Then** the system soft-deletes the habit  
**And** the recurrence and execution records are logically associated but preserved for data integrity

---

### Requirement: Record Habit Execution
**ID:** HM-006  
**Priority:** MUST  
**Category:** Core Feature

The system MUST allow users to mark habits as completed on valid recurrence dates, and MUST validate that executions only occur on active days according to the recurrence pattern.

#### Scenario: User completes habit on active day (today)
**Given** the user has a daily habit  
**And** today is an active day  
**And** the habit is not yet completed today  
**When** the user marks the habit as complete  
**Then** the system creates an execution record with today's date  
**And** increments the current streak by 1  
**And** updates the longest streak if current exceeds it  
**And** displays instant feedback (checkmark animation)

#### Scenario: User completes habit retroactively (within 7 days)
**Given** the user has a habit  
**And** 3 days ago was an active day  
**And** the user did not complete it on that day  
**When** the user marks the habit as complete for 3 days ago  
**Then** the system creates an execution record with that date  
**And** recalculates the streak from that date forward  
**And** updates current and longest streaks accordingly

#### Scenario: User attempts to complete habit on non-active day
**Given** the user has a weekly habit (Mon/Wed/Fri only)  
**And** today is Tuesday  
**When** the user attempts to mark the habit as complete  
**Then** the system rejects the execution  
**And** displays an error: "This habit is not scheduled for today"

#### Scenario: User attempts to complete habit more than 7 days ago
**Given** the user has a habit  
**When** the user attempts to mark it complete for 10 days ago  
**Then** the system rejects the execution  
**And** displays an error: "Cannot complete habits more than 7 days in the past"

#### Scenario: User attempts duplicate completion
**Given** the user already completed a habit today  
**When** the user tries to mark it complete again for the same day  
**Then** the system prevents the duplicate  
**And** displays a message: "Already completed for this day"

#### Scenario: User uncompletes habit (undo)
**Given** the user completed a habit today  
**When** the user clicks the checkbox again to undo  
**Then** the system deletes the execution record  
**And** recalculates the current streak  
**And** updates the UI immediately

---

### Requirement: Calculate and Display Streaks
**ID:** HM-007  
**Priority:** MUST  
**Category:** Core Feature

The system MUST accurately calculate current and longest streaks, considering only active recurrence days and consecutive completions.

#### Scenario: Current streak increases with consecutive completions
**Given** the user has a daily habit  
**And** current streak is 5  
**When** the user completes the habit today  
**Then** the system updates current streak to 6  
**And** checks if 6 > longest streak, updates if needed  
**And** displays the new streak prominently

#### Scenario: Current streak resets on missed active day
**Given** the user has a daily habit  
**And** current streak is 10  
**And** the user did not complete it yesterday  
**When** the system recalculates the streak  
**Then** the current streak is reset to 0  
**And** the longest streak remains 10  
**And** the user sees the reset on the next page load

#### Scenario: Streak calculation ignores non-active days
**Given** the user has a weekly habit (Mon/Wed/Fri)  
**And** the user completed it on Monday  
**And** today is Tuesday (non-active day)  
**When** the system calculates the streak  
**Then** the streak remains 1 (Tuesday doesn't break it)  
**And** the streak will only be affected by Wednesday's outcome

#### Scenario: First-time completion sets streak to 1
**Given** the user creates a new habit  
**And** has no executions yet  
**When** the user completes it for the first time  
**Then** the current streak is set to 1  
**And** the longest streak is set to 1

#### Scenario: Longest streak is never decreased
**Given** the user has a longest streak of 30  
**And** the current streak is 5  
**When** the user misses a day and streak resets to 0  
**Then** the longest streak remains 30  
**And** serves as a personal record

---

### Requirement: Validate Recurrence Configuration
**ID:** HM-008  
**Priority:** MUST  
**Category:** Data Integrity

The system MUST validate that recurrence configurations are internally consistent and MUST reject invalid combinations.

#### Scenario: Daily recurrence requires valid interval
**Given** the user is creating a habit  
**And** selects "Daily" recurrence  
**When** the user sets interval to 0 or negative  
**Then** the system displays a validation error  
**And** prevents form submission

#### Scenario: Weekly recurrence requires at least one day
**Given** the user is creating a habit  
**And** selects "Weekly" recurrence  
**When** the user doesn't select any days of the week  
**Then** the system displays a validation error  
**And** prompts to select at least one day

#### Scenario: Weekly recurrence accepts multiple days
**Given** the user is creating a habit  
**And** selects "Weekly" recurrence  
**When** the user selects 3 days (Mon, Wed, Fri)  
**Then** the system accepts the configuration  
**And** creates the habit successfully

#### Scenario: Monthly recurrence requires valid interval
**Given** the user is creating a habit  
**And** selects "Monthly" recurrence  
**When** the user sets interval to 0  
**Then** the system displays a validation error

#### Scenario: Annual recurrence requires valid interval
**Given** the user is creating a habit  
**And** selects "Annual" recurrence  
**When** the user sets interval to 0 or negative  
**Then** the system displays a validation error

---

### Requirement: Habit Statistics and Analytics
**ID:** HM-009  
**Priority:** SHOULD  
**Category:** Insights

The system SHOULD allow users to view completion statistics to understand their habit performance over time.

#### Scenario: User views completion rate for last 30 days
**Given** the user has a daily habit  
**And** completed it 25 out of 30 days  
**When** the user views the habit details  
**Then** the system displays:
- Completion rate: 83% (25/30)
- Days completed: 25
- Days missed: 5

#### Scenario: User views calendar heatmap
**Given** the user has a habit with 90 days of history  
**When** the user views the habit details  
**Then** the system displays a calendar heatmap  
**And** each day is colored based on completion:
- Dark green: completed
- Light gray: not active (recurrence)
- Red/empty: missed active day

#### Scenario: User views streak milestones
**Given** the user's current streak is 7  
**When** the system displays the streak  
**Then** it highlights the milestone (e.g., "1 week streak! 🔥")  
**And** celebrates achievements at 7, 14, 30, 60, 90 days

---

### Requirement: Performance Requirements
**ID:** HM-010  
**Priority:** MUST  
**Category:** Non-Functional

The habit management system MUST meet specific performance benchmarks to ensure a smooth user experience.

#### Scenario: Habit list loads quickly
**Given** the user has 10 habits  
**When** the user navigates to the habits page  
**Then** the list loads in under 2 seconds  
**And** displays all habits with their current streaks

#### Scenario: Habit completion is near-instant
**Given** the user is viewing the habits list  
**When** the user clicks the completion checkbox  
**Then** the UI updates optimistically in under 100ms  
**And** the server action completes in under 300ms  
**And** if the server action fails, the UI reverts

#### Scenario: Habit detail page loads efficiently
**Given** the user clicks on a habit  
**When** the detail page loads  
**Then** the page is interactive in under 2 seconds  
**And** the calendar heatmap renders without blocking

---

### Requirement: Free vs Pro Tier Limits
**ID:** HM-011  
**Priority:** MUST  
**Category:** Business Logic

The system MUST enforce habit limits based on user subscription tier.

#### Scenario: Free user is limited to 3 active habits
**Given** the user is on the Free plan  
**And** has 3 active habits  
**When** the user attempts to create a 4th habit  
**Then** the system blocks the creation  
**And** displays: "Upgrade to Pro for unlimited habits"  
**And** shows a comparison of Free vs Pro features

#### Scenario: Pro user has unlimited habits
**Given** the user is on the Pro plan  
**And** has 50 active habits  
**When** the user creates another habit  
**Then** the system allows it without restrictions

#### Scenario: Downgrading from Pro to Free with excess habits
**Given** the user is on the Pro plan  
**And** has 10 active habits  
**When** the user downgrades to Free  
**Then** the system does not delete habits  
**But** prevents creating new habits until count ≤ 3  
**And** displays a warning about the limit

---

### Requirement: Data Security and Authorization
**ID:** HM-012  
**Priority:** MUST  
**Category:** Security

All habit operations MUST be properly authorized and data MUST be isolated per user.

#### Scenario: Unauthenticated user cannot access habits
**Given** the user is not logged in  
**When** the user navigates to `/habits`  
**Then** the system redirects to the login page  
**And** preserves the intended destination for post-login redirect

#### Scenario: User can only access their own habits
**Given** User A and User B both have habits  
**When** User A queries habits  
**Then** the system returns only User A's habits  
**And** never exposes User B's data

#### Scenario: All mutations verify ownership
**Given** the user attempts to update, delete, or complete a habit  
**When** the server action executes  
**Then** the system verifies the habit belongs to the authenticated user  
**And** rejects the request if ownership check fails

---

### Requirement: Error Handling and User Feedback
**ID:** HM-013  
**Priority:** MUST  
**Category:** User Experience

The system MUST provide clear, actionable error messages and success feedback.

#### Scenario: Network error during habit creation
**Given** the user fills out the habit form  
**When** the user submits and a network error occurs  
**Then** the system displays: "Unable to create habit. Please check your connection."  
**And** preserves the form data for retry

#### Scenario: Validation error displays inline
**Given** the user is creating a habit  
**When** the user submits with an empty name  
**Then** the system displays an inline error: "Name is required"  
**And** focuses the name input field

#### Scenario: Success confirmation after creation
**Given** the user successfully creates a habit  
**Then** the system displays a success toast: "Habit created! 🎉"  
**And** redirects to the habits list  
**And** highlights the new habit

#### Scenario: Optimistic update with rollback on failure
**Given** the user marks a habit as complete  
**When** the UI updates optimistically  
**But** the server action fails  
**Then** the UI reverts the checkbox state  
**And** displays: "Unable to save. Please try again."
