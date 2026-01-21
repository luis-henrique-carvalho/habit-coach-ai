# Authentication Flow - Implementation Tasks

**Change ID:** add-auth-flow  
**Status:** In Progress - Core Implementation Complete  

## Summary

Implementation of authentication flow using Better Auth client methods, React Hook Form, and shadcn/ui. Tasks are ordered by dependency and priority.

**Important:** Better Auth provides built-in client methods (`authClient.signIn.email()`, `authClient.signUp.email()`, `authClient.signIn.social()`, `authClient.signOut()`). No custom Server Actions are needed for authentication.

## Phase 1: Auth Client Setup & Zod Schemas

### Task 1.1: Create Auth Client
- [x] Create `src/lib/auth-client.ts`
  - Import `createAuthClient` from "better-auth/client"
  - Configure baseURL from environment
  - Export `authClient` for use in components
  - Export `useSession` hook for session access
- [x] Example:
  ```ts
  import { createAuthClient } from "better-auth/client";
  
  export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
  });
  ```
- [x] Test: authClient imports without errors


---

## Phase 2: React Hook Form Components

### Task 2.1: Create Sign-In Form Component
- [x] Create `src/app/(public)/(auth)/components/sign-in-form.tsx`
  - Mark as client component: `"use client"`
  - Imports:
    ```ts
    import { Controller, useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { Field, FieldLabel, FieldError } from "@/components/ui/field";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Alert } from "@/components/ui/alert";
    import { signInSchema } from "../schemas/sign-in-schema";
    ```
  - Setup form with React Hook Form:
    ```ts
    const form = useForm({
      resolver: zodResolver(signInSchema),
      defaultValues: { email: "", password: "" },
      mode: "onBlur", // Validate on blur for better UX
    });
    ```
  - Email field using Controller + Field pattern:
    ```tsx
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
            placeholder="seu@email.com"
            autoComplete="email"
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
    ```
  - Password field: Similar pattern to email
  - Form-level error: Display via shadcn/ui Alert on `formError` state
  - Submit button: "Entrar" with loading state
  - Loading state: Disable button, show spinner during `isSubmitting`
  - Links: "Criar conta?" → /register, "Esqueceu a senha?" → /forgot-password (future)
  - On submit handler:
    ```ts
    async function onSubmit(data: SignInFormData) {
      try {
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        }, {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push("/dashboard"),
          onError: (ctx) => setFormError(ctx.error.message),
        });
      } catch (error) {
        setFormError("Erro ao conectar. Tente novamente.");
      }
    }
    ```
- [ ] Styling: 
  - Use shadcn/ui components with Tailwind classes
  - Card or container for form layout
  - Spacing with gap utilities
  - Responsive (mobile-first)
- [ ] Test:
  - Form validates on blur
  - Submit calls authClient.signIn.email()
  - Loading state visible during submission
  - Errors display in Alert and inline fields

### Task 2.2: Create Sign-Up Form Component
- [x] Create `src/app/(public)/(auth)/components/sign-up-form.tsx`
  - Mark as client component: `"use client"`
  - Imports: Same as sign-in + `signUpSchema`
  - Setup form with React Hook Form:
    ```ts
    const form = useForm({
      resolver: zodResolver(signUpSchema),
      defaultValues: { 
        name: "", 
        email: "", 
        password: "", 
        confirmPassword: "" 
      },
      mode: "onBlur",
    });
    ```
  - Fields (using Controller + Field pattern for each):
    - Name input (text, required)
    - Email input (type="email", required)
    - Password input (type="password", strength indicator optional)
    - Confirm password (type="password", required)
  - Each field should follow this pattern:
    ```tsx
    <Controller
      name="fieldName"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Label</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            // other props
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
    ```
  - Form-level error: Display via shadcn/ui Alert
  - Submit button: "Criar Conta"
  - On submit handler:
    ```ts
    async function onSubmit(data: SignUpFormData) {
      try {
        await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        }, {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push("/dashboard"),
          onError: (ctx) => setFormError(ctx.error.message),
        });
      } catch (error) {
        setFormError("Erro ao criar conta. Tente novamente.");
      }
    }
    ```
  - Submit button: "Criar Conta"
  - Styling: Consistent with sign-in form
  - Link: "Já tem conta?" → /login
- [ ] Test:
  - Form validates all fields on blur
  - Password match validation works
  - Submit calls authClient.signUp.email()
  - Success redirects to /dashboard
  - Form-level and field-level errors display correctly

