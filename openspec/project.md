# Project Context

## Purpose
Habit Coach AI é uma plataforma de coaching personalizado para construção de hábitos e alcance de metas, diferenciada pela integração de uma IA que assume personalidades de personagens famosos icônicos. O produto combina rastreamento tradicional de hábitos com análise inteligente, feedback motivacional personalizado e decomposição automática de metas complexas via MCP (Model Context Protocol).

**Objetivos principais:**
- Aumentar a taxa de conclusão de hábitos dos usuários em comparação com apps tradicionais
- Oferecer motivação personalizada através de IA com personalidades únicas
- Simplificar o planejamento de metas através de decomposição automática
- Criar uma experiência envolvente que mantenha usuários engajados a longo prazo
- Validar modelo de negócio freemium com conversão para assinatura Pro

**Referência:** Ver `@/docs/BRIEF.md` para problema, solução e diferencial competitivo.

## Tech Stack

### Core Framework & Runtime
- **Next.js 16** (App Router, Server Actions, React Server Components)
- **TypeScript** (type-safe end-to-end)
- **Node.js 20+**

### Backend & Database
- **PostgreSQL** (relational database - Vercel Postgres ou Neon)
- **Drizzle ORM** (type-safe ORM with migrations)
- **Server Actions** (form actions, mutations)
- **next-safe-action** (type-safe server actions with Zod validation)

### Authentication & Authorization
- **Better Auth** (sessio -ns, OAuth, magic links, 2FA - https://www.better-auth.com/docs) - IMPORTANT: usar actions nativas do Better Auth ex: Sign In
To sign a user in, you can use the signIn.email function provided by the client.

sign-in

const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {
    //callbacks
})
- **Zod** (schema validation, used with Better Auth)

