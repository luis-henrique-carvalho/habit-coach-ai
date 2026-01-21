# OpenSpec - Habit Coach AI

Welcome to the OpenSpec specifications for **Habit Coach AI**. This directory contains comprehensive technical and product specifications using the OpenSpec framework.

## 📋 Structure

```
openspec/
├── AGENTS.md              # Instructions for AI assistants
├── project.md             # Project context & conventions
├── specs/                 # Detailed specifications
│   ├── tech-stack.md      # Technology choices & architecture
│   ├── authentication.md  # Auth patterns & security
│   ├── ai-integration.md  # OpenAI & personality system
│   ├── database-schema.md # PostgreSQL schema with Drizzle
│   └── features-habits.md # Habits feature (MVP core)
├── changes/               # Change proposals & tracking
│   └── archive/           # Old/completed changes
└── README.md              # This file
```

## 🚀 Quick Start for Developers

1. **Read `project.md`** first - understand the full project context
2. **Read the relevant spec** based on what you're building:
   - Working on auth? → `specs/authentication.md`
   - Building habits feature? → `specs/features-habits.md`
   - Integrating AI? → `specs/ai-integration.md`
   - Database schema? → `specs/database-schema.md`
   - Tech setup? → `specs/tech-stack.md`

3. **Check `AGENTS.md`** for how to propose changes and create specs

## 📚 Related Documentation

**Product Documentation** (`@/docs/`):
- `BRIEF.md` - Business case, problem, solution
- `PRD.md` - Full product requirements with personas
- `MVP-SCOPE.md` - MVP features & constraints
- `DESIGN-GUIDELINES.md` - Visual design system
- `LANDING-PAGE-SPEC.md` - Landing page structure

## 🔍 Current Specifications

### Tech Stack (`specs/tech-stack.md`)
- **Framework:** Next.js 16 (App Router, Server Actions)
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** Better Auth
- **Frontend:** React 19 + shadcn/ui + Tailwind
- **AI:** OpenAI GPT-4 + MCP for decomposition
- **Hosting:** Vercel

### Authentication (`specs/authentication.md`)
- Email + Password signup/login
- OAuth (Google, GitHub)
- Session management with httpOnly cookies
- Role-based limits (Free vs Pro)
- Data isolation by userId

### AI Integration (`specs/ai-integration.md`)
- **3 Personalities:**
  - Mestre Yoda (sábio, inverte frases)
  - General Motivador (direto, intenso)
  - Mentor Empático (gentil, compreensivo)
- **Triggers:** Habit complete, streaks, goal completion, weekly analysis
- **MCP:** Automatic goal decomposition into subtasks
- **Rate Limits:** Free users 5 messages/day, Pro unlimited

### Database Schema (`specs/database-schema.md`)
- **Core Tables:** users, sessions, habits, goals, completions, subtasks
- **AI:** aiMessages, chatConversations, chatMessages
- **Analytics:** analyticsEvents for tracking
- **Relations:** Drizzle relations configured for type-safety
- **Indexes:** Performance-optimized for common queries

### Habits Feature (`specs/features-habits.md`)
- Create, edit, archive habits
- Mark complete (today or up to 7 days back)
- Streak tracking (current & longest)
- Frequency: daily, specific days, X times/week
- Reminders via Web Push
- Visual heatmap (90-day calendar)
- Completion rates & analytics
- AI motivational messages on complete

## 🛠️ Making Changes

### Process
1. **Understand the need:** What are you changing and why?
2. **Check existing specs:** Is it already documented?
3. **Create proposal:**
   ```bash
   # Use `openspec` CLI (future)
   openspec spec create --id add-2fa --title "Add 2FA Support"
   ```
4. **Write spec delta** with `## ADDED|MODIFIED|REMOVED` sections
5. **Run validation:**
   ```bash
   openspec validate add-2fa --strict
   ```
6. **Get approval** before implementation

### Types of Changes
- ✅ **Proposal needed:** Features, breaking changes, architecture shifts
- ❌ **No proposal:** Bug fixes, typos, config changes, non-breaking deps

See `AGENTS.md` for detailed workflow.

## 💡 Key Design Principles

