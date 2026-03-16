# Implementation Tasks

## Preparation
- [x] Ensure `dotenv-cli` is installed as a devDependency to easily inject `.env.test` vars.

## 1. Refactor Test Seed Route
- [x] Modify `src/app/api/test/seed/route.ts`.
- [x] Remove manual insertion of `user` and `session`.
- [x] Add logic to delete any existing `habitExecution` and `habit` for the email `cypress@example.com`.
- [x] Add logic to delete the user `cypress@example.com` from the `user` table to ensure a clean slate for sign-up.

## 2. Refactor Cypress Login Command
- [x] Modify `cypress/support/commands.ts`.
- [x] Update `cy.login()` to first POST to `/api/test/seed`.
- [x] Then `cy.request` POST to `/api/auth/sign-up/email` with the test credentials (`cypress@example.com` / `password123` / `Cypress Tester`).

## 3. Update NPM Scripts
- [x] Add/update script: `"db:test:up": "docker-compose -f docker-compose.test.yml up -d"`
- [x] Add script: `"e2e": "pnpm db:test:up && dotenv -e .env.test -- start-server-and-test dev http://localhost:3000 cypress:run"`
- [x] Add script: `"e2e:ui": "pnpm db:test:up && dotenv -e .env.test -- start-server-and-test dev http://localhost:3000 cypress:open"`

## Verification
- [ ] Run `pnpm e2e` and verify all tests pass without timeout errors.