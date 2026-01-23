<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Habit Coach AI is a personalized habit tracking platform with AI coaching using famous character personalities. Built with Next.js 16, PostgreSQL, and Better Auth.

## Commands

```bash
# Development
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Production build
pnpm lint             # ESLint

# Database (Drizzle)
pnpm drizzle-kit push        # Push schema changes to database
pnpm drizzle-kit generate    # Generate migrations
pnpm drizzle-kit studio      # Open Drizzle Studio GUI
```

## Architecture

### Route Groups
- `src/app/(public)/` - Public routes (landing, auth pages)
- `src/app/(private)/` - Protected routes requiring authentication (dashboard, habits)
- `src/app/api/auth/[...all]/` - Better Auth API handler

### Feature Module Pattern
Features are organized under `src/app/(private)/[feature]/`:
```
habits/
├── actions/           # Server Actions with next-safe-action
├── components/        # Feature-specific components
├── schemas/           # Zod validation schemas
├── utils/             # Feature utilities
└── (pages)/           # Nested route pages ([id]/edit, new)
```

### Key Files
- `src/lib/auth.ts` - Better Auth server configuration
- `src/lib/auth-client.ts` - Better Auth client for components
- `src/lib/safe-action.ts` - next-safe-action client
- `src/middleware.ts` - Route protection (checks `better-auth.session_token` cookie)
- `src/db/index.ts` - Drizzle database client
- `src/db/schema/` - Database schema definitions

### Authentication Pattern
Uses Better Auth with Drizzle adapter. Server actions get session via:
```typescript
const session = await auth.api.getSession({ headers: await headers() });
```

Client components use:
```typescript
import { authClient } from "@/lib/auth-client";
await authClient.signIn.email({ email, password, callbackURL: "/dashboard" });
```

### Server Actions Pattern
All mutations use next-safe-action with Zod schemas:
```typescript
export const createHabit = actionClient
  .inputSchema(createHabitSchema)
  .action(async ({ parsedInput }) => { ... });
```

### Database Schema
- `user`, `session`, `account`, `verification` - Better Auth tables
- `habit` - User habits with streaks
- `habit_recurrence` - Recurrence config (daily/weekly/monthly/annual)
- `habit_execution` - Completion records (one per habit per date)

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. Before making significant changes:
1. Check `openspec/project.md` for conventions and domain context
2. Run `openspec list` to see active changes
3. For new features/breaking changes, create a proposal in `openspec/changes/[change-id]/`

See `openspec/AGENTS.md` for full workflow documentation.

## Code Conventions

- TypeScript strict mode
- Components: PascalCase, Utilities: camelCase, DB tables: snake_case
- Use `@/` path alias for imports
- shadcn/ui (new-york style) for UI components
- React Hook Form for all forms
- Zod for validation (integrated with Better Auth and next-safe-action)

## Environment Variables

Required in `.env.local` (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret key
- `BETTER_AUTH_URL` - Base URL for auth
- OAuth credentials (optional): `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`
