# Authentication Flow - Requirements Specification

## Capability: Authentication

**ID:** auth  
**Status:** New  
**Priority:** Critical  
**Version:** 1.0

## Overview

The Authentication capability enables users to create accounts and securely sign into the Habit Coach AI platform using email+password and social login (OAuth). It provides session management, email verification, and protected route access.

## ADDED Requirements

### R1: Email and Password Registration

Users can create a new account with email, password, and name.

#### Requirement Details
- Form must validate:
  - Email format (RFC 5322 compatible)
  - Email uniqueness (not already registered)
  - Password strength (min 8 chars, at least 1 uppercase, 1 number)
  - Password confirmation matches
  - Name is provided and non-empty
- On success: Create user, generate verification token, send verification email
- On error: Display field-specific validation errors
- After successful registration: Redirect to verification page

#### Scenario: User Successfully Registers
```
Given: User is on /register page
When: User fills form with name="João", email="joao@example.com", password="SecurePass123"
Then: authClient.signUp.email() is called
And: Better Auth creates user with emailVerified=false
And: Verification token is generated and stored
And: Email sent to joao@example.com with verification link
And: onSuccess callback redirects to /verify-email?step=check-email
```

#### Scenario: Validation Error - Email Already Exists
```
Given: User with email "exist@example.com" already exists
When: New user tries to register with same email
Then: Form shows error "Email já cadastrado"
And: User remains on /register page
And: No user created in database
```

#### Scenario: Validation Error - Weak Password
```
Given: User is on /register page
When: User enters password="pass123" (too weak)
Then: Form shows error "Senha deve conter pelo menos 8 caracteres, 1 maiúscula e 1 número"
And: User remains on /register page
```

---

### R2: Email and Password Login

Users can sign in with registered email and password.

#### Requirement Details
- Form must validate email format and require password
- On submit: Verify email exists and password matches
- Invalid credentials: Show generic error (security best practice)
- On success: Create session token, set httpOnly cookie, redirect to dashboard
- After sign-in: User accesses all protected routes
- Session duration: Configurable (default 24 hours)

#### Scenario: User Successfully Signs In
```
Given: User "joao@example.com" exists with verified email
And: User's password is "SecurePass123"
When: User enters credentials and submits
Then: authClient.signIn.email() validates password
And: Session created with 24-hour expiry
And: Session token stored in httpOnly cookie (automatic)
And: onSuccess callback redirects to /dashboard
And: Middleware allows access to /dashboard routes
```

#### Scenario: Invalid Credentials
```
Given: User is on /login page
When: User enters email="joao@example.com" and password="WrongPassword"
Then: Form shows error "Email ou senha inválidos"
And: User remains on /login page
And: No session created
```

#### Scenario: User Not Verified
```
Given: User "joao@example.com" exists but emailVerified=false
When: User attempts to sign in with correct credentials
Then: Sign-in succeeds, session created
And: User redirected to /verify-email instead of /dashboard
```

---

### R3: Email Verification

Users must verify their email address before accessing the dashboard.

#### Requirement Details
- Email verification required after sign-up
- Better Auth generates secure verification token
- Token stored in `verification` table with expiry (24 hours default)
- Verification link in email format: `{NEXT_PUBLIC_APP_URL}/verify-email?token={TOKEN}`
- Clicking link validates token and marks user as verified
- Expired tokens: Show message and option to resend
- After verification: Redirect to /dashboard and start session

#### Scenario: User Verifies Email with Valid Token
```
Given: User registered with email="joao@example.com"
And: Verification token sent via email (valid for 24h)
When: User clicks verification link with valid token
Then: Token validated against `verification` table
And: user.emailVerified set to true
And: Verification record deleted (one-time use)
And: User redirected to /dashboard
And: Session established, user can access protected routes
```

#### Scenario: Token Expired
```
Given: User has a verification token older than 24 hours
When: User clicks expired verification link
Then: Page shows "Link de verificação expirado"
And: Option provided to resend verification email
When: User clicks "Resend Email"
Then: New token generated, email resent
And: User redirected to /verify-email?step=check-email
```

#### Scenario: Invalid Token
```
Given: User clicks verification link with invalid/tampered token
When: Token validation fails
Then: Page shows "Link de verificação inválido"
And: User redirected to /verify-email
And: Option to request new verification email
```

---

### R4: OAuth Sign-In (Google & GitHub)

