# Database Schema & Drizzle ORM Specification

## Overview
Complete PostgreSQL schema for Habit Coach AI with Drizzle ORM type definitions.

**Related:** `@/openspec/project.md` Database section, `@/openspec/specs/tech-stack.md` Database & ORM

---

## Database Tables

### 1. Users Table

```typescript
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  // Primary & Auth
  id: text('id').primaryKey(), // nanoid or uuid
  email: text('email').unique().notNull(),
  password: text('password'), // bcrypt hash (nullable for OAuth users)
  emailVerified: timestamp('email_verified'),
  
  // Profile
  name: text('name'),
  image: text('image'), // URL to profile picture
  
  // Preferences
  selectedPersonality: text('selected_personality')
    .default('yoda')
    .notNull(), // 'yoda' | 'general' | 'mentor'
  timezone: text('timezone').default('America/Sao_Paulo'),
  language: text('language').default('pt-BR'),
  
  // Subscription
  plan: text('plan').default('free').notNull(), // 'free' | 'pro'
  subscriptionStatus: text('subscription_status'), // 'active' | 'paused' | 'cancelled'
  subscriptionId: text('subscription_id'), // For payment provider (Stripe, etc)
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete for LGPD compliance
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
```

---

### 2. Sessions Table

```typescript
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  token: text('token').unique().notNull(), // Random secure token
  
  // Metadata
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  
  // Expiration
  expiresAt: timestamp('expires_at').notNull(),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Session = typeof sessions.$inferSelect
```

---

### 3. OAuth Accounts Table

```typescript
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Provider Info
  provider: text('provider').notNull(), // 'google' | 'github'
  providerAccountId: text('provider_account_id').notNull(),
  
  // OAuth Tokens
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  tokenExpiry: timestamp('token_expiry'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Unique constraint: one provider per user
export const accountUnique = unique().on(accounts.userId, accounts.provider)

export type Account = typeof accounts.$inferSelect
```

---

### 4. Habits Table

```typescript
import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const habits = pgTable('habits', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Basic Info
  name: text('name').notNull(),
  description: text('description'),
  
  // Frequency
  frequency: text('frequency').notNull(), // 'daily' | 'specific_days' | 'per_week'
  // If frequency = 'specific_days': days stored as array
  specificDays: text('specific_days'), // JSON: ['Monday', 'Wednesday', 'Friday']
  // If frequency = 'per_week': timesPerWeek is integer
  timesPerWeek: integer('times_per_week'),
  
  // Reminders
  preferredTime: text('preferred_time'), // HH:MM format
  reminderEnabled: boolean('reminder_enabled').default(false),
  
  // Metrics
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  totalCompleted: integer('total_completed').default(0),
  
  // Status
  status: text('status').default('active'), // 'active' | 'paused' | 'archived'
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedLastAt: timestamp('completed_last_at'), // Cache for streak calculation
})

export type Habit = typeof habits.$inferSelect
export type NewHabit = typeof habits.$inferInsert
```

---

### 5. Habit Completions Table

```typescript
export const habitCompletions = pgTable('habit_completions', {
  id: text('id').primaryKey(),
  habitId: text('habit_id')
    .notNull()
    .references(() => habits.id, { onDelete: 'cascade' }),
  
  // Date of completion (can be today or up to 7 days ago)
  completedDate: timestamp('completed_date').notNull(),
  
  // Optional notes
  notes: text('notes'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Unique: One completion per habit per date
export const completionUnique = unique()
  .on(habitCompletions.habitId, habitCompletions.completedDate)

export type HabitCompletion = typeof habitCompletions.$inferSelect
```

---

### 6. Goals Table

