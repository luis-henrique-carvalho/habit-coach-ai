# Project Context

## Purpose

**Habit Coach AI** é uma plataforma de coaching personalizado para construção de hábitos e alcance de metas, diferenciada pela integração de uma IA que assume personalidades de personagens famosos icônicos.

### Objetivos Principais:
- Aumentar a taxa de conclusão de hábitos comparado com apps tradicionais
- Oferecer motivação personalizada através de IA com personalidades únicas
- Simplificar o planejamento de metas através de decomposição automática via MCP
- Validar modelo de negócio freemium com conversão para assinatura Pro

**Para detalhes completos, consulte:**
- 📋 [PRD.md](../../docs/PRD.md) - Product Requirements Document
- 📝 [BRIEF.md](../../docs/BRIEF.md) - Problema, solução e proposta de valor
- 🎯 [MVP-SCOPE.md](../../docs/MVP-SCOPE.md) - Escopo do MVP

---

## Tech Stack

### Framework & Runtime
- **Next.js 16** (App Router, React Server Components)
- **React 19** com TypeScript
- **Node.js** (backend runtime)

### Database & ORM
- **PostgreSQL** (Vercel Postgres ou Neon)
- **Drizzle ORM** (type-safe, migrations versionadas)

### Authentication & Security
- **Better Auth** (sessões, OAuth, 2FA, magic links)
- **Zod** (schema validation end-to-end)

### AI & LLM
- **OpenAI GPT-4** (coaching com personalidades)
- **MCP (Model Context Protocol)** (decomposição automática de metas)

### UI/UX Framework
- **Tailwind CSS v4** (utility-first CSS)
- **shadcn/ui** (componentes base reutilizáveis)
- **Framer Motion** (animações e transições)
- **Lucide React** (ícones)
- **React Hook Form** (gerenciamento de formulários)

### Development Tools
- **TypeScript** (type safety)
- **ESLint** (linting)
- **Drizzle Kit** (migrations)
- **next-safe-action** (type-safe mutations)

**Ver stack completo em:** [package.json](../../package.json)

---

## Project Conventions

### Code Style

**TypeScript Obrigatório:**
- Tipagem explícita em todos os arquivos (`.ts`, `.tsx`)
- Strict mode habilitado em `tsconfig.json`

**Naming Conventions:**
- **Componentes React:** PascalCase (ex: `HabitForm.tsx`, `GoalCard.tsx`)
- **Variáveis/Funções:** camelCase (ex: `getUserHabits()`, `habitCount`)
- **Constants:** UPPER_SNAKE_CASE (ex: `MAX_HABITS_FREE`, `API_TIMEOUT`)
- **Diretórios:** kebab-case (ex: `auth-schema`, `landing-page`)

**Imports:**
- Absolute imports usando `@/` alias
- Group imports: React → External libs → Internal modules

**Formatting:**
- Use Prettier/ESLint (já configurado)
- Linha máxima: 100 caracteres (recomendado)

**Ver detalhes em:** [DESIGN-GUIDELINES.md](../../docs/DESIGN-GUIDELINES.md)

### Architecture Patterns

**Server Actions Pattern:**
- Mutações via `next-safe-action` (type-safe)
- Localização: `src/app/*/actions/` (ex: `src/app/(private)/habits/actions/`)
- Validação com Zod schemas
- Exemplo: `create-habit.ts`, `update-goal.ts`

**Database Layer:**
- Drizzle ORM para queries
- Schemas: `src/db/schema/` (separate files for each domain)
- Type-safe queries com Drizzle

**Component Organization:**
- **Page Components:** `src/app/*/page.tsx`
- **Reusable Components:** `src/components/`
- **UI Components:** `src/components/ui/` (shadcn/ui primitives)
- **Domain Components:** `src/app/*/components/` (specific features)

**Authentication Flow:**
- Better Auth middleware em `src/middleware.ts`
- Protected routes em `(private)` layout
- Public routes em `(public)` layout

### Design System

**Paleta de Cores - Signal Orange (OKLCH):**
- `--primary: oklch(0.65 0.25 45)` - Energia, Ação, Alerta
- `--background: oklch(0.99 0.01 45)` - Light background
- Usar sempre as **variáveis CSS** do `globals.css`

**Tipografia - Typographic Bold:**
- **Display Max:** `text-9xl font-black` (Hero Headlines)
- **Hero Title:** `text-7xl font-bold` (Sub-headlines)
- **Section Title:** `text-5xl font-bold` (Cabeçalhos)
- Use `tracking-tighter` em headlines massivos

**Espaçamento - 8pt Grid:**
- Micro gaps: `gap-1` (4px)
- Padrão: `p-4`, `gap-4` (16px)
- Seções: `py-8`, `py-12` (32px, 48px)
- Hero: `py-16`, `py-20` (64px, 80px)

### Testing Strategy

**Não especificado no MVP** - Foco em validação com usuários.

