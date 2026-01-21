# Authentication Flow - Implementation Tasks

**Change ID:** add-auth-flow  
**Status:** Ready for Implementation  

## Summary

Implementation of authentication flow using Better Auth client methods, React Hook Form, and shadcn/ui. Tasks are ordered by dependency and priority.

**Important:** Better Auth provides built-in client methods (`authClient.signIn.email()`, `authClient.signUp.email()`, `authClient.signIn.social()`, `authClient.signOut()`). No custom Server Actions are needed for authentication.

## Phase 1: Auth Client Setup & Zod Schemas

### Task 1.1: Create Auth Client
- [ ] Create `src/lib/auth-client.ts`
  - Import `createAuthClient` from "better-auth/client"
  - Configure baseURL from environment
  - Export `authClient` for use in components
  - Export `useSession` hook for session access
- [ ] Example:
  ```ts
  import { createAuthClient } from "better-auth/client";
  
  export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
  });
  ```
- [ ] Test: authClient imports without errors

### Task 1.2: Create Client-Side Validation Schemas
- [ ] Create `src/app/(public)/(auth)/schemas/sign-in-schema.ts`
  - Email validation (format, required)
  - Password validation (required)
- [ ] Create `src/app/(public)/(auth)/schemas/sign-up-schema.ts`
  - Name validation (required, 2-100 chars)
  - Email validation (format, required)
  - Password validation (8+ chars, 1 uppercase, 1 number)
  - Confirm password (must match)
- [ ] Create `src/app/(public)/(auth)/schemas/verify-email-schema.ts`
  - Token validation (required, format)
- [ ] Validation: All schemas work with React Hook Form `zodResolver`
- [ ] Note: These are for client-side UX only. Better Auth handles server-side validation.

---

## Phase 2: React Hook Form Components

### Task 2.1: Create Sign-In Form Component
- [ ] Create `src/app/(public)/(auth)/components/sign-in-form.tsx`
  - Mark as client component: `"use client"`
  - Use React Hook Form with `zodResolver(signInSchema)`
  - Fields:
    - Email input (text, required, with validation message)
    - Password input (password type, required)
    - "Remember me" checkbox (maps to `rememberMe` option)
  - On submit: Call `authClient.signIn.email()` with callbacks:
    ```ts
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: true
    }, {
      onRequest: () => setLoading(true),
      onSuccess: () => router.push("/dashboard"),
      onError: (ctx) => setError(ctx.error.message)
    });
    ```
  - Submit button: "Entrar"
  - Loading state: Button disabled, spinner during submission (onRequest)
  - Error display: Form-level errors via shadcn/ui Alert (onError)
  - Links: "Criar conta" → /register, "Esqueceu a senha?" → /forgot-password (future)
- [ ] Styling: shadcn/ui Form, Button, Input components with Tailwind
- [ ] Test:
  - Form validates on change (client-side)
  - Submit calls authClient.signIn.email()
  - Loading state visible during submission
  - Errors from Better Auth display correctly

### Task 2.2: Create Sign-Up Form Component
- [ ] Create `src/app/(public)/(auth)/components/sign-up-form.tsx`
  - Mark as client component: `"use client"`
  - Use React Hook Form with `zodResolver(signUpSchema)`
  - Fields:
    - Name input (text, required, 2-100 chars)
    - Email input (text, required, format validation)
    - Password input (password type, required, strength indicator optional)
    - Confirm password (password type, required, match validation)
  - On submit: Call `authClient.signUp.email()` with callbacks:
    ```ts
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard"
    }, {
      onRequest: () => setLoading(true),
      onSuccess: () => router.push("/verify-email"),
      onError: (ctx) => setError(ctx.error.message)
    });
    ```
  - Submit button: "Criar Conta"
  - Error handling: Field-level (client) and form-level errors (Better Auth onError)
  - Success: Redirect to /verify-email
  - Links: "Já tem conta?" → /login
- [ ] Styling: Consistent with sign-in form
- [ ] Test:
  - Form validates all fields (client-side)
  - Password match validation works
  - Submit calls authClient.signUp.email()
  - Success redirects to /verify-email

