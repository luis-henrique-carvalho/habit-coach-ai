import { z } from "zod";

// Frequency type enum matching database
export const frequencyTypeSchema = z.enum(["daily", "weekly", "weekly_count"]);

// Frequency value schemas based on type
export const frequencyValueSchema = z.union([
  // Daily: no additional config needed
  z.object({ type: z.literal("daily") }).strict(),

  // Specific days: array of weekday numbers (0-6, 0=Sunday)
  z.object({
    type: z.literal("weekly"),
    weekdays: z.array(z.number().min(0).max(6)).min(1).max(7),
  }).strict(),

  // Weekly count: number of times per week (1-7)
  z.object({
    type: z.literal("weekly_count"),
    count: z.number().int().min(1).max(7),
  }).strict(),
]);

// Create habit schema
export const createHabitSchema = z.object({
  name: z.string()
    .min(1, "Habit name is required")
    .max(255, "Habit name must be 255 characters or less")
    .trim(),

  description: z.string()
    .max(1000, "Description must be 1000 characters or less")
    .trim()
    .optional(),

  recurrenceType: frequencyTypeSchema,
  recurrenceInterval: z.number().int().min(1),
  recurrenceWeekdays: z.array(z.number().min(0).max(6)).optional(),
  recurrenceWeeklyCount: z.number().int().min(1).max(7).optional(),

  preferredTime: z.string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:mm)")
    .optional(),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;

// Update habit schema (all fields optional)
export const updateHabitSchema = createHabitSchema.partial();

export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;

// Mark complete schema
export const markHabitCompleteSchema = z.object({
  habitId: z.string().min(1, "Habit ID is required"),

  // Optional: defaults to today if not provided
  completedDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .optional(),
});

export type MarkHabitCompleteInput = z.infer<typeof markHabitCompleteSchema>;

// Get habit details schema
export const getHabitDetailsSchema = z.object({
  habitId: z.string().min(1, "Habit ID is required"),
});

export type GetHabitDetailsInput = z.infer<typeof getHabitDetailsSchema>;

// Archive/Restore habit schema
export const archiveHabitSchema = z.object({
  habitId: z.string().min(1, "Habit ID is required"),
});

export type ArchiveHabitInput = z.infer<typeof archiveHabitSchema>;

export const restoreHabitSchema = archiveHabitSchema;

export type RestoreHabitInput = z.infer<typeof restoreHabitSchema>;

// Get daily checklist schema (optional user plan for tier validation)
export const getDailyChecklistSchema = z.object({
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .optional(),
});

export type GetDailyChecklistInput = z.infer<typeof getDailyChecklistSchema>;
