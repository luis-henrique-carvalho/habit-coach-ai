## 1. Setup Testing Infrastructure

- [ ] 1.1 [TDD-IMPL] Install and configure Vitest and necessary plugins (e.g., `@testing-library/react`, `jsdom`, etc.) in `vitest.config.ts` for Unit and Integration tests
- [ ] 1.2 [TDD-IMPL] Install and configure Playwright in `playwright.config.ts` for End-to-End tests
- [ ] 1.3 [TDD-IMPL] Setup a testing database environment or transaction rollback mechanism for Drizzle ORM to isolate integration tests

## 2. Unit Tests for Habit Logic

- [ ] 2.1 [TDD-TEST] Write unit tests in `src/app/(private)/habits/schemas/upsert-habit-schema.test.ts` for valid and invalid habit creation input
- [ ] 2.2 [TDD-TEST] Write unit tests in `src/app/(private)/habits/components/habit-heatmap.test.ts` to validate the UI logic and rendering
- [ ] 2.3 [TDD-IMPL] Ensure any failing logic identified by the unit tests is corrected and refactored
- [ ] 2.4 [QUALITY] Run `pnpm eslint .` to validate the newly added unit tests
- [ ] 2.5 [QUALITY] Run `tsc --noEmit` to ensure type safety in unit tests

## 3. Integration Tests for Server Actions

- [ ] 3.1 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/upsert-habit.test.ts` ensuring successful DB insertion and user_id association
- [ ] 3.2 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/get-habits.test.ts` for cross-user data isolation (User A cannot fetch/modify User B's habits)
- [ ] 3.3 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/toggle-habit-completion.test.ts` for updating a habit's completion status
- [ ] 3.4 [TDD-TEST] Write integration tests in `src/app/(private)/habits/actions/archive-habit.test.ts` for archiving a habit
- [ ] 3.5 [TDD-IMPL] Fix any Server Action implementation issues discovered during integration testing to make all tests pass
- [ ] 3.6 [QUALITY] Run `pnpm eslint .` to validate integration tests
- [ ] 3.7 [QUALITY] Run `tsc --noEmit` to check types for integration tests

## 4. E2E Tests for the Habit User Journey

- [ ] 4.1 [TDD-TEST] Write E2E test in `src/app/(private)/habits/habits-dashboard.e2e.ts` simulating a user visiting `/habits/` and verifying the list is rendered
- [ ] 4.2 [TDD-TEST] Write E2E test in `src/app/(private)/habits/habits-crud.e2e.ts` for the full CRUD flow: filling "New Habit" form, submitting, toggling completion status, and deleting the habit
- [ ] 4.3 [TDD-IMPL] Address any UI or client-side optimistic update bugs found during the E2E test execution
- [ ] 4.4 [QUALITY] Run `pnpm eslint .` to validate E2E tests
- [ ] 4.5 [QUALITY] Run `tsc --noEmit` to ensure type safety across the E2E test suite