### Task 2.3: Create OAuth Buttons Component
- [ ] Create `src/app/(public)/(auth)/components/oauth-buttons.tsx`
  - Mark as client component: `"use client"`
  - Buttons for Google and GitHub
  - On click: Call `authClient.signIn.social()`:
    ```ts
    await authClient.signIn.social({
      provider: "google", // or "github"
      callbackURL: "/dashboard",
      errorCallbackURL: "/login?error=oauth"
    });
    ```
  - Icons from lucide-react
  - Labels: "Entrar com Google", "Entrar com GitHub"
  - Used in both sign-in and sign-up pages
  - Styling: Full-width buttons, distinct colors or outlined style
  - Hover states and disabled states during loading
- [ ] Test:
  - Buttons render correctly
  - Clicking triggers OAuth redirect
  - Icons load and display

### Task 2.4: Create Verify Email Page Component
- [ ] Create `src/app/(public)/(auth)/verify-email/page.tsx`
  - Display message: "Verifique seu email"
  - Show current email address (from query or session)
  - If token in URL (?token=XXX): Auto-verify using Better Auth API
  - Success message: "Email verificado com sucesso!"
  - Error message: "Link expirado" with "Resend Email" button
  - "Resend Email" button: Can use `authClient` or server-side API
  - After verification: Auto-redirect to /dashboard
  - Loading state during verification
- [ ] Styling: Card container, centered, minimal fields
- [ ] Test:
  - Token from URL auto-verifies
  - Invalid token shows error
  - Expired token shows resend button

### Task 2.5: Create Form Error & Loading Components
- [ ] Create `src/app/(public)/(auth)/components/form-error.tsx`
  - Display error message in shadcn/ui Alert (destructive variant)
  - Only show if error present
- [ ] Create `src/app/(public)/(auth)/components/auth-submit-button.tsx`
  - Submit button with loading spinner
  - Disabled during submission
  - Shows spinner + "Carregando..." text when loading
  - Normal "Submit" text when not loading
  - Uses shadcn/ui Button

### Task 2.6: Create Sign-Out Button Component
- [ ] Create `src/components/sign-out-button.tsx`
  - Mark as client component: `"use client"`
  - On click: Call `authClient.signOut()`:
    ```ts
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login")
      }
    });
    ```
  - Styling: Can be button or menu item
- [ ] Test:
  - Session destroyed after click
  - User redirected to /login

---

## Phase 3: Better Auth Configuration

### Task 3.1: Update Better Auth Config
- [ ] Update `src/lib/auth.ts`
  - Ensure `emailAndPassword` enabled (already configured)
  - Add OAuth providers configuration:
    ```ts
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }
    }
    ```
  - Set `baseURL` from environment or localhost
  - Ensure database adapter correctly configured for pg
- [ ] Verify environment variables (Google, GitHub OAuth credentials)
- [ ] Test: Better Auth instance initializes without errors

### Task 3.2: Verify API Route Handler
- [ ] Verify `src/app/api/auth/[...all]/route.ts` exists
  - This catch-all route handles all Better Auth API endpoints
  - Handles:
    - POST `/api/auth/sign-in/email` → Email sign-in
    - POST `/api/auth/sign-up/email` → Email sign-up
    - GET `/api/auth/sign-in/social` → OAuth redirect
    - GET `/api/auth/callback/:provider` → OAuth callback
    - POST `/api/auth/sign-out` → Sign out
    - GET `/api/auth/session` → Get session
  - Session cookie automatically set by Better Auth
- [ ] Test:
  - API routes respond correctly
  - Session cookie set after sign-in

### Task 3.3: Verify Email Sending Integration
- [ ] Integrate email sending (choose provider: Resend, SendGrid, Nodemailer)
  - Better Auth needs email sending for verification
  - Configure in Better Auth options:
    ```ts
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, token }) => { /* ... */ },
      // or use Better Auth email plugin
    }
    ```
  - Email template: Verification link with token
  - Subject: "Verifique seu email - Habit Coach AI"
  - Body: Includes {APP_URL}/verify-email?token={TOKEN}
- [ ] Environment variables for email service (API key, from address)
- [ ] Test: Verification email sent and link works

---

## Phase 4: Routes & Layouts

### Task 4.1: Create Auth Layout
- [ ] Create `src/app/(public)/(auth)/layout.tsx`
  - Centered card container for forms
  - Logo/branding at top
  - Form content in center
  - Background styling consistent with design system
  - Responsive (mobile-first with Tailwind)
- [ ] Styling: Consistent with landing page design

### Task 4.2: Create Sign-In Page
- [ ] Create `src/app/(public)/(auth)/login/page.tsx`
  - Page title: "Entrar"
  - Import and render `<SignInForm />`
  - Import and render `<OAuthButtons />`
  - Links to sign-up and forgot password (future)
  - Metadata for SEO: title, description
