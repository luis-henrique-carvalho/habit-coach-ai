## ADDED Requirements

### Requirement: E2E test structure organized by module
The Cypress E2E test directory SHALL be organized by feature module using subdirectories under `cypress/e2e/`. Each module SHALL have its own directory containing test files grouped by functionality (e.g., `cypress/e2e/habits/`).

#### Scenario: Habits module directory structure
- **WHEN** the test suite is set up for the habits module
- **THEN** the directory `cypress/e2e/habits/` SHALL exist and contain separate test files for each CRUD operation: `create-habit.cy.ts`, `read-habits.cy.ts`, `update-habit.cy.ts`, `archive-habit.cy.ts`, `toggle-completion.cy.ts`, and `habit-detail.cy.ts`

### Requirement: Custom Cypress commands for habit operations
The test suite SHALL provide reusable custom Cypress commands to reduce duplication across test files.

#### Scenario: Creating a habit via custom command
- **WHEN** a test calls `cy.createHabit('Meditar', { recurrenceType: 'daily' })`
- **THEN** the command SHALL open the "Novo Hábito" dialog, fill the form with the provided data, submit it, and wait until the habit appears in the listing

#### Scenario: Opening a habit's context menu via custom command
- **WHEN** a test calls `cy.openHabitMenu('Meditar')`
- **THEN** the command SHALL locate the habit card containing the text "Meditar", hover or trigger to make the actions button visible, and click it to open the DropdownMenu

### Requirement: E2E test for creating habits
The system SHALL have E2E tests that verify creating habits with all recurrence types via the UI form dialog.

#### Scenario: Create a daily habit
- **WHEN** an authenticated user clicks "Adicionar Hábito", fills the form with name "Meditar", description "10 minutos", recurrence type "Diário", and clicks "Criar"
- **THEN** the dialog SHALL close and the habit "Meditar" SHALL appear in the habits listing

#### Scenario: Create a habit with specific weekdays
- **WHEN** an authenticated user creates a habit with name "Correr", recurrence type "Dias específicos", and selects weekdays "Seg", "Qua", "Sex"
- **THEN** the dialog SHALL close and the habit "Correr" SHALL appear in the habits listing

#### Scenario: Create a habit with weekly count
- **WHEN** an authenticated user creates a habit with name "Ler", recurrence type "X vezes por semana", and enters count 4
- **THEN** the dialog SHALL close and the habit "Ler" SHALL appear in the habits listing

#### Scenario: Validate required name field
- **WHEN** an authenticated user opens the new habit dialog and clicks "Criar" without filling the name field
- **THEN** the form SHALL display a validation error message for the name field and SHALL NOT close the dialog

#### Scenario: Enforce free tier limit of 3 habits
- **WHEN** an authenticated free-tier user has already created 3 active habits and attempts to create a 4th
- **THEN** the system SHALL display an error indicating the limit has been reached

### Requirement: E2E test for reading/listing habits
The system SHALL have E2E tests that verify the habits listing page displays created habits and supports search.

#### Scenario: Display habits in listing
- **WHEN** an authenticated user has created habits and navigates to `/habits`
- **THEN** the page SHALL display all created habits with their names and recurrence labels

#### Scenario: Empty state when no habits exist
- **WHEN** an authenticated user with no habits navigates to `/habits`
- **THEN** the page SHALL display the empty state message "Nenhum hábito cadastrado"

#### Scenario: Search habits by name
- **WHEN** an authenticated user has multiple habits and types a search term in the search input
- **THEN** the page SHALL filter and display only habits matching the search term

### Requirement: E2E test for updating habits
The system SHALL have E2E tests that verify editing an existing habit's data via the edit dialog.

#### Scenario: Edit habit name
- **WHEN** an authenticated user opens the context menu for habit "Meditar", clicks "Editar", clears the name field, types "Meditar 15min", and clicks "Atualizar"
- **THEN** the dialog SHALL close and the habit SHALL appear with the updated name "Meditar 15min" in the listing

#### Scenario: Edit habit recurrence type
- **WHEN** an authenticated user opens the edit dialog for a daily habit and changes the recurrence type to "X vezes por semana" with count 3
- **THEN** the dialog SHALL close and the habit SHALL reflect the updated recurrence

### Requirement: E2E test for archiving habits
The system SHALL have E2E tests that verify archiving a habit through the confirmation dialog.

#### Scenario: Archive habit with confirmation
- **WHEN** an authenticated user opens the context menu for habit "Meditar", clicks "Arquivar", and clicks "Arquivar" in the confirmation dialog
- **THEN** the habit "Meditar" SHALL be removed from the active habits listing

#### Scenario: Cancel archive operation
- **WHEN** an authenticated user opens the context menu for habit "Meditar", clicks "Arquivar", and clicks "Cancelar" in the confirmation dialog
- **THEN** the habit "Meditar" SHALL remain in the habits listing

### Requirement: E2E test for toggling habit completion
The system SHALL have E2E tests that verify marking/unmarking a habit as completed for the current day.

#### Scenario: Mark habit as completed
- **WHEN** an authenticated user clicks the completion toggle button (circular button) on an uncompleted habit "Meditar"
- **THEN** the toggle button SHALL visually indicate completion (filled green circle with checkmark) and the habit name SHALL appear with strikethrough styling

#### Scenario: Unmark completed habit
- **WHEN** an authenticated user clicks the completion toggle button on a completed habit "Meditar"
- **THEN** the toggle button SHALL revert to the uncompleted state (empty circle) and the habit name SHALL no longer have strikethrough styling

### Requirement: E2E test for habit detail page
The system SHALL have E2E tests that verify navigation to and content of the habit detail page.

#### Scenario: Navigate to habit detail
- **WHEN** an authenticated user clicks on the habit name "Meditar" in the habits listing
- **THEN** the browser SHALL navigate to the habit detail page at `/habits/[id]` and display the habit name "Meditar" in the page title

#### Scenario: Return to habits listing
- **WHEN** a user is on the habit detail page and clicks the back button (ArrowLeft)
- **THEN** the browser SHALL navigate back to `/habits`

### Requirement: Test isolation and clean state
Each E2E test file SHALL start with a clean database state to ensure tests are independent and non-flaky.

#### Scenario: Database cleanup before each test
- **WHEN** a test file's `beforeEach` hook runs
- **THEN** the `cy.login()` command SHALL execute, cleaning all test user data and creating a fresh authenticated session
