# Add Authentication Flow Proposal

**Change ID:** add-auth-flow  
**Status:** Pending Review  
**Priority:** Critical (MVP Blocker)

## Summary

Implement a complete authentication flow using Better Auth with email+password and OAuth (Google/GitHub), integrated with shadcn/ui components and React Hook Form. This includes login/register pages, email verification, session management, and protected routes middleware.

## Problem Statement

- Better Auth is configured in `src/lib/auth.ts` but no public-facing authentication UI exists
- Users cannot sign up, log in, or manage their sessions
- No protected routes or session middleware implemented
- MVP cannot proceed without user authentication

## Solution Overview

Create a comprehensive authentication system with:
1. **Sign-up & Login Forms** - Built with React Hook Form + shadcn/ui Button, Input, Card, Alert components
2. **OAuth Integration** - Google and GitHub sign-in buttons
3. **Email Verification** - Verification flow with token-based confirmation
4. **Protected Routes** - Middleware to enforce authentication on dashboard routes
5. **Session Management** - Client-side session handling with Better Auth `useSession` hook
6. **Form Validation** - Zod schemas for client-side validation (Better Auth handles server-side)

## Scope

### Included
- Email+password authentication (sign-up, login)
- OAuth providers (Google, GitHub)
- Email verification flow
- Sign-out functionality
- Protected routes via middleware
- Error handling and user feedback
- TypeScript types for all auth operations

### Out of Scope (Future)
- Magic links (first iteration uses email+password)
- Two-factor authentication (2FA)
- Password reset flow
- Account linking (OAuth + email)
- Session invalidation per device

## Architecture Decisions

See `design.md` for:
- Better Auth client methods vs Server Actions (using client methods)
- Middleware placement for route protection
- Form validation and error messaging strategy
- Component reusability across sign-up and login

## Affected Capabilities

- **Authentication** - New capability for user sign-in/sign-up flows
- **Session Management** - Integration with Better Auth sessions
- **Authorization** - Middleware-based route protection

## Tasks

See `tasks.md` for implementation checklist with validation steps.

## Specs

See `specs/authentication/spec.md` for detailed requirements and scenarios.

## Acceptance Criteria

- [ ] Users can sign up with email and password
- [ ] Users can log in with existing credentials
- [ ] Users can sign in with Google and GitHub
- [ ] Email verification required before access to dashboard
- [ ] Unverified users redirected to verification page
- [ ] Authenticated users cannot access login/signup pages
- [ ] Dashboard routes protected via middleware
- [ ] Users can sign out and return to login page
- [ ] Form validation shows clear error messages
- [ ] All auth operations properly typed with TypeScript