- [ ] Test: Page renders forms correctly

### Task 4.3: Create Sign-Up Page
- [ ] Create `src/app/(public)/(auth)/register/page.tsx`
  - Page title: "Criar Conta"
  - Import and render `<SignUpForm />`
  - Import and render `<OAuthButtons />`
  - Link to sign-in page
  - Metadata for SEO
- [ ] Test: Page renders forms correctly

### Task 4.4: Create Verify Email Page
- [ ] See Task 2.4 (verify-email page component)
  - Render verify email form
  - Handle query params (?token=...)
  - Show status messages

---

## Phase 5: Middleware & Route Protection

### Task 5.1: Create Authentication Middleware
- [ ] Create `src/middleware.ts` (or update if exists)
  - Validate session on all protected routes: `/dashboard/*`, `/habits/*`, `/goals/*`
  - Check for valid session cookie
  - If valid: Extract user data and continue request
  - If invalid or expired: Redirect to `/login?next={original-path}`
  - Public routes (no protection needed):
    - `/` (home)
    - `/login`, `/register`, `/verify-email`
    - `/api/auth/*`
    - `/pricing`
  - Authenticated users visiting auth pages:
    - Redirect to `/dashboard` (prevent login page after already logged in)
- [ ] Use Better Auth's session verification method
- [ ] Store user info in request headers for use in pages/components
- [ ] Performance: Use `NextRequest` matcher to exclude static assets
- [ ] Test:
  - Unauthenticated user accessing /dashboard redirects to /login
  - Authenticated user can access /dashboard
  - Authenticated user accessing /login redirects to /dashboard
  - Next param preserved: /login?next=/dashboard/goals redirects to /goals after login

### Task 5.2: Create Layout for Protected Routes
- [ ] Create `src/app/(private)/layout.tsx`
  - This layout wraps protected routes
  - Get session server-side using `auth.api.getSession({ headers })`
  - Include header/nav with user profile and sign-out button
  - Sign-out button uses `<SignOutButton />` component (client-side)
  - Show user name/email in header
- [ ] Sign-out button styling: Secondary button or menu item

### Task 5.3: Create Dashboard Redirect
- [ ] Create `src/app/(private)/dashboard/page.tsx` (or update if exists)
  - Initial protected page after login
  - Show welcome message: "Bem-vindo, {name}!"
  - Link to habits, goals, AI coach sections
  - This is the entry point for authenticated users
- [ ] Test: Only accessible when logged in

---

## Phase 6: Environment Variables & Configuration

### Task 6.1: Document Environment Variables
- [ ] Update `.env.example` or create `.env.local.example`
  - `DATABASE_URL` - PostgreSQL connection string
  - `BETTER_AUTH_SECRET` - Secret key for session signing
  - `BETTER_AUTH_URL` - Application URL for OAuth callbacks
  - `GOOGLE_CLIENT_ID` - Google OAuth application ID
  - `GOOGLE_CLIENT_SECRET` - Google OAuth secret
  - `GITHUB_CLIENT_ID` - GitHub OAuth application ID
  - `GITHUB_CLIENT_SECRET` - GitHub OAuth secret
  - `NEXT_PUBLIC_APP_URL` - Public app URL (used in emails, client-side)
  - `EMAIL_SERVICE_API_KEY` - Resend/SendGrid API key (if using)
  - `EMAIL_FROM_ADDRESS` - Email sender address
- [ ] Add `.env.local` to `.gitignore` (if not already)

### Task 6.2: Setup OAuth Providers
- [ ] Google:
  - Create Google OAuth 2.0 credentials at Google Cloud Console
  - Set authorized redirect URI: `{BETTER_AUTH_URL}/api/auth/callback/google`
  - Note: `BETTER_AUTH_URL` should be the deployment URL
  - Copy Client ID and Secret to `.env.local`
- [ ] GitHub:
  - Create OAuth App in GitHub Settings
  - Set Authorization callback URL: `{BETTER_AUTH_URL}/api/auth/callback/github`
  - Copy Client ID and Secret to `.env.local`
- [ ] Documentation: Add instructions to README or docs for developers

---

## Phase 7: Testing & Validation

### Task 7.1: Unit Tests for Schemas
- [ ] Test sign-in schema validation:
  - Valid email and password pass
  - Missing fields fail
  - Invalid email format fails