### Frontend & UI
- **React 19** (via Next.js)
- **shadcn/ui** (design system components - https://ui.shadcn.com/docs)
- **Tailwind CSS** (utility-first CSS)
- **TailwindCSS Plugins**: animations, forms
- **React Hook Form** (formulários obrigatório - https://react-hook-form.com/docs)

### AI & Integrations
- **OpenAI GPT-4** (fine-tuned for character personalities)
- **MCP (Model Context Protocol)** (goal decomposition)

### Hosting & Deployment
- **Vercel** (application hosting, edge functions)
- **Vercel Postgres** or **Neon** (database hosting)

### Notifications (MVP)
- **Web Push API** (in-app notifications)
- **Future:** WhatsApp/SMS integration

**Referência:** Ver `@/docs/PRD.md` seção 1.4 para stack técnico detalhado.

## Project Conventions

### Resolução de Dúvidas
Em caso de qualquer dúvida técnica ou de implementação, consultar prioritariamente a documentação oficial das tecnologias adotadas:
- **Better Auth:** https://www.better-auth.com/docs/basic-usage
- **shadcn/ui:** https://ui.shadcn.com/docs/components
- **Next.js:** https://nextjs.org/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs/overview
- **React Hook Form:** https://react-hook-form.com/docs

### Code Style
- **Language:** TypeScript (strict mode)
- **Naming:** 
  - Components: PascalCase (`HabitCard.tsx`)
  - Utilities/helpers: camelCase (`formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE (`MAX_HABITS_FREE = 3`)
  - Database tables: snake_case (`user_habits`)
- **Formatting:** Prettier (2 spaces, single quotes)
- **Linting:** ESLint with Next.js config

**Referência:** Ver `@/docs/DESIGN-GUIDELINES.md` para componentes shadcn/ui e padrões visuais.

### Architecture Patterns
- **App Router Pattern:** `app/(auth)`, `app/(dashboard)`, `app/api` structure
- **Server Components by Default:** Client components marked with `'use client'` only when needed
- **Server Actions:** All database mutations via Server Actions with Zod validation
- **Type Safety:** Drizzle for database types, Zod for runtime validation
- **Middleware:** Better Auth middleware for session management

**Folder Organization Example:**
```
src/app/
├── (private)
│   ├── dashboard/
│   │   ├── actions/
│   │   │   ├── get-dashboard.ts
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── dashboard-content.tsx
│   │   │   ├── dashboard-loading.tsx
│   │   │   ├── status-card.tsx
│   │   │   └── habit-streak-chart.tsx
│   │   └── page.tsx
│   ├── habits/
│   │   ├── actions/
│   │   │   ├── get-habits.ts
│   │   │   ├── create-habit.ts
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── habit-form.tsx
│   │   │   ├── habit-list.tsx
│   │   │   └── table/
│   │   │       ├── table-actions.tsx
│   │   │       └── table-columns.tsx
│   │   ├── page.tsx
│   │   └── schemas/
│   │       └── habit-schema.ts
│   ├── goals/
│   │   ├── actions/
│   │   │   ├── get-goals.ts
│   │   │   ├── create-goal.ts
│   │   │   └── decompose-goal.ts
│   │   ├── components/
│   │   │   ├── goal-form.tsx
│   │   │   ├── goal-progress.tsx
│   │   │   └── ai-decomposition.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── (public)
│   ├── (auth)
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── social-login-buttons.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── schemas/
│   │       ├── sign-in-schema.ts
│   │       └── sign-up-schema.ts
│   ├── (home)/
│   │   ├── components/
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   └── footer.tsx
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   └── layout.tsx
└── api/
    ├── auth/
    ├── habits/
    └── goals/
```

**Database Schema:** Ver `@/openspec/specs/database-schema.md` (a ser criado).

### Testing Strategy
- **Unit Tests:** Vitest for utilities and helpers
- **Integration Tests:** Testing Server Actions and API routes
- **E2E Tests:** Playwright for critical user flows
- **Coverage Target:** >80% for core business logic

### Git Workflow
- **Branching:** feature/*, fix/*, refactor/* off main
- **Commits:** Conventional Commits (feat:, fix:, docs:, refactor:)
- **PR Reviews:** Required before merge to main
- **OpenSpec:** Use `openspec spec list` to check related specs before starting work

## Domain Context

### Core Concepts

**Hábito:** Ação recorrente que usuário quer rastrear (ex: meditar, estudar, exercitar).
- Frequência: Diária, dias específicos, X vezes/semana
- Streak: Sequência de dias consecutivos completos
- Status: Pode marcar como completo hoje ou até 7 dias atrás

**Meta:** Objetivo com prazo e múltiplas subtarefas (ex: "Aprender React Native").
- Subtarefas: Ações concretas que compõem a meta
- Progresso: % de subtarefas completas
- Decomposição automática: IA sugere subtarefas via MCP

**IA com Personalidades:** Cada usuário escolhe uma personalidade icônica que oferece:
- Motivação ao completar hábitos/subtarefas
- Análise de padrões
- Sugestões de melhoria
- Chat livre para perguntas

**Personalidades (MVP):**
1. Mestre Yoda (sábio, invertendo frases)
2. General Motivador (direto, intenso)
3. Mentor Empático (gentil, compreensivo)

### User Personas

**Referência:** Ver `@/docs/PRD.md` seção 2 para personas detalhadas.

- **Ana:** Profissional ambiciosa, busca motivação e estrutura
- **Carlos:** Estudante disciplinado, precisa de feedback visual
- **Mariana:** Em transformação, busca motivação suave

### Freemium Model

**Free Plan:**
- 3 hábitos ativos
- 1 meta ativa
- 1 personalidade de IA
- Dashboards básicos

**Pro Plan (R$ 29,90/mês):**
- Hábitos e metas ilimitados
- Todas as personalidades
- Análise preditiva avançada
- Decomposição automática completa
- Notificações personalizadas ilimitadas

## Important Constraints

### Technical Constraints
- **MVP Scope:** Notificações apenas Web Push (MVP); WhatsApp/SMS é futuro
- **Database:** PostgreSQL apenas; sem NoSQL para manter simplicidade
- **Realtime:** Polling apenas (MVP); WebSockets é futuro
- **Analytics:** Básico apenas; dashboards preditivos com ML é futuro

### Business Constraints
- **Timeline MVP:** 8-12 semanas
- **Target Users:** Early adopters interessados em IA e produtividade
- **Geographic Focus:** Brasil (PT-BR) + possível expansão

### Security & Privacy Constraints
- **Data Isolation:** Todos dados isolados por userId
- **GDPR/LGPD:** Usuários podem exportar e deletar dados
- **AI Privacy:** Conversas com IA não compartilhadas; dados não usados para treinar (segue OpenAI ToS)

**Referência:** Ver `@/docs/PRD.md` seção 5 para requisitos não-funcionais completos.

## External Dependencies

### APIs & Services
- **OpenAI API:** GPT-4 para IA, fine-tuning para personalidades
- **MCP (Model Context Protocol):** Para decomposição automática de metas
- **Web Push Service:** Browser notifications (nativo)
- **OAuth Providers:** Google, GitHub (via Better Auth)

### Third-Party SDKs
- **next/auth:** Via Better Auth (abstração)
- **@openai/sdk:** Client TypeScript para OpenAI
- **drizzle-orm:** ORM package
- **zod:** Validation library
- **shadcn/ui:** Headless components

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# AI
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4
OPENAI_ORG_ID=... (optional)

# App
NEXT_PUBLIC_APP_URL=...
NODE_ENV=production
```

---

## Related Documentation

**Docs folder** (`@/docs/`):
- `BRIEF.md` - Executive summary, business model, metrics
- `PRD.md` - Full product requirements, personas, user stories, technical details
- `MVP-SCOPE.md` - MVP features, out-of-scope, technical limitations
- `DESIGN-GUIDELINES.md` - Visual identity, color palette, typography, components
- `LANDING-PAGE-SPEC.md` - Landing page structure

