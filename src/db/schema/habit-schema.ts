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
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Recurrence type enum
export const recurrenceTypeEnum = pgEnum("recurrence_type", [
  "daily",
  "weekly",
  "monthly",
  "annual",
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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("habit_userId_idx").on(table.userId),
    index("habit_isActive_idx").on(table.isActive),
  ]
);

// Habit recurrence table
export const habitRecurrence = pgTable(
  "habit_recurrence",
  {
    id: text("id").primaryKey(),
    habitId: text("habit_id")
      .notNull()
      .references(() => habit.id, { onDelete: "cascade" })
      .unique(),
    type: recurrenceTypeEnum("type").notNull(),
    // Type-specific fields (nullable, validated by application logic)
    intervalDays: integer("interval_days"), // For daily recurrence
    weekdays: integer("weekdays").array(), // For weekly recurrence (0=Sunday, 6=Saturday)
    intervalMonths: integer("interval_months"), // For monthly recurrence
    intervalYears: integer("interval_years"), // For annual recurrence
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("habitRecurrence_habitId_idx").on(table.habitId)]
);

// Habit execution table
export const habitExecution = pgTable(
  "habit_execution",
  {
    id: text("id").primaryKey(),
    habitId: text("habit_id")
      .notNull()
      .references(() => habit.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at").notNull(),
    completedDate: date("completed_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
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
  recurrence: one(habitRecurrence, {
    fields: [habit.id],
    references: [habitRecurrence.habitId],
  }),
  executions: many(habitExecution),
}));

export const habitRecurrenceRelations = relations(
  habitRecurrence,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitRecurrence.habitId],
      references: [habit.id],
    }),
  })
);

export const habitExecutionRelations = relations(
  habitExecution,
  ({ one }) => ({
    habit: one(habit, {
      fields: [habitExecution.habitId],
      references: [habit.id],
    }),
  })
);