```typescript
export const goals = pgTable('goals', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Basic Info
  title: text('title').notNull(),
  description: text('description'),
  
  // Category
  category: text('category').notNull(), // 'career' | 'health' | 'education' | 'personal' | 'finance' | 'other'
  
  // Timeline
  startDate: timestamp('start_date').defaultNow().notNull(),
  deadline: date('deadline'),
  
  // Metrics
  totalSubtasks: integer('total_subtasks').default(0), // Cache for performance
  completedSubtasks: integer('completed_subtasks').default(0), // Cache
  
  // Status
  status: text('status').default('active'), // 'active' | 'completed' | 'archived'
  completedAt: timestamp('completed_at'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Goal = typeof goals.$inferSelect
export type NewGoal = typeof goals.$inferInsert
```

---

### 7. Goal Subtasks Table

```typescript
export const goalSubtasks = pgTable('goal_subtasks', {
  id: text('id').primaryKey(),
  goalId: text('goal_id')
    .notNull()
    .references(() => goals.id, { onDelete: 'cascade' }),
  
  // Basic Info
  title: text('title').notNull(),
  description: text('description'),
  
  // Planning
  estimatedDays: integer('estimated_days'),
  successCriteria: text('success_criteria'),
  
  // Order (for MVP simple ordering)
  order: integer('order').default(0),
  
  // Status
  status: text('status').default('pending'), // 'pending' | 'in_progress' | 'completed'
  completedAt: timestamp('completed_at'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type GoalSubtask = typeof goalSubtasks.$inferSelect
export type NewGoalSubtask = typeof goalSubtasks.$inferInsert
```

---

### 8. AI Messages Log Table

```typescript
export const aiMessages = pgTable('ai_messages', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Personality & Context
  personality: text('personality').notNull(), // 'yoda' | 'general' | 'mentor'
  messageType: text('message_type').notNull(), // 'habit_complete' | 'habit_fail' | 'streak' | 'goal_complete' | 'weekly_analysis' | 'chat'
  
  // Message Content
  message: text('message').notNull(),
  
  // Associated Entity
  habitId: text('habit_id').references(() => habits.id, { onDelete: 'set null' }),
  goalId: text('goal_id').references(() => goals.id, { onDelete: 'set null' }),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type AIMessage = typeof aiMessages.$inferSelect
```

---

### 9. Chat Conversations Table

```typescript
export const chatConversations = pgTable('chat_conversations', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Metadata
  title: text('title'), // Generated from first user message
  
  // Status
  status: text('status').default('active'), // 'active' | 'archived'
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type ChatConversation = typeof chatConversations.$inferSelect
```

---

### 10. Chat Messages Table

```typescript
export const chatMessages = pgTable('chat_messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id')
    .notNull()
    .references(() => chatConversations.id, { onDelete: 'cascade' }),
  
  // Sender
  role: text('role').notNull(), // 'user' | 'assistant'
  
  // Content
  content: text('content').notNull(),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type ChatMessage = typeof chatMessages.$inferSelect
```

---

### 11. Analytics Events Table

```typescript
export const analyticsEvents = pgTable('analytics_events', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Event Info
  eventName: text('event_name').notNull(), // 'habit_created', 'goal_completed', etc
  eventData: text('event_data'), // JSON with event-specific data
  
  // Metadata
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect
```

---

## Indexes for Performance

```typescript
import { index } from 'drizzle-orm/pg-core'

// Users
export const emailIndex = index('users_email_idx').on(users.email)

// Habits
export const habitsUserIdIndex = index('habits_user_id_idx').on(habits.userId)
export const habitsStatusIndex = index('habits_status_idx').on(habits.status)

// Habit Completions
export const completionsHabitIdIndex = index('habit_completions_habit_id_idx')
  .on(habitCompletions.habitId)
export const completionsDateIndex = index('habit_completions_date_idx')
  .on(habitCompletions.completedDate)

// Goals
export const goalsUserIdIndex = index('goals_user_id_idx').on(goals.userId)
export const goalsStatusIndex = index('goals_status_idx').on(goals.status)

// Goal Subtasks
export const subtasksGoalIdIndex = index('goal_subtasks_goal_id_idx')
  .on(goalSubtasks.goalId)
export const subtasksStatusIndex = index('goal_subtasks_status_idx')
  .on(goalSubtasks.status)

// AI Messages
export const aiMessagesUserIdIndex = index('ai_messages_user_id_idx')
  .on(aiMessages.userId)
export const aiMessagesTypeIndex = index('ai_messages_type_idx')
  .on(aiMessages.messageType)

// Chat
export const chatConversationsUserIdIndex = index('chat_conversations_user_id_idx')
  .on(chatConversations.userId)
export const chatMessagesConversationIdIndex = index('chat_messages_conversation_id_idx')
  .on(chatMessages.conversationId)

// Analytics
export const analyticsUserIdIndex = index('analytics_events_user_id_idx')
  .on(analyticsEvents.userId)
export const analyticsEventNameIndex = index('analytics_events_event_name_idx')
  .on(analyticsEvents.eventName)
```

