import { z } from "zod";

/**
 * Recurrence type enumeration
 */
export const recurrenceTypeEnum = z.enum([
  "daily",
  "weekly",
  "monthly",
  "annual",
]);

export type RecurrenceType = z.infer<typeof recurrenceTypeEnum>;

/**
 * Recurrence schema with discriminated union based on type
 * 
 * Each recurrence type has specific validation rules:
 * - Daily: requires intervalDays (min 1)
 * - Weekly: requires weekdays array (1-7 values, each 0-6 where 0=Sunday, 6=Saturday)
 * - Monthly: requires intervalMonths (min 1)
 * - Annual: requires intervalYears (min 1)
 */
export const recurrenceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("daily"),
    intervalDays: z
      .number()
      .int()
      .min(1, "Interval must be at least 1 day")
      .max(365, "Interval cannot exceed 365 days"),
  }),
  z.object({
    type: z.literal("weekly"),
    weekdays: z
      .array(
        z
          .number()
          .int()
          .min(0, "Weekday must be between 0 (Sunday) and 6 (Saturday)")
          .max(6, "Weekday must be between 0 (Sunday) and 6 (Saturday)")
      )
      .min(1, "At least one weekday must be selected")
      .max(7, "Cannot select more than 7 weekdays")
      .refine((days) => {
        const uniqueDays = new Set(days);
        return uniqueDays.size === days.length;
      }, "Duplicate weekdays are not allowed"),
  }),
  z.object({
    type: z.literal("monthly"),
    intervalMonths: z
      .number()
      .int()
      .min(1, "Interval must be at least 1 month")
      .max(12, "Interval cannot exceed 12 months"),
  }),
  z.object({
    type: z.literal("annual"),
    intervalYears: z
      .number()
      .int()
      .min(1, "Interval must be at least 1 year")
      .max(10, "Interval cannot exceed 10 years"),
  }),
]);

export type Recurrence = z.infer<typeof recurrenceSchema>;

/**
 * Schema for creating a new habit
 */
export const createHabitSchema = z.object({
  name: z
    .string()
    .min(1, "Habit name is required")
    .max(100, "Habit name cannot exceed 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .optional(),
  recurrence: recurrenceSchema,
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;

/**
 * Schema for updating an existing habit
 * All fields are optional to allow partial updates
 */
export const updateHabitSchema = z.object({
  habitId: z.string().uuid("Invalid habit ID"),
  name: z
    .string()
    .min(1, "Habit name is required")
    .max(100, "Habit name cannot exceed 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .optional()
    .nullable(),
  recurrence: recurrenceSchema.optional(),
});

export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;

/**
 * Schema for completing a habit on a specific date
 * 
 * Validations:
 * - completedDate cannot be in the future
 * - completedDate cannot be older than 7 days (allows retroactive completions)
 */
export const completeHabitSchema = z.object({
  habitId: z.string().uuid("Invalid habit ID"),
  completedDate: z
    .string()
    .refine((dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime());
    }, "Invalid date format")
    .transform((dateStr) => new Date(dateStr))
    .refine((date) => {
      const now = new Date();
      now.setHours(23, 59, 59, 999); // End of today
      return date <= now;
    }, "Completed date cannot be in the future")
    .refine((date) => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0); // Start of 7 days ago
      return date >= sevenDaysAgo;
    }, "Completed date cannot be older than 7 days"),
});

export type CompleteHabitInput = z.infer<typeof completeHabitSchema>;

/**
 * Schema for un-completing (removing completion) of a habit on a specific date
 */
export const uncompleteHabitSchema = z.object({
  habitId: z.string().uuid("Invalid habit ID"),
  completedDate: z
    .string()
    .refine((dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime());
    }, "Invalid date format")
    .transform((dateStr) => new Date(dateStr)),
});

export type UncompleteHabitInput = z.infer<typeof uncompleteHabitSchema>;

/**
 * Schema for deleting a habit (soft delete)
 */
export const deleteHabitSchema = z.object({
  habitId: z.string().uuid("Invalid habit ID"),
});

export type DeleteHabitInput = z.infer<typeof deleteHabitSchema>;
