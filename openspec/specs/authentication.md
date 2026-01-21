# Authentication & Authorization Specification

## Overview
Complete authentication and authorization patterns for Habit Coach AI using Better Auth.

**Related:** `@/openspec/project.md` Auth section, `@/docs/PRD.md` RNF04 Autenticação

---

## Authentication Flow

**Referência oficial:** https://www.better-auth.com/docs/basic-usage

### User Registration (Email + Password)
```
1. User submits email + password on /auth/register
2. Client calls actionRegisterUser (Server Action)
3. Server validates with Zod schema
4. Hash password with bcrypt (Better Auth handles)
5. Create user in database
6. Create session (httpOnly cookie)
7. Redirect to /onboarding
```

### User Login
```
1. User submits credentials on /auth/login
2. Client calls actionLoginUser (Server Action)
3. Server validates credentials with Better Auth
4. Create session (httpOnly cookie)
5. Redirect to /dashboard
```

### OAuth (Google, GitHub)
```
1. User clicks "Sign in with Google" button
2. Redirect to Better Auth OAuth endpoint
3. User grants permission on provider
4. Callback to /api/auth/callback
5. Better Auth creates user if new
6. Session established
7. Redirect to /dashboard or /onboarding
```

### Session Management
```
Authorization Header: Cookie-based (automatic)
Session Duration: 7 days inactivity
Session Refresh: Automatic via middleware
Session Invalidation: Logout clears cookie
```

---

## User Model & Roles

### User Schema (Drizzle)
```typescript
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  password: text('password').notNull(), // bcrypt hash
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  selectedPersonality: text('selected_personality').default('yoda'), // 'yoda' | 'general' | 'mentor'
  plan: text('plan').default('free'), // 'free' | 'pro'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // soft delete for data retention
})

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: text('provider').notNull(), // 'google', 'github'
  providerAccountId: text('provider_account_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### User Roles (MVP)
- **Free User:** Limited habits (3), limited metas (1)
- **Pro User:** Unlimited habits, unlimited metas
- **Admin:** (Future) Dashboard access, user management

### Role Checking
```typescript
// In Server Actions or middleware
function isProUser(user: User): boolean {
  return user.plan === 'pro'
}

function canCreateHabit(user: User): boolean {
  const habitCount = await getActiveHabitCount(user.id)
  const limit = isProUser(user) ? Infinity : 3
  return habitCount < limit
}
```

---

## Authentication Methods

### Method 1: Email + Password
- **Signup Page:** `/auth/register`
- **Login Page:** `/auth/login`
- **Implementation:** Better Auth (https://www.better-auth.com/docs/authentication/email-password)
- **Password Requirements:**
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one number
- **Password Reset:** (Future) Via email link
- **Storage:** bcrypt hash automático (Better Auth handled)

### Method 2: OAuth (Google)
- **Signup:** "Sign in with Google" button
- **Implementation:** Better Auth OAuth (https://www.better-auth.com/docs/authentication/oauth)
- **Credentials:** 
  - `GOOGLE_CLIENT_ID` from Google Cloud
  - `GOOGLE_CLIENT_SECRET` from Google Cloud
- **Scope:** email, profile
- **Account Linking:** (Future) Link Google to existing email account

### Method 3: OAuth (GitHub)
- **Signup:** "Sign in with GitHub" button
- **Credentials:**
  - `GITHUB_CLIENT_ID` from GitHub
  - `GITHUB_CLIENT_SECRET` from GitHub
- **Scope:** user:email, read:user
- **Account Linking:** (Future)

### Method 4: Magic Links (Future)
- **Signup:** "Sign in with Email"
- **Flow:** Send magic link via email, no password
- **Implementation:** Resend + Better Auth

### Method 5: 2FA (Future)
- **Type:** TOTP (Time-based One-Time Password)
- **Implementation:** Better Auth 2FA (https://www.better-auth.com/docs/authentication/two-factor)
- **Backup Codes:** User can generate backup codes

---

## Session & Cookie Management

### Session Store
- **Location:** `sessions` table in PostgreSQL
- **Structure:**
  - `id`: Unique session identifier
  - `userId`: Reference to user
  - `token`: Secure random token
  - `expiresAt`: Expiration timestamp
  - `createdAt`: Creation timestamp

### Cookie Configuration
```typescript
// Set by Better Auth automatically
{
  name: 'session', // or better-auth session name
  value: sessionToken,
  path: '/',
  domain: process.env.NEXT_PUBLIC_APP_URL,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  httpOnly: true, // No JavaScript access
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'lax', // CSRF protection
}
```

### Session Middleware
```typescript
// middleware.ts
// Referência: https://www.better-auth.com/docs/integrations/next-js#middleware
import { betterAuth } from 'better-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await betterAuth.api.getSession({
    headers: request.headers,
  })
  
  // If no session and accessing protected route
  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // If session exists but accessing /auth/login
  if (session && request.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next|favicon|public).*)'],
}
```

---

## Authorization Patterns

### Route Protection
```typescript
// app/(dashboard)/dashboard/page.tsx
// Referência: https://www.better-auth.com/docs/integrations/next-js
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth' // Better Auth instance
import { headers } from 'next/headers'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  if (!session) {
    redirect('/auth/login')
  }
  
  return <Dashboard user={session.user} />
}
```

### Server Action Protection
```typescript
// actions/createHabit.ts
'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { createAction } from '@/lib/safe-action'