Recomendado para futuro:
- Unit tests com Vitest
- Integration tests
- E2E tests com Playwright

### Git Workflow

**Branches:**
- `main` - Production (protegido)
- `develop` - Development (base para PRs)
- `feature/*` - Novas features
- Convenção: `feature/add-habit-tracking`, `fix/auth-logout`

**Commits:**
- Conventional Commits recomendado
- Exemplos: `feat:`, `fix:`, `docs:`, `refactor:`

---

## Domain Context

### Personas & Use Cases

**Ana - Profissional Ambiciosa (28, Dev Software):**
- Quer hábitos de estudos e exercícios mas desiste por falta de motivação
- Necessita feedback personalizado e decomposição de metas complexas
- Exemplo: "Aprender React Native" → subtarefas (setup, tutorial, projeto)

**Carlos - Estudante Disciplinado (22, Engenharia):**
- Precisa de disciplina extrema para estudar para concursos
- Usa Notion/planilhas mas quer interface mais visual e motivadora
- Exemplo: Meta de 6h de estudo/dia → feedback direto e visual

**Mariana - Em Transformação (35, Gerente Marketing):**
- Quer transformar hábitos pessoais (fitness, meditação, leitura)
- Busca suporte emocional contínuo

**Ver detalhes completos em:** [PRD.md - Personas](../../docs/PRD.md)

### Core Features (MVP)

#### 1. Sistema de Hábitos
- Criar hábitos com frequência (diária, dias específicos, X/semana)
- Marcar completo (hoje + até 7 dias atrás)
- Heatmap de progresso (últimos 90 dias)
- Streak tracking (atual e recorde)
- Máximo 3 hábitos Free / Ilimitado Pro

#### 2. Sistema de Metas
- Criar metas com deadline e categoria
- Gerar subtarefas automaticamente via MCP
- Marcar subtarefas completas
- Alertas de prazo (7, 3, 1 dia antes)
- Máximo 1 meta Free / Ilimitado Pro

#### 3. IA com Personalidades
- **Mestre Yoda** (Sábio e Encorajador)
- **General Motivador** (Direto e Intenso)
- **Mentor Empático** (Gentil e Compreensivo)

Mensagens motivacionais em eventos: completar hábito, streak milestones, falhas, etc.

#### 4. Dashboards & Analytics
- Visualização de progresso com gráficos
- Análise semanal automática
- Padrões de comportamento

**Ver funcionalidades detalhadas em:** [MVP-SCOPE.md](../../docs/MVP-SCOPE.md)

---

## Important Constraints

### Business Model
- **Freemium:** Free (limitado) + Pro (R$ 29,90/mês)
- Conversão alvo: >5% em 30 dias
- Churn mensal: <10%

### Performance Requirements
- Marcar hábito como completo: <300ms
- Dashboards carregam: <2 segundos
- Streak calculation: 100% acuracy

### Success Metrics (MVP)
- 100+ usuários ativos em 30 dias
- Retenção D7: >40%
- Conclusão de hábitos: >60% semanalmente
- NPS: >50

**Ver métricas completas em:** [BRIEF.md - Métricas de Sucesso](../../docs/BRIEF.md)

---

## External Dependencies

### Third-party Services

| Serviço | Uso | Status |
|---------|-----|--------|
| **OpenAI API** | GPT-4 para IA com personalidades | Integrado |
| **Vercel Postgres** | Database hosted | Configurado |
| **Vercel** | Hosting da aplicação | Ativo |
| **Better Auth** | Auth social (OAuth) | Integrado |

### Environment Variables (Required)
```env
# Database
DATABASE_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

# Auth
BETTER_AUTH_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...

# AI
OPENAI_API_KEY=...

# App
NEXT_PUBLIC_APP_URL=...
```

### MCP Integration (Planned)
- Model Context Protocol para decomposição de metas
- Conexão com OpenAI Tools/Functions

---

## File Structure Reference

```
src/
├── app/
│   ├── (private)/          # Protected routes
│   │   ├── habits/
│   │   │   ├── actions/    # Server Actions (create, update, delete)
│   │   │   ├── components/ # Domain-specific components
│   │   │   ├── schemas/    # Zod schemas (habit validation)
│   │   │   └── page.tsx    # Página principal
│   │   └── dashboard/      # Dashboard page
│   ├── (public)/           # Public routes
│   │   ├── (auth)/         # Sign in / Register
│   │   ├── landing/        # Landing page
│   │   └── layout.tsx      # Public layout
│   └── api/
│       └── auth/           # Better Auth routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── landing/            # Landing page sections
│   └── layout/             # Shared layout components
├── db/
│   ├── schema/             # Drizzle schemas (one per domain)
│   └── index.ts            # DB connection
└── lib/
    ├── auth.ts             # Auth utilities
    └── safe-action.ts      # next-safe-action wrapper
```
