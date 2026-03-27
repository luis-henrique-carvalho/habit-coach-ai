# Change Proposal: Fix Cypress Authentication and E2E Setup

## Context
Currently, Cypress E2E tests are failing because they attempt to manually insert a session token into a cookie. Better Auth requires signed cookies (HMAC), causing Next.js to reject the manual session cookie as invalid. This results in the page rendering an unauthenticated or error state, causing test timeouts. Additionally, the execution pipeline for E2E tests is partially implemented via `start-server-and-test` but lacks a seamless, unified script to run the local test DB, start the Next.js app with test variables, and execute Cypress.

## Proposed Change
1. **Refactor `/api/test/seed/route.ts`**: Change the seed route to perform purely teardown/cleanup logic. It will remove existing habits and user accounts associated with the test email, ensuring a clean state before each test run.
2. **Update `cypress/support/commands.ts`**: Refactor the `cy.login()` command to call the `seed` route for cleanup, followed by a direct call to the `/api/auth/sign-up/email` Better Auth endpoint to create a real user session. This ensures Better Auth natively sets the correctly signed session cookies.
3. **Enhance E2E Scripts (`package.json`)**: Configure new scripts utilizing `start-server-and-test`, `docker-compose.test.yml`, and `dotenv-cli` to correctly start the local Postgres test container, boot the Next.js server utilizing the `.env.test` file, and run Cypress in UI or headless modes seamlessly.

## Impact
- Cypress tests will successfully authenticate, resolving the "Adicionar Hábito" timeout.
- Running E2E tests becomes an automated, single-command process.
- The `seed` endpoint no longer needs to hack around Better Auth internals.