- [ ] Test sign-up schema validation:
  - Valid all fields pass
  - Passwords don't match fail
  - Weak password fails
  - Name length validation
- [ ] Test verify-email schema:
  - Valid token passes
  - Empty token fails

### Task 7.2: Integration Tests for Auth Client Methods
- [ ] Test signUp.email():
  - Valid signup creates user with emailVerified=false
  - Duplicate email returns error via onError callback
  - onSuccess callback receives user data
- [ ] Test signIn.email():
  - Valid credentials create session
  - Invalid password triggers onError callback
  - Unverified user behavior (depends on config)
- [ ] Test signIn.social():
  - Triggers OAuth redirect
  - callbackURL correctly set
- [ ] Test signOut():
  - Session destroyed
  - fetchOptions.onSuccess callback triggered

### Task 7.3: E2E Tests for Complete Flows
- [ ] Sign-up flow:
  - Navigate to /register
  - Fill form with valid data
  - Submit and verify email sent
  - Click verification link
  - Verify email and redirected to /dashboard
- [ ] Sign-in flow:
  - Navigate to /login
  - Enter credentials
  - Redirected to /dashboard
  - Can access protected routes
- [ ] OAuth flow:
  - Click Google sign-in
  - Authorize and get redirected
  - User account created
  - Dashboard accessible
- [ ] Protected route:
  - Unauthenticated user trying to access /dashboard
  - Redirected to /login
  - After sign-in, can access original route
- [ ] Sign-out flow:
  - Click sign-out
  - Redirected to /login
  - Cannot access protected routes

### Task 7.4: Manual Testing Checklist
- [ ] Form validation messages display correctly
- [ ] Loading states visible (spinner, disabled button)
- [ ] Error messages in Portuguese and clear
- [ ] Success redirects work (after signup, signin, verify)
- [ ] Links between pages work (/login ↔ /register)
- [ ] OAuth buttons clickable and redirect correctly
- [ ] Session persists across page reloads
- [ ] Middleware redirects work
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (keyboard navigation, screen readers - future audit)

---

## Phase 8: Documentation

### Task 8.1: Document Auth API
- [ ] Add API documentation to `docs/auth.md`:
  - Better Auth client methods (signUp.email, signIn.email, signIn.social, signOut)
  - Expected inputs and callbacks (onRequest, onSuccess, onError)
  - Error handling patterns
  - Usage examples from components

### Task 8.2: Document OAuth Setup
- [ ] Add OAuth setup instructions to `docs/oauth-setup.md`:
  - Steps to create Google OAuth app
  - Steps to create GitHub OAuth app
  - Environment variables needed
  - Testing OAuth locally (if applicable)

### Task 8.3: Update README
- [ ] Add authentication section to README:
  - How to set up auth for local development
  - Required environment variables
  - Testing the auth flow

---

## Summary of Deliverables

✅ Auth client setup (`src/lib/auth-client.ts`)  
✅ Zod schemas for client-side validation (sign-in, sign-up, verify-email)  
✅ React Hook Form components with Better Auth client methods  
✅ OAuth buttons component (using `authClient.signIn.social()`)  
✅ Verify email page  
✅ Sign-out button component  
✅ Better Auth configuration with OAuth providers  
✅ API route handler (catch-all route)  
✅ Authentication middleware  
✅ Protected routes layout  
✅ Dashboard page (entry point)  
✅ Environment variable documentation  
✅ OAuth provider setup guide  
✅ Tests (unit, integration, E2E)  
✅ Documentation updates  

## Dependency Graph

```
Phase 1 (Auth Client & Schemas)
  ↓
Phase 2 (Components) - Depends on 1
  ↓
Phase 3 (Better Auth Config) - Can run parallel to 2
  ↓
Phase 4 (Routes) - Depends on 2
  ↓
Phase 5 (Middleware) - Depends on 3, 4
  ↓
Phase 6 (Environment) - Can run parallel
  ↓
Phase 7 (Testing) - Depends on all
  ↓
Phase 8 (Documentation)
```

## Approval & Rollout

**Before Implementation:**
- [ ] Proposal reviewed and approved by tech lead
- [ ] Design decisions agreed upon
- [ ] OAuth credentials created (Google, GitHub)

**After Implementation:**
- [ ] All tests passing
- [ ] Code review completed
- [ ] Deployed to staging environment
- [ ] Manual testing verified
- [ ] Deployed to production
- [ ] Monitor error rates and user signups