Users can sign in using Google or GitHub accounts.

#### Requirement Details
- OAuth buttons on login and register pages
- Providers: Google (via Google OAuth 2.0), GitHub (via GitHub OAuth 2.0)
- First OAuth sign-in: Create user account automatically
  - Name: Extracted from OAuth profile (given_name + family_name or username)
  - Email: From OAuth provider
  - emailVerified: true (trusted provider)
- Existing email + OAuth: Link OAuth provider to existing account
- Session created immediately after OAuth success
- No additional email verification needed for OAuth users
- Redirect to /dashboard after successful OAuth sign-in

#### Scenario: New User Signs In with Google
```
Given: User has Google account but no Habit Coach account
When: User clicks "Sign in with Google" button
Then: authClient.signIn.social({ provider: "google" }) called
And: Redirect to Google OAuth dialog
And: User authorizes "Habit Coach AI" app
And: Google redirects to /api/auth/callback/google
Then: Better Auth exchanges code for tokens
And: New user created with name from Google profile
And: user.emailVerified = true (trusted provider)
And: Account linked to Google
And: Session created, cookie set
And: User redirected to callbackURL (/dashboard)
```

#### Scenario: Existing User Links GitHub Account
```
Given: User "joao@example.com" already exists
And: User's GitHub account uses same email
When: User clicks "Sign in with GitHub" on login page
Then: GitHub OAuth flow initiates
And: User authorizes app
And: Better Auth detects existing user by email
And: GitHub account linked to existing user
And: Session created
And: User redirected to /dashboard
```

#### Scenario: OAuth User Accesses Unverified Email Path
```
Given: User signed up with Google (emailVerified=true)
When: User accesses /verify-email page directly
Then: Middleware detects user verified via OAuth
And: Redirect to /dashboard
```

---

### R5: Session Management

User sessions are created, validated, and revoked securely.

#### Requirement Details
- Session stored in `session` table with:
  - userId reference
  - Session token (cryptographically secure)
  - Expiry timestamp (24 hours by default)
  - User agent and IP address (optional, for security logging)
- Session token stored in httpOnly cookie (name: `auth.session`)
- Secure flag enabled in production (HTTPS only)
- SameSite=Strict to prevent CSRF
- Session middleware validates on protected routes
- Expired sessions: Automatically cleaned up by database or middleware
- Sign-out: Session record deleted, cookie cleared

#### Scenario: Valid Session Allows Route Access
```
Given: User signed in with valid session
And: Session token stored in httpOnly cookie
When: User requests /dashboard/habits
Then: Middleware reads session cookie
And: Validates token against `session` table
And: Checks expiry timestamp
Then: Request proceeds to page component
```

#### Scenario: Invalid/Expired Session Redirects
```
Given: User's session expired 1 hour ago
When: User requests /dashboard/goals
Then: Middleware validates session cookie
And: Detects expiry timestamp < current time
And: Redirects to /login?next=/dashboard/goals
```

#### Scenario: User Signs Out
```
Given: User is authenticated with active session
When: User clicks "Sign Out" button
Then: authClient.signOut() invoked (client-side)
And: Session record deleted from database
And: Session cookie cleared (automatic)
And: fetchOptions.onSuccess callback redirects to /login
When: User tries to access /dashboard
Then: No session cookie, redirected to /login
```

---

### R6: Protected Routes and Middleware

Unauthenticated users cannot access protected routes.

#### Requirement Details
- Middleware checks every request to `/dashboard/*`, `/habits/*`, `/goals/*`
- If no valid session: Redirect to `/login?next={original-path}`
- Public routes excluded from middleware check:
  - `/` (home page)
  - `/login`, `/register`, `/verify-email` (auth pages)
  - `/api/auth/*` (OAuth callbacks)
  - `/pricing` (public)
- Authenticated users redirected from `/login` and `/register` to `/dashboard`
- 404 handling: No auth pages visible to authenticated users

#### Scenario: Unauthenticated User Accesses Protected Route
```
Given: User has no session cookie
When: User navigates to /dashboard
Then: Middleware intercepts request
And: Detects no valid session
And: Redirects to /login?next=/dashboard
When: User logs in
Then: After authentication, redirected to /dashboard (restored original destination)
```

#### Scenario: Authenticated User Accesses Auth Page
```
Given: User is logged in with valid session
When: User navigates directly to /login
Then: Middleware detects existing session
And: Redirects to /dashboard
```

