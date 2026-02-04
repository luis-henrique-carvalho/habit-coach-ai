import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
  unique,
  date,
  pgEnum,
  time
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Recurrence type enum
export const recurrenceTypeEnum = pgEnum("recurrence_type", [
  "daily",
  "weekly",
  "weekly_count",
]);

// Habit table
export const habit = pgTable(
  "habit",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true).notNull(),

    currentStreak: integer("current_streak").default(0).notNull(),
    longestStreak: integer("longest_streak").default(0).notNull(),

    recurrenceType: recurrenceTypeEnum("recurrence_type").notNull(),
    recurrenceInterval: integer("recurrence_interval").default(1).notNull(),
    recurrenceWeekdays: integer("recurrence_weekdays").array(),
    recurrenceWeeklyCount: integer("recurrence_weekly_count"),

    preferredTime: time("preferred_time"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("habit_userId_idx").on(table.userId),
    index("habit_isActive_idx").on(table.isActive),
    unique("habit_userId_name_active_unique").on(
      table.userId,
      table.name,
      table.isActive
    ),
  ]
);

// Habit execution table
export const habitExecution = pgTable(
  "habit_execution",
  {
    id: text("id").primaryKey(),
    habitId: text("habit_id")
      .notNull()
      .references(() => habit.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull(),
    completedDate: date("completed_date").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("habitExecution_habitId_idx").on(table.habitId),
    index("habitExecution_completedDate_idx").on(table.completedDate),
    unique("habitExecution_habitId_completedDate_unique").on(
      table.habitId,
      table.completedDate
    ),
  ]
);

// Relations
export const habitRelations = relations(habit, ({ one, many }) => ({
  user: one(user, {
    fields: [habit.userId],
    references: [user.id],
  }),
  executions: many(habitExecution),
}));

export const habitExecutionRelations = relations(
  habitExecution,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitExecution.habitId],
      references: [habit.id],
    }),
  })
);
