# habits-testing-suite Specification

## Purpose
TBD - created by archiving change habits-crud-testing. Update Purpose after archive.
## Requirements
### Requirement: Unit Testing Core Logic
The system SHALL have unit tests covering habit validation schemas, business logic, and utilities to ensure data integrity before database interaction.

#### Scenario: Validating Habit Creation Input
- **WHEN** valid habit data (title, frequency, etc.) is passed to the validation schema
- **THEN** the schema validation passes without errors

#### Scenario: Rejecting Invalid Habit Input
- **WHEN** invalid habit data (e.g., missing title, incorrect frequency format) is passed to the schema
- **THEN** the schema validation fails and returns appropriate error messages

### Requirement: Integration Testing Server Actions
The system SHALL have integration tests for the habit Server Actions to verify correct interaction with the Drizzle ORM and proper user data scoping.

#### Scenario: Creating a New Habit
- **WHEN** a logged-in user calls the create habit Server Action with valid data
- **THEN** the habit is successfully inserted into the test database and associated with that user's ID

#### Scenario: Preventing Cross-User Data Access
- **WHEN** User A attempts to fetch or modify a habit owned by User B
- **THEN** the action fails or returns no data, enforcing data isolation

#### Scenario: Updating Habit Status
- **WHEN** a user calls the Server Action to toggle a habit's completion status for the day
- **THEN** the corresponding record in the database is updated to reflect the new state

### Requirement: E2E Testing the User Journey
The system SHALL have End-to-End tests to simulate the user experience of navigating and managing habits in the UI.

#### Scenario: Viewing the Habits Dashboard
- **WHEN** an authenticated user navigates to `/habits/`
- **THEN** the page loads successfully and displays the user's current list of habits

#### Scenario: Full CRUD Interaction Flow
- **WHEN** a user fills and submits the "New Habit" form, views the created habit, updates it, and then deletes it
- **THEN** the UI updates optimistically or after revalidation to accurately reflect each state change throughout the flow