### Task 2.3: Create OAuth Buttons Component
- [x] Create `src/app/(public)/(auth)/components/oauth-buttons.tsx`
  - Mark as client component: `"use client"`
  - Imports:
    ```ts
    import { Button } from "@/components/ui/button";
    import { authClient } from "@/lib/auth-client";
    ```
  - Create buttons for Google and GitHub:
    ```tsx
    async function handleOAuthSignIn(provider: "google" | "github") {
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      } catch (error) {
        setError(`Erro ao conectar com ${provider}`);
      }
    }

    return (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("google")}
          disabled={isLoading}
          className="w-full"
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Entrar com Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthSignIn("github")}
          disabled={isLoading}
          className="w-full"
        >
          <GitHubIcon className="mr-2 h-4 w-4" />
          Entrar com GitHub
        </Button>
      </>
    );
    ```
  - Icons from lucide-react
  - Used in both sign-in and sign-up pages
  - Styling: Full-width buttons, consistent with form buttons
  - Loading state: Disable buttons during OAuth redirect
- [ ] Test:
  - Buttons render correctly
  - Clicking triggers OAuth flow
  - Icons display properly


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
- [x] Create `src/components/sign-out-button.tsx`
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
- [x] Update `src/lib/auth.ts`
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


---

## Phase 4: Routes & Layouts

### Task 4.1: Create Auth Layout
- [x] Create `src/app/(public)/(auth)/layout.tsx`
  - Centered card container for forms
  - Logo/branding at top
  - Form content in center
  - Background styling consistent with design system
  - Responsive (mobile-first with Tailwind)
- [ ] Styling: Consistent with landing page design

### Task 4.2: Create Sign-In Page
- [x] Create `src/app/(public)/(auth)/login/page.tsx`
  - Page title: "Entrar"
  - Import and render `<SignInForm />`
  - Import and render `<OAuthButtons />`
  - Links to sign-up and forgot password (future)
  - Metadata for SEO: title, description
- [ ] Test: Page renders forms correctly

### Task 4.3: Create Sign-Up Page
- [x] Create `src/app/(public)/(auth)/register/page.tsx`
  - Page title: "Criar Conta"
  - Import and render `<SignUpForm />`
  - Import and render `<OAuthButtons />`
  - Link to sign-in page
  - Metadata for SEO
- [ ] Test: Page renders forms correctly


---

## Phase 5: Middleware & Route Protection

### Task 5.1: Create Authentication Middleware
- [x] Create `src/middleware.ts` (or update if exists)
  - Validate session on all protected routes: `/dashboard/*`, `/habits/*`, `/goals/*`
  - Check for valid session cookie
  - If valid: Extract user data and continue request
  - If invalid or expired: Redirect to `/login?next={original-path}`
  - Public routes (no protection needed):
    - `/` (home)
    - `/login`, `/register`
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
- [x] Create `src/app/(private)/layout.tsx`
  - This layout wraps protected routes
  - Get session server-side using `auth.api.getSession({ headers })`
  - Include header/nav with user profile and sign-out button
  - Sign-out button uses `<SignOutButton />` component (client-side)
  - Show user name/email in header
- [ ] Sign-out button styling: Secondary button or menu item

### Task 5.3: Create Dashboard Redirect
- [x] Create `src/app/(private)/dashboard/page.tsx` (or update if exists)
  - Initial protected page after login
  - Show welcome message: "Bem-vindo, {name}!"
  - Link to habits, goals, AI coach sections
  - This is the entry point for authenticated users
- [ ] Test: Only accessible when logged in

---

## Phase 6: Environment Variables & Configuration

### Task 6.1: Document Environment Variables
- [x] Update `.env.example` or create `.env.local.example`
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
- [x] Add API documentation to `docs/auth.md`:
  - Better Auth client methods (signUp.email, signIn.email, signIn.social, signOut)
  - Expected inputs and callbacks (onRequest, onSuccess, onError)
  - Error handling patterns
  - Usage examples from components

### Task 8.2: Document OAuth Setup
- [x] Add OAuth setup instructions to `docs/oauth-setup.md`:
  - Steps to create Google OAuth app
  - Steps to create GitHub OAuth app
  - Environment variables needed
  - Testing OAuth locally (if applicable)

### Task 8.3: Update README
- [x] Add authentication section to README:
  - How to set up auth for local development
  - Required environment variables
  - Testing the auth flow

---

## Summary of Deliverables

✅ Auth client setup (`src/lib/auth-client.ts`)  
✅ Zod schemas for client-side validation (sign-in, sign-up)  
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
