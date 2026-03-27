## ADDED Requirements

### Requirement: User can create a habit
The system SHALL allow authenticated users to create a new habit by providing a name (required), description (optional), recurrence type, and preferred reminder time (optional). The habit SHALL be assigned to the authenticated user and marked as active. The habit ID SHALL be generated as a UUID via `crypto.randomUUID()`.

Recurrence types:
- **daily**: habit is due every day
- **weekly**: habit is due on specific weekdays (user selects one or more days)
- **weekly_count**: habit is due X times per week (user specifies count, any days)

#### Scenario: Successful habit creation with daily recurrence
- **WHEN** an authenticated user submits the create habit form with name "Meditar", description "10 minutos de meditação", recurrence type "daily"
- **THEN** the system creates a new habit record with the provided data, `isActive = true`, `currentStreak = 0`, `longestStreak = 0`, and the path `/habits` is revalidated

#### Scenario: Successful habit creation with weekly recurrence
- **WHEN** an authenticated user submits the create habit form with name "Correr", recurrence type "weekly", weekdays [1, 3, 5] (Monday, Wednesday, Friday)
- **THEN** the system creates the habit with `recurrenceWeekdays` set to `[1, 3, 5]`

#### Scenario: Successful habit creation with weekly count recurrence
- **WHEN** an authenticated user submits the create habit form with name "Ler", recurrence type "weekly_count", weekly count 4
- **THEN** the system creates the habit with `recurrenceWeeklyCount` set to 4

#### Scenario: Habit creation with preferred time
- **WHEN** an authenticated user creates a habit and sets preferred time to "07:00"
- **THEN** the system stores the preferred time as `07:00` in the `preferredTime` field

#### Scenario: Unauthenticated user attempts to create habit
- **WHEN** a request to create a habit is made without a valid session
- **THEN** the system returns an error with code `UNAUTHORIZED`

### Requirement: Free tier limits habit creation to 3 active habits
The system SHALL enforce a maximum of 3 active habits for users on the Free plan. Users on the Pro plan SHALL have no limit on active habits.

#### Scenario: Free user at habit limit
- **WHEN** a Free tier user who already has 3 active habits attempts to create a new habit
- **THEN** the system returns an error with code `TIER_LIMIT_EXCEEDED` and message indicating the limit has been reached

#### Scenario: Free user below limit
- **WHEN** a Free tier user who has fewer than 3 active habits creates a new habit
- **THEN** the system creates the habit successfully

#### Scenario: Free user with archived habits does not count toward limit
- **WHEN** a Free tier user has 2 active habits and 3 archived habits and creates a new habit
- **THEN** the system creates the habit successfully (only active habits count toward the limit)

### Requirement: Habit name must be unique per user among active habits
The system SHALL prevent a user from creating two active habits with the same name. The uniqueness constraint is scoped to (userId, name, isActive).

#### Scenario: Duplicate name among active habits
- **WHEN** a user attempts to create a habit with name "Meditar" and they already have an active habit named "Meditar"
- **THEN** the system returns an error with code `ALREADY_EXISTS` and a message indicating the name is already in use

#### Scenario: Same name as archived habit is allowed
- **WHEN** a user creates a habit with name "Meditar" and they have an archived (inactive) habit with the same name
- **THEN** the system creates the habit successfully

### Requirement: User can edit a habit
The system SHALL allow a user to update an existing active habit's name, description, recurrence type, recurrence configuration, and preferred time. The `updatedAt` timestamp SHALL be refreshed on update.

#### Scenario: Successful habit update
- **WHEN** a user updates their habit's name from "Meditar" to "Meditar 15min"
- **THEN** the system updates the habit record, refreshes `updatedAt`, and revalidates the path

#### Scenario: User cannot edit another user's habit
- **WHEN** a user attempts to update a habit that belongs to a different user
- **THEN** the system returns an error with code `NOT_FOUND`

### Requirement: User can archive a habit
The system SHALL allow a user to archive a habit by setting `isActive` to `false`. Archived habits are not deleted — their data and execution history are preserved. Archiving a habit frees up a slot for Free tier limits.

#### Scenario: Successful habit archival
- **WHEN** a user archives their active habit "Meditar"
- **THEN** the system sets `isActive = false` on the habit record and revalidates the path

#### Scenario: Archiving frees tier limit slot
- **WHEN** a Free tier user with 3 active habits archives one habit and then creates a new habit
- **THEN** the system creates the new habit successfully (now only 2 active habits before creation)

### Requirement: Validation rules for habit form
The system SHALL validate habit input with the following rules (error messages in pt-BR):
- `name`: required, min 1 character, max 100 characters
- `description`: optional, max 500 characters
- `recurrenceType`: required, must be one of "daily", "weekly", "weekly_count"
- `recurrenceWeekdays`: required when recurrenceType is "weekly", must be array of integers 0-6 with at least one day
- `recurrenceWeeklyCount`: required when recurrenceType is "weekly_count", must be integer between 1 and 7
- `preferredTime`: optional, must be valid time format (HH:mm)

#### Scenario: Missing habit name
- **WHEN** a user submits the habit form with an empty name
- **THEN** the system displays a validation error "Nome é obrigatório"

#### Scenario: Weekly recurrence without weekdays
- **WHEN** a user selects recurrence type "weekly" but does not select any weekdays
- **THEN** the system displays a validation error "Selecione pelo menos um dia da semana"

#### Scenario: Weekly count out of range
- **WHEN** a user selects recurrence type "weekly_count" and enters 0 or 8
- **THEN** the system displays a validation error "Informe um valor entre 1 e 7"
