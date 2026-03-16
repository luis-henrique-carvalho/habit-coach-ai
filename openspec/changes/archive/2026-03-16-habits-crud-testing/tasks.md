## 1. Setup Testing Infrastructure

- [x] 1.1 [TDD-IMPL] Create `test/globalSetup.ts` to orchestrate Testcontainers (or Docker Compose) and run Drizzle migrations before Vitest runs.
- [x] 1.2 [TDD-IMPL] Create `test/setup.ts` to perform database teardowns/truncates `afterEach` or `beforeEach` to ensure a clean state.
- [x] 1.3 [TDD-IMPL] Update `vitest.config.ts` to run in a `node` environment, mapping the aforementioned setup files.
- [x] 1.4 [TDD-IMPL] Install and configure Cypress in `cypress.config.ts` for End-to-End browser UI tests.
## 2. Unit Tests for Habit Logic

- [x] 2.1 [TDD-TEST] Write unit tests in `src/app/(private)/habits/schemas/upsert-habit-schema.test.ts` for valid and invalid habit creation input
- [x] 2.2 [TDD-TEST] Write unit tests for data transformation logic (e.g., `habit-heatmap-data.test.ts`), focusing solely on pure functions without React rendering.
- [x] 2.3 [TDD-IMPL] Ensure any failing logic identified by the unit tests is corrected and refactored
- [x] 2.4 [QUALITY] Run `pnpm eslint .` to validate the newly added unit tests
- [x] 2.5 [QUALITY] Run `tsc --noEmit` to ensure type safety in unit tests
- [x] 2.6 [QUALITY] Rodar testes
- [x] 2.7 [QUALITY] Caso testes falhem, refatorar e repetir até que todos os testes passem, SEM FALSO POSITIVE OU ALTERAÇÃO DE LÓGICA PARA PASSAR OS TESTES

## 3. Integration Tests for Server Actions

- [x] 3.1 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/upsert-habit.test.ts` ensuring successful DB insertion and user_id association
- [x] 3.2 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/get-habits.test.ts` for cross-user data isolation (User A cannot fetch/modify User B's habits)
- [x] 3.3 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/toggle-habit-completion.test.ts` for updating a habit's completion status
- [x] 3.4 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/archive-habit.test.ts` for archiving a habit
- [x] 3.5 [TDD-IMPL] Fix any Server Action implementation issues discovered during integration testing to make all tests pass
- [x] 3.6 [QUALITY] Run `pnpm eslint .` to validate integration tests
- [x] 3.7 [QUALITY] Run `tsc --noEmit` to check types for integration tests
- [x] 3.8 [QUALITY] Rodar testes
- [x] 3.9 [QUALITY] Caso testes falhem, refatorar e repetir até que todos os testes passem, SEM FALSO POSITIVE OU ALTERAÇÃO DE LÓGICA PARA PASSAR OS TESTES

## 4. E2E Tests for the Habit User Journey

- [x] 4.1 [TDD-TEST] Write Cypress E2E test in `cypress/e2e/habits-dashboard.cy.ts` simulating a user visiting `/habits/` and verifying the list is rendered.
- [x] 4.2 [TDD-TEST] Write Cypress E2E test in `cypress/e2e/habits-crud.cy.ts` for the full CRUD UI flow: creating a habit, fetching, toggling completion, and deleting it visually.
- [x] 4.3 [TDD-IMPL] Address any UI or client-side optimistic update bugs found during the E2E test execution.
- [x] 4.4 [QUALITY] Run `pnpm eslint .` to validate E2E tests.
- [x] 4.5 [QUALITY] Run `tsc --noEmit` to ensure type safety across the E2E test suite.
- [ ] 4.6 [QUALITY] Rodar testes
- [ ] 4.7 [QUALITY] Caso testes falhem, refatorar e repetir até que todos os testes passem, SEM FALSO POSITIVE OU ALTERAÇÃO DE LÓGICA PARA PASSAR OS TESTES
