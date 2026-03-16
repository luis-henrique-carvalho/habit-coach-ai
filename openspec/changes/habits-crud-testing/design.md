## Context

Habit Coach AI needs a robust testing foundation to maintain the quality of its core MVP features. The first step is to implement a comprehensive testing suite for the Habits module, covering unit, integration, and end-to-end (E2E) scenarios. Currently, the application lacks an established pattern for testing Next.js Server Actions, Drizzle ORM operations with user scoping, and UI interactions in the app router.

## Goals / Non-Goals

**Goals:**
- Establish a reliable test infrastructure (Vitest for Unit/Integration, Playwright or Cypress for E2E).
- Validate the complete CRUD lifecycle of a habit.
- Ensure proper data isolation (user_id scoping) is respected in all operations.
- Provide a clear pattern for writing future tests in the platform, using colocation (tests alongside the code, e.g., `file.test.ts` instead of `__tests__` folders).

**Non-Goals:**
- Testing the AI conversational features or MCP interactions (these will be addressed in a separate test strategy).
- Performance testing or load testing.

## Decisions

- **Test Frameworks**:
  - **Unit & Integration**: Vitest. It provides excellent TypeScript support, is fast, and integrates well with our existing tooling.
  - **E2E**: Playwright. It offers robust capabilities for testing Next.js applications and handles modern web features reliably.
- **Colocation of Tests**:
  - All test files will be strictly colocated within `src/app/(private)/habits/`, directly alongside the files they are testing (e.g., `src/app/(private)/habits/actions/upsert-habit.test.ts`), avoiding global or isolated `__tests__` directories.
- **Database Testing**:
  - Use a dedicated testing database (e.g., a local PostgreSQL instance or a transactional rollback strategy with Drizzle) to avoid side effects between integration tests.
- **Mocking Strategy**:
  - **Auth (NextAuth / Better Auth / etc.)**: Mock the session context for unit/integration tests to simulate authenticated users. For E2E, use a bypass mechanism or a test user account to skip the UI login flow.

## Test Plan

### Unit Tests
- **Target**: Zod validation schemas and component logic within the habits module.
- **Cases**:
  - Habit creation schema validates required fields (title, frequency, etc.).
  - Invalid data structures are correctly rejected.

### Integration Tests
- **Target**: Server Actions and Drizzle ORM queries colocated in `src/app/(private)/habits/actions/`.
- **Cases**:
  - Create: Insert a habit successfully and verify it exists in the test DB.
  - Read: Fetch habits for a specific user. Ensure User A cannot see User B's habits.
  - Update: Modify a habit's title or status and verify the DB update.
  - Delete/Archive: Archive a habit and verify it is no longer retrievable in main queries.

### E2E Tests
- **Target**: The user journey in the `/habits/` pages, tested via files like `habits-crud.e2e.ts`.
- **Cases**:
  - User visits the habits dashboard and sees their current habits.
  - User clicks "New Habit", fills out the form, submits, and sees the new habit in the list.
  - User toggles the status of a habit (e.g., marks it as done for the day) and the UI updates appropriately without reloading.
  - User edits an existing habit and archives it, confirming the UI reflects the removal.

## Risks / Trade-offs

- **Risk**: Flaky integration tests due to shared database state.
  - **Mitigation**: Implement strict test teardowns or use isolated transactions for each test run to ensure a clean state.
- **Risk**: E2E tests slowing down the CI pipeline significantly.
  - **Mitigation**: Keep E2E tests focused on the critical path (CRUD) and mock non-essential external requests during test runs.