---

### R7: Form Validation and Error Handling

All form submissions validated with clear, user-friendly error messages.

#### Requirement Details
- Client-side validation: React Hook Form with real-time feedback
- Server-side validation: Better Auth handles internally
- Validation schemas (client-side UX only):
  - `sign-in-schema`: email (required, valid format), password (required)
  - `sign-up-schema`: name (required), email (required), password (8+ chars, 1 upper, 1 num), confirmPassword (matches)
  - `verify-email-schema`: token (required, valid format)
- Error messages in Portuguese (pt-BR)
- Field-level errors show inline under input
- Form-level errors from Better Auth shown in Alert component (via onError callback)
- Submit button disabled during request (via onRequest callback)
- Loading state shown during submission
- Success messages after certain actions (via onSuccess callback)

#### Scenario: Real-time Validation on Sign-Up
```
Given: User is on /register page
When: User types "weak" in password field
Then: Field shows error "Senha muito fraca"
And: Submit button disabled
When: User changes to "SecurePass123"
Then: Error clears, submit button enabled
```

#### Scenario: Form-Level Error (Database)
```
Given: User is on /register page
When: User submits form with valid data
And: Database temporarily unavailable
Then: Server returns error "Erro ao criar conta. Tente novamente."
And: Error shown in Alert component
And: User can retry submission
```

---

### R8: User Account Creation and Initialization

New user accounts are created with proper defaults.

#### Requirement Details
- User record created in `user` table with:
  - id: Auto-generated unique identifier
  - name: From sign-up form or OAuth profile
  - email: From sign-up form or OAuth provider
  - emailVerified: false (email+password), true (OAuth)
  - image: From OAuth profile (optional)
  - createdAt: Current timestamp
  - updatedAt: Current timestamp
- Account linked: `account` table record created for OAuth
- No initial habits/goals created (separate user onboarding flow)
- Email verification workflow initiated for email+password users

#### Scenario: Email+Password User Created
```
Given: New user "Maria" signs up
When: Sign-up form submitted with valid data
Then: User record created:
  - name: "Maria"
  - email: "maria@example.com"
  - emailVerified: false
  - createdAt: now()
And: Account record NOT created (no OAuth provider)
And: Verification token generated
```

#### Scenario: OAuth User Created
```
Given: New user with GitHub signs in
When: GitHub OAuth completes
Then: User record created:
  - name: From GitHub profile
  - email: From GitHub provider
  - emailVerified: true (trusted)
And: Account record created:
  - providerId: "github"
  - accessToken stored securely
And: Session created immediately
```

---

## MODIFIED Requirements

*(None at this time. This is a new capability.)*

---

## REMOVED Requirements

*(None at this time.)*

---

## Related Capabilities

- **Session Management** - Uses Better Auth sessions for credential verification
- **Authorization** - Middleware checks session before allowing access to protected routes
- **User Profile** - Future: User profile page, account settings (separate capability)
- **Password Reset** - Future: Forgot password flow (separate capability)

---

## Testing Scenarios

### Sign-Up E2E
- [ ] Register with email, password, name
- [ ] Validation prevents weak passwords
- [ ] Duplicate email rejected
- [ ] Verification email sent
- [ ] Click verification link
- [ ] Email verified, user redirected to dashboard

### Sign-In E2E
- [ ] Login with correct credentials
- [ ] Invalid password rejected
- [ ] Invalid email rejected
- [ ] Unverified user redirected to verification page
- [ ] Session established, dashboard accessible

### OAuth E2E
- [ ] Click Google sign-in button
- [ ] Authorize app in Google
- [ ] New account created if needed
- [ ] Existing account linked if email matches
- [ ] Dashboard accessible immediately
- [ ] No email verification required

### Protected Routes
- [ ] Unauthenticated user redirected from /dashboard to /login
- [ ] Authenticated user redirected from /login to /dashboard
- [ ] Session expiry redirects to /login
- [ ] Invalid session cookie ignored

### Sign-Out
- [ ] Sign-out clears session and cookie
- [ ] Redirect to /login
- [ ] Protected routes inaccessible after sign-out

---

## Acceptance Criteria

- [x] Requirements documented with scenarios
- [ ] Implementation complete
- [ ] All tests passing
- [ ] Error messages in Portuguese
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Performance: Auth flows < 2s on 4G
