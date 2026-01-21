# Tech Stack Specification

## Overview
Complete technical stack for Habit Coach AI with architectural decisions and rationale.

**Related:** `@/openspec/project.md` Tech Stack section, `@/docs/PRD.md` section 1.4

## Core Technologies

### Framework: Next.js 16
- **Version:** 16.x (latest)
- **Features Used:**
  - App Router (not Pages Router)
  - Server Components (default)
  - Server Actions (all mutations)
  - Edge Functions (future: AI processing)
  - Image Optimization (next/image)
- **Deployment:** Vercel (native support)
- **Why:** Latest stable, best DX for full-stack TypeScript, native support for Server Actions

### Runtime: Node.js 20+
- **Version:** 20.x LTS or 22.x
- **Why:** Latest LTS for better performance, security patches

### Language: TypeScript
- **Configuration:** `tsconfig.json` with `strict: true`
- **Type Safety:** End-to-end (frontend, Server Actions, database)
- **Why:** Prevents runtime errors, better IDE support, maintainability

---

## Database & ORM

### Database: PostgreSQL
- **Hosting:** Vercel Postgres or Neon (serverless)
- **Version:** 15+ (for JSON features)
- **Why:** 
  - Mature, reliable, widely adopted
  - JSON support for flexible data (preferences, AI metadata)
  - ACID compliance for financial transactions (future)
  - Cost-effective for MVP

### ORM: Drizzle ORM
- **Version:** 0.31.x+
- **Rationale:**
  - Full type-safety (return types auto-inferred)
  - Simple, readable query syntax
  - Migrations as TypeScript code
  - Better performance than Prisma for our use case
  - No prisma client generation step

### Migrations
- Directory: `src/database/migrations/`
- Execution: Via `drizzle-kit` CLI
- Versioning: ISO timestamp-based (e.g., `2025-01-21_001_create_users.sql`)

---

## Backend & API

### Server Actions
- **Pattern:** One Server Action per API endpoint/mutation
- **Naming:** `action<Resource><Verb>` (e.g., `actionCreateHabit`)
- **Validation:** Zod schema validation in each action
- **Error Handling:** Consistent error responses with user-friendly messages
- **Why:** Type-safe mutations, no REST API boilerplate, automatic CSRF protection

### next-safe-action
- **Version:** 7.x+
- **Usage:**
  - Wrapper around Server Actions for type-safe client/server communication
  - Automatic Zod validation
  - Error & success handling
  - Optimistic updates support
- **Pattern:**
  ```ts
  export const createHabitAction = createAction()
    .schema(createHabitSchema)
    .action(async ({ parsedInput, ctx }) => {
      // Implementation
    })
  ```

