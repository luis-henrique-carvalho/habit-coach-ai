## Why

We need to establish a comprehensive testing suite for the application, starting with the core Habits module. This ensures the reliability of the main features (complete CRUD), prevents regressions as the platform evolves, and maintains high quality for the core MVP functionalities.

## What Changes

- Set up the overall testing infrastructure (unit, integration, and E2E) if not already fully configured.
- Implement unit tests for habit validation schemas and local logic, colocated within the `src/app/(private)/habits` module.
- Implement integration tests for habit database operations (Drizzle ORM) and Server Actions, colocated in `src/app/(private)/habits/actions`.
- Implement End-to-End (E2E) tests covering the complete user journey for the Habits CRUD, placed inside `src/app/(private)/habits`.

## Capabilities

### New Capabilities
- `habits-testing-suite`: Comprehensive test coverage encompassing unit, integration, and E2E tests for the habits feature, utilizing a strictly colocated file structure.

### Modified Capabilities

## Impact

- `src/app/(private)/habits/` pages, components, actions, and schemas
- Testing configuration files (`vitest.config.ts`, `playwright.config.ts`, etc.)
- CI/CD pipelines (potentially adding test steps)
