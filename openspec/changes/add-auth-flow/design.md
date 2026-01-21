# Authentication Flow - Design Document

## Architecture Overview

```
src/lib/auth.ts (Better Auth config)
    ↓
src/app/(public)/(auth)/
    ├── login/page.tsx
    ├── register/page.tsx
         ↓
    components/
        ├── login-form.tsx (shadcn/ui + React Hook Form)
        ├── register-form.tsx (shadcn/ui + React Hook Form)
        ├── oauth-buttons.tsx (shadcn/ui)
    ↓
src/middleware.ts (session check)
    ↓
src/app/(private)/* (protected)
```

## Design Decisions

### 1. Better Auth Client vs Server Actions

**Decision:** Use Better Auth Client methods directly (no Server Actions needed)  
**Rationale:**
- Better Auth provides complete client-side methods (`authClient.signIn.email()`, `authClient.signUp.email()`, etc.)
- Built-in callbacks for loading, success, and error states (`onRequest`, `onSuccess`, `onError`)
- Automatic session management and cookie handling
- Reduces unnecessary abstraction layer
- Type-safe with TypeScript support

**Important:** Client methods must be called from client-side components only. Never call them from server components or server actions.

**API Routes:**
- Better Auth catch-all route handles all auth endpoints
- Located at `src/app/api/auth/[...all]/route.ts`
- Handles OAuth callbacks, session management, and all auth API calls

### 2. Form Validation & Components

**Decision:** React Hook Form + Zod schemas + shadcn/ui Field components  
**Rationale:**
- Lightweight form state management with React Hook Form
- Client-side validation for UX (before submitting to Better Auth)
- Better Auth handles server-side validation internally
- Schema reusability for client validation
- shadcn/ui `<Field>` components for accessibility (data-invalid, aria-invalid)
- `<Controller>` pattern for controlled inputs

**Schema Structure:**
```
src/app/(public)/(auth)/schemas/
├── sign-in-schema.ts       // email, password
├── sign-up-schema.ts       // name, email, password, confirmPassword
```

**Form Component Pattern (shadcn/ui):**
```tsx
"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
```

**Key Components:**
- `<Field>` wrapper with `data-invalid` prop for styling
- `<FieldLabel>` for accessible labels
- `<FieldError>` for inline error messages
- `aria-invalid` on input for screen readers
- `<FieldDescription>` for helper text (optional)

**Note:** These schemas are for client-side UX validation only. Better Auth performs its own server-side validation.

### 3. Component Reusability

**Decision:** Separate forms for Sign-In and Sign-Up  
**Rationale:**
- Different field requirements (name only in signup)
- Different validation rules (password confirmation in signup)
- Different success redirects
- Clearer component responsibilities

**Shared Components:**
- `oauth-buttons.tsx` - Used in both sign-in and sign-up pages
- `form-error.tsx` - Error message display (shadcn/ui Alert)
- `submit-button.tsx` - Loading state indicator

### 4. Session Management

**Decision:** Server-side sessions via Better Auth  
**Rationale:**
- Session stored in database (user table has built-in session support)
- Session token in httpOnly cookie (secure by default)
- Server middleware validates on protected routes

**Session Validation:**
- Middleware checks request for valid session
- Returns user data or redirects to login
- Uses Better Auth's built-in session API


### 6. Protected Routes Strategy

