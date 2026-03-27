## MODIFIED Requirements

### Requirement: E2E Testing the User Journey
The system SHALL have End-to-End tests using Cypress to simulate the complete user experience of navigating and managing habits in the UI, organized in separate test files by operation type within `cypress/e2e/habits/`.

#### Scenario: Viewing the Habits Dashboard
- **WHEN** an authenticated user navigates to `/habits/`
- **THEN** the page loads successfully and displays the user's current list of habits with their names, recurrence labels, and completion toggle buttons

#### Scenario: Full CRUD Interaction Flow
- **WHEN** a user creates a habit via the "Adicionar Hábito" button and form dialog, views the created habit in the listing, updates it via the edit dialog accessed from the context menu, toggles its completion status, and archives it via the archive confirmation dialog
- **THEN** the UI updates to accurately reflect each state change throughout the flow, with toast notifications confirming successful operations

#### Scenario: Modular test organization
- **WHEN** the E2E test suite for habits is organized
- **THEN** tests SHALL be split into separate files under `cypress/e2e/habits/` directory, with each file covering a single CRUD operation (create, read, update, archive, toggle, detail)