---

## Relations (Drizzle Relations)

```typescript
import { relations } from 'drizzle-orm'

export const usersRelations = relations(users, ({ one, many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  habits: many(habits),
  goals: many(goals),
  aiMessages: many(aiMessages),
  chatConversations: many(chatConversations),
  analyticsEvents: many(analyticsEvents),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
  completions: many(habitCompletions),
}))

export const habitCompletionsRelations = relations(habitCompletions, ({ one }) => ({
  habit: one(habits, {
    fields: [habitCompletions.habitId],
    references: [habits.id],
  }),
}))

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
  subtasks: many(goalSubtasks),
}))

export const goalSubtasksRelations = relations(goalSubtasks, ({ one }) => ({
  goal: one(goals, {
    fields: [goalSubtasks.goalId],
    references: [goals.id],
  }),
}))
```

---

## Migrations

Migration files go in `src/database/migrations/` with timestamp naming:

```
2025-01-21_001_create_users.sql
2025-01-21_002_create_habits.sql
2025-01-21_003_create_goals.sql
...
```

**Example migration:**

```sql
-- 2025-01-21_001_create_users.sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  email_verified TIMESTAMP,
  name TEXT,
  image TEXT,
  selected_personality TEXT DEFAULT 'yoda' NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  language TEXT DEFAULT 'pt-BR',
  plan TEXT DEFAULT 'free' NOT NULL,
  subscription_status TEXT,
  subscription_id TEXT,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMP
);

CREATE INDEX users_email_idx ON users(email);
```

---

## Query Examples (Drizzle)

### Get User with All Relations
```typescript
const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    habits: {
      where: eq(habits.status, 'active'),
      with: {
        completions: {
          where: gte(habitCompletions.completedDate, sevenDaysAgo),
        },
      },
    },
    goals: {
      where: eq(goals.status, 'active'),
      with: {
        subtasks: {
          where: eq(goalSubtasks.status, 'pending'),
        },
      },
    },
  },
})
```

### Get Habit Completions (Last 30 Days)
```typescript
const completions = await db
  .select()
  .from(habitCompletions)
  .where(
    and(
      eq(habitCompletions.habitId, habitId),
      gte(habitCompletions.completedDate, thirtyDaysAgo),
    ),
  )
  .orderBy(asc(habitCompletions.completedDate))
```

### Get User's Weekly Summary
```typescript
const summary = await db
  .select({
    habitId: habits.id,
    habitName: habits.name,
    completedThisWeek: count(habitCompletions.id),
  })
  .from(habits)
  .leftJoin(
    habitCompletions,
    and(
      eq(habitCompletions.habitId, habits.id),
      gte(habitCompletions.completedDate, weekAgo),
    ),
  )
  .where(eq(habits.userId, userId))
  .groupBy(habits.id)
```

---

## Future Enhancements

1. **Full-text Search:** Add PostgreSQL `tsvector` for habit/goal search
2. **Temporal Queries:** Add `valid_from`/`valid_to` for audit trails
3. **Partitioning:** Partition `habit_completions` by date for large datasets
4. **Read Replicas:** For analytics queries