### Authentication & Sessions
- **Library:** Better Auth (https://www.better-auth.com/docs/basic-usage)
- **Package:** `better-auth` (não `@auth/better-auth`)
- **Session Storage:** Database-backed sessions (via Drizzle adapter)
- **Cookies:** httpOnly, Secure, SameSite=Lax (configuração automática)
- **Expiration:** 7 days inactivity (configurável)
- **Providers:** 
  - Email + Password (bcrypt automático via Better Auth)
  - Google OAuth (https://www.better-auth.com/docs/authentication/oauth)
  - GitHub OAuth
  - Magic Links (future)
- **2FA:** Suporte nativo (https://www.better-auth.com/docs/authentication/two-factor)
- **Referência oficial:** Consultar sempre a documentação do Better Auth para implementações

---

## Validation & Schema

### Zod
- **Usage:** Schema definition for all inputs (forms, API, database)
- **Pattern:**
  ```ts
  const createHabitSchema = z.object({
    name: z.string().min(1).max(100),
    frequency: z.enum(['daily', 'specific', 'per_week']),
    // ...
  })
  ```
- **Benefits:**
  - Runtime validation (prevents bad data)
  - Type inference from schema
  - Consistent error messages
  - Used throughout: forms, actions, API routes

---

## Frontend & UI

### React 19
- **Version:** 19.x (via Next.js 16)
- **Hooks:** All latest hooks (useActionState, etc.)
- **Server Components:** Default; Client components for interactivity

### UI Framework: shadcn/ui
- **Components:** Hand-picked subset
  - `Button`, `Input`, `Select`, `Dialog`, `Card`, `Badge`, `Progress`, `Tabs`
  - `Form` (with React Hook Form integration)
  - `Toast/Sonner` for notifications
  - `Chart` (for visualizations)
- **Philosophy:** Copy-paste components, fully customizable
- **Customization:** Tailwind config + CSS variables

### Styling: Tailwind CSS
- **Configuration:** `tailwind.config.ts` with custom theme
- **CSS Variables:** Used for dynamic theming
- **Plugins:** 
  - @tailwindcss/forms
  - @tailwindcss/typography
- **Utility-First:** Primary styling method (no component library CSS conflicts)

### Form Handling
- **Library:** React Hook Form (obrigatório para todos os formulários)
- **Integration:** Via shadcn/ui Form component (https://ui.shadcn.com/docs/components/form)
- **Validation:** Zod + React Hook Form integration (@hookform/resolvers/zod)
- **Pattern:** Controlled components com validação em tempo real
- **Referência:** https://react-hook-form.com/docs

---

## AI & Integrations

### OpenAI API
- **Model:** GPT-4 (latest stable)
- **Features:**
  - Chat completions for personality-driven responses
  - Fine-tuning (future) for character consistency
- **Client:** `@openai/sdk` (official TypeScript client)
- **Usage:** Via Server Actions only (API key never exposed to client)
- **Rate Limiting:** To be implemented (future)

### MCP (Model Context Protocol)
- **Purpose:** Goal decomposition into subtasks
- **Integration:** Via Server Actions
- **Invocation:** When user creates goal, trigger MCP to suggest subtasks
- **Response Format:** Structured JSON for subtask list

### Web Push Notifications
- **Service Worker:** Located in `public/sw.js`
- **Subscription:** User opt-in during onboarding
- **Payload:** JSON with notification data
- **Future:** WhatsApp/SMS integration (requires separate provider)

---

## Hosting & Deployment

### Application Hosting: Vercel
- **Deployment:** Git-based (push to main)
- **Environment:** Vercel Production
- **Functions:** Edge Functions for critical AI operations (future)
- **Analytics:** Vercel Analytics for performance monitoring

### Database Hosting
- **Option 1:** Vercel Postgres (managed, simple)
- **Option 2:** Neon (open source, flexible)
- **Backups:** Daily automated (managed service)
- **Connection:** Via pooled connections (PgBouncer)

### Environment Variables
```bash
# .env.local (development)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production (Vercel)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=https://habitcoach.ai
OPENAI_API_KEY=...
BETTER_AUTH_SECRET=...
```

---

## Development Tools

### Code Quality
- **Formatter:** Prettier (2 spaces, single quotes)
- **Linter:** ESLint with `eslint-config-next`
- **Type Checking:** `tsc --noEmit` in CI

### Package Manager
- **Tool:** pnpm (faster, disk-efficient)
- **Lock File:** `pnpm-lock.yaml`

### Database Tools
- **CLI:** `drizzle-kit` for migrations, introspection
- **Studio:** Drizzle Studio for local database inspection (future)

### Testing (Future)
- **Unit:** Vitest
- **E2E:** Playwright
- **Coverage:** 80%+ target

### CI/CD
- **Platform:** GitHub Actions
- **Checks:**
  - Type checking (`tsc`)
  - Linting (`eslint`)
  - Tests (when available)
  - Build verification

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Next.js 16 App Router           │
├──────────────┬──────────────────────────┤
│              │                          │
│  RSC + SSR   │   Client Components      │
│  (React 19)  │   (React 19)             │
│              │   (shadcn/ui, Tailwind)  │
│              │                          │
│    Server    │      Browser             │
│  Actions     │   (Web Push Service)     │
│  (Zod)       │                          │
│              │                          │
│              │  next-safe-action       │
│              │  (RPC bridge)           │
└──────────────┴──────────────────────────┘
         │              │
         │              │
    ┌────▼──────────────▼────┐
    │   Server-side API      │
    │  (Database queries,    │
    │   AI integrations)     │
    └────┬──────────────┬────┘
         │              │
    ┌────▼──┐      ┌────▼────────┐
    │ Drizzle│      │ OpenAI      │
    │ ORM    │      │ API + MCP   │
    │        │      │             │
    └────┬──┘      └────┬────────┘
         │              │
    ┌────▼──────────────▼────┐
    │   PostgreSQL            │
    │   (Vercel Postgres)     │
    │                         │
    │  - Users                │
    │  - Habits               │
    │  - Goals                │
    │  - Analytics            │
    └─────────────────────────┘
```

---

## Decision Rationale

### Why Next.js 16 + Server Actions?
- Single unified framework for frontend & backend
- Type-safe end-to-end (TypeScript everywhere)
- Server Actions eliminate REST API boilerplate
- native CSRF protection
- Better performance (no API latency)

### Why Drizzle instead of Prisma?
- Drizzle: Lighter, faster, better type inference
- Prisma: Heavier, requires client generation, slower for large schemas
- For MVP: Drizzle's simplicity wins

### Why PostgreSQL + Vercel Postgres?
- Mature, reliable, ACID-compliant
- Vercel Postgres: Zero-ops, automatic backups, pooling
- Cost-effective for MVP

### Why shadcn/ui?
- Headless components (full control)
- Tailwind-first (aligns with our design system)
- Copy-paste approach (no dependency hell)
- Active community, well-maintained

---

## Future Technology Decisions

1. **Realtime:** Consider WebSockets or Server-Sent Events when polling becomes bottleneck
2. **Analytics:** Add Posthog or Mixpanel for user behavior tracking
3. **Caching:** Redis via Vercel KV for session/data caching
4. **Search:** Elasticsearch or Meilisearch if search needs grow
5. **Video:** Mux for video content (if future features require)