export const actionCreateHabit = createAction()
  .schema(createHabitSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    
    if (!session) {
      throw new Error('Unauthorized')
    }
    
    const userId = session.user.id
    
    // Check plan limits
    if (!isProUser(session.user)) {
      const habitCount = await getActiveHabitCount(userId)
      if (habitCount >= 3) {
        throw new Error('Free plan limited to 3 habits. Upgrade to Pro.')
      }
    }
    
    // Create habit
    return await db.insert(habits).values({
      userId,
      name: parsedInput.name,
      // ...
    })
  })
```

### Data Isolation (User Scoping)
```typescript
// All queries must include userId
export async function getUserHabits(userId: string) {
  return await db.query.habits.findMany({
    where: (habits, { eq }) => eq(habits.userId, userId),
  })
}

// ❌ BAD: Missing userId filter
export async function getAllHabits() {
  return await db.query.habits.findMany() // exposes all users' data!
}
```

### Rate Limiting (Future)
```typescript
// Prevent abuse (spam, brute force)
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
})

export const actionCreateHabit = createAction()
  .schema(createHabitSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    
    const { success } = await ratelimit.limit(`createHabit:${session?.user.id}`)
    if (!success) {
      throw new Error('Too many requests')
    }
    
    // Proceed...
  })
```

---

## Security Patterns

### CSRF Protection
- **Automatic:** Better Auth + Server Actions provide CSRF tokens
- **Mechanism:** Tokens in form data, verified server-side
- **No manual configuration needed:** Next.js + Better Auth handles

### Password Security
- **Hashing:** bcrypt (automatic via Better Auth)
- **Salting:** bcrypt handles
- **Never:** Store plaintext passwords, hash password on client

### XSS Prevention
- **HttpOnly Cookies:** Session token not accessible via JavaScript
- **Content Security Policy:** (Future) Add CSP headers
- **Input Sanitization:** Zod validation on all inputs

### SQL Injection Prevention
- **ORM:** Drizzle ORM uses parameterized queries
- **No raw SQL:** Avoid raw SQL strings

### Session Hijacking Prevention
- **Secure Cookies:** HTTPS only in production
- **SameSite:** Lax to prevent cross-site cookie send
- **Regeneration:** Session regenerated on role change

---

## Logout & Session Termination

**Referência:** https://www.better-auth.com/docs/concepts/session-management

### Logout Flow
```typescript
// actions/logout.ts
'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function actionLogout() {
  await auth.api.signOut({
    headers: await headers(),
  })
  
  redirect('/auth/login')
}
```

### Session Deletion
```typescript
// User's session is deleted from database
// Cookie is cleared on client
// Redirect to login page
```

### Delete Account
```typescript
// actions/deleteAccount.ts
export const actionDeleteAccount = createAction().action(async () => {
  const session = await getSession()
  
  // Soft delete user
  await db.update(users)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(users.id, session.user.id))
  
  // Delete related data or keep for LGPD compliance
  await db.delete(habits).where(eq(habits.userId, session.user.id))
  
  // Clear session
  await signOut({ redirectTo: '/auth/login' })
})
```

---

## Testing & Validation

### Unit Tests
```typescript
// __tests__/auth.test.ts
describe('Authentication', () => {
  it('should hash password correctly', async () => {
    const password = 'TestPassword123'
    const hash = await hashPassword(password)
    expect(await comparePassword(password, hash)).toBe(true)
  })
  
  it('should reject invalid email', () => {
    const result = registerSchema.safeParse({ 
      email: 'invalid-email',
      password: 'Password123'
    })
    expect(result.success).toBe(false)
  })
})
```

### E2E Tests (Playwright)
```typescript
test('should complete login flow', async ({ page }) => {
  await page.goto('/auth/login')
  await page.fill('input[type="email"]', 'user@test.com')
  await page.fill('input[type="password"]', 'TestPassword123')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('/dashboard')
})
```

---

## Future Enhancements

1. **Magic Links:** Email-based passwordless authentication
2. **2FA/MFA:** TOTP support with backup codes
3. **Account Linking:** Connect multiple auth providers
4. **Social Login Expansion:** Apple, Microsoft
5. **Session Management Dashboard:** View active sessions, revoke from device
6. **API Keys:** For future API access