**Decision:** Middleware + Layout-level redirects  
**Rationale:**
- Middleware intercepts all requests to /dashboard/* routes
- Checks for valid session
- Allows public routes to be accessed without middleware
- Layout components can conditionally render based on session

**Implementation:**
```
middleware.ts
├── Allow: /login, /register, /api/auth
├── Protect: /dashboard/*, /habits/*, /goals/*
└── Redirect unauthenticated to /login
```

### 7. OAuth Implementation

**Decision:** Better Auth built-in OAuth with environment variables  
**Rationale:**
- Better Auth handles OAuth token exchange
- Automatic user creation on first OAuth sign-in
- Account linking if same email exists
- Reduces custom OAuth logic

**Providers (MVP):**
- Google OAuth 2.0
- GitHub OAuth 2.0

**Setup:**
```ts
// src/lib/auth.ts
oauth: {
  providers: [
    {
      id: "google",
      name: "Google"
    },
    {
      id: "github",
      name: "GitHub"
    }
  ]
}
```

### 8. Error Handling

**Decision:** Structured error responses from Server Actions  
**Rationale:**
- next-safe-action provides error handling wrapper
- Validation errors caught before database operations
- User-friendly messages in Portuguese (pt-BR)
- Server logs for debugging

**Error Types:**
```
ValidationError → Form field errors
DatabaseError → User already exists, DB connection issues
OAuthError → OAuth provider errors
SessionError → Invalid/expired tokens
```

### 9. UI Component Library

**Decision:** shadcn/ui components with Tailwind  
**Rationale:**
- Consistent with project design system
- Accessible Radix UI primitives
- Customizable via Tailwind
- Components: Button, Input, Card, Form, Alert

**Form Layout:**
- Card container for form
- Sections for email/password, OAuth buttons
- Alert for errors and success messages
- Submit button with loading state

## Data Flow

### Sign-Up Flow
```
1. User fills form (name, email, password, confirm password)
2. React Hook Form validates client-side
3. Submit → authClient.signUp.email() (client-side)
4. Better Auth validates and creates user + verification token
5. Better Auth sends verification email (if configured)
6. onSuccess callback: Redirect to dashboard page
7. User clicks email link with token
8. Better Auth API verifies token
9. emailVerified set to true
10. User redirected to dashboard
```

### Sign-In Flow
```
1. User enters credentials (email, password)
2. React Hook Form validates client-side
3. Submit → authClient.signIn.email() (client-side)
4. Better Auth validates credentials
5. Session created + session token stored in httpOnly cookie
6. onSuccess callback: Redirect to /dashboard
7. Middleware validates session cookie
8. User can access protected routes
```

### OAuth Sign-In Flow
```
1. User clicks "Sign in with Google/GitHub"
2. authClient.signIn.social({ provider: "google" }) called
3. Redirects to OAuth provider
4. User authorizes on provider (Google/GitHub)
5. Provider redirects to callback: /api/auth/callback/google
6. Better Auth exchanges token, creates/finds user
7. Session created, cookie set
8. Redirects to callbackURL (default: /dashboard)
```

### Sign-Out Flow
```
1. User clicks "Sign Out"
2. authClient.signOut() called (client-side)
3. Better Auth destroys session
4. Session cookie cleared
5. onSuccess callback: Redirect to /login
```

## Security Considerations

1. **Password Security**
   - Passwords hashed by Better Auth (bcrypt by default)
   - Never stored in plain text
   - Minimum entropy requirements enforced by Zod

2. **Session Security**
   - httpOnly cookies prevent XSS access
   - Secure flag in production (HTTPS only)
   - SameSite=Strict prevents CSRF
   - Expiry time enforced (configurable, default ~24h)

3. **CSRF Protection**
   - Better Auth handles CSRF protection internally
   - No manual CSRF middleware needed

4. **Email Verification**
   - Tokens are cryptographically secure (Better Auth generates)
   - Tokens expire after X minutes (configurable)
   - One-time use (verified→true updates user)

5. **OAuth Security**
   - State parameter validated (Better Auth handles)
   - Redirect URIs whitelist verified
   - Client secret never exposed to client

6. **Rate Limiting**
   - Out of scope for MVP
   - Future: Implement per-IP rate limiting for login/signup

## Testing Strategy

### Unit Tests
- Zod schema validation (sign-up, login schemas)
- Error message formatting
- Password strength validation

### Integration Tests
- Better Auth client methods (signUp.email, signIn.email, signOut)
- OAuth flow with mocked providers
- Session management (useSession, getSession)

### E2E Tests
- Complete sign-up flow (form → email → verification)
- Complete sign-in flow (login → redirect → dashboard access)
- Protected route access (unauthenticated → redirect)
- OAuth sign-in (button → provider → session)
- Sign-out flow (button → session destroyed → redirect)

## Migration & Rollout

**Phase 1:** Deploy auth infrastructure (no user impact)
- Database migrations for auth schema (already exists)
- Better Auth configuration and API routes
- Middleware setup

**Phase 2:** Gradual feature release
- Launch login/register pages (public access)
- Collect feedback from early adopters
- Monitor error rates and session duration

**Phase 3:** Enforce authentication
- Require email verification for new users
- Redirect unauthenticated users from dashboard
- Deprecate public dashboard access

## Future Enhancements

1. **Magic Links** - Email link sign-in without password
2. **Password Reset** - Forgot password flow
3. **2FA** - Two-factor authentication
4. **Account Linking** - Link multiple OAuth providers to one account
5. **Session Management Dashboard** - View/revoke active sessions
6. **Social Sign-Up** - Pre-fill name from OAuth profile