### Type Safety
- End-to-end TypeScript
- Drizzle ORM with inferred types
- Zod validation on all inputs
- Never expose raw data types

### Server-First Architecture
- Server Actions for all mutations
- Server Components by default
- API keys never reach client
- next-safe-action for type-safe RPC

### User Privacy & Security
- Data isolation by userId in all queries
- Soft deletes for GDPR/LGPD compliance
- Passwords hashed with bcrypt
- CSRF protection automatic

### Performance
- Indexed queries for user data
- Cached stats/streaks (1 hour TTL)
- Optimistic UI updates
- Edge Functions for AI ops (future)

### Accessibility
- shadcn/ui components (WCAG compliant)
- Semantic HTML throughout
- Keyboard navigation supported
- Color contrast compliance

## 📊 Feature Matrix (MVP vs Future)

| Feature | MVP | Future |
|---------|-----|--------|
| Habits tracking | ✅ | ✅ |
| Goals + subtasks | ✅ | ✅ |
| AI personalities | ✅ | ✅ (more) |
| Web Push notifications | ✅ | ✅ |
| 3-habit free limit | ✅ | ✅ |
| Auth (email + OAuth) | ✅ | ✅ |
| **Gamification** | ❌ | ✅ |
| **WhatsApp/SMS** | ❌ | ✅ |
| **2FA/MFA** | ❌ | ✅ |
| **Social features** | ❌ | ✅ |
| **ML predictions** | ❌ | ✅ |

## 🔗 Cross-References

**Planning new work?** Link back to relevant specs:
```markdown
# My New Feature Spec

**Related Specs:**
- @/openspec/specs/tech-stack.md (hosting implications)
- @/openspec/specs/database-schema.md (new tables)
- @/docs/PRD.md (product requirements)
```

**Making changes?** Update the changelog:
- Document in `changes/[change-id]/proposal.md`
- Link to modified specs
- Include before/after examples

## 📖 Conventions

### Naming
- Specs: `kebab-case` with scope prefix
  - `tech-stack.md` (global)
  - `features-habits.md` (feature-specific)
  - `auth-oauth.md` (sub-system)
- Changes: `verb-noun` format
  - `add-2fa`, `update-auth-flow`, `refactor-db-queries`

### Documentation Style
- Markdown with clear headings
- Code examples in TypeScript
- Links to related docs with `@/path`
- Include both "what" and "why"

### References
- **Product docs:** `@/docs/FILE.md`
- **OpenSpec specs:** `@/openspec/specs/FILE.md`
- **OpenSpec project:** `@/openspec/project.md`

## ❓ FAQ

**Q: Should I create a change proposal?**
A: Yes if you're adding features, changing API, or refactoring architecture. No for bug fixes or small tweaks.

**Q: Can I modify an existing spec?**
A: Yes, update directly. Document in a change proposal if it's a significant modification.

**Q: How detailed should specs be?**
A: Include enough detail that a developer can implement without asking questions. User stories, API contracts, database schema, tests.

**Q: What about API versioning?**
A: We're pre-v1 (MVP). No versioning yet. Once in production, use change proposals for backward-incompatible changes.

## 🚨 Critical Decisions

### Stack Choices
- **Why Next.js 16?** Latest stable, native Server Actions, best DX
- **Why Drizzle?** Type-safety, lightweight, migrations as code
- **Why Better Auth?** Secure defaults, no vendor lock-in
- **Why PostgreSQL?** Mature, ACID, JSON support, cost-effective

See `specs/tech-stack.md` for full rationale.

### MVP Scope
- **Focus:** Habits + Goals + AI personalities
- **Out:** Gamification, social, WhatsApp, 2FA
- **Reasoning:** Validate core value prop first

See `@/docs/MVP-SCOPE.md` for full constraints.

## 📞 Support

- **Questions about specs?** Check `AGENTS.md` or the specific spec file
- **Found a gap?** Create a change proposal
- **Bug in implementation?** Fix it and reference the spec
- **Spec is outdated?** Update it and document the change

---

**Last Updated:** January 21, 2025
**Next Review:** When major features are added or architecture changes

**Quick Links:**
- [Project Context](./project.md)
- [Agent Instructions](./AGENTS.md)
- [All Specs](./specs/)
- [Product Docs](../docs/)
