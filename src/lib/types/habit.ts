// Base habit type derived from database schema
export type Habit = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  recurrenceType: "daily" | "weekly" | "weekly_count";
  recurrenceInterval: number;
  recurrenceWeekdays: number[] | null;
  recurrenceWeeklyCount: number | null;
  preferredTime: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Habit execution/completion record
export type HabitExecution = {
  id: string;
  habitId: string;
  completedAt: Date;
  completedDate: string; // YYYY-MM-DD format
  createdAt: Date;
};

// Frequency pattern type for frequency validation
export type FrequencyPattern =
  | { type: "daily" }
  | { type: "weekly"; weekdays: number[] }
  | { type: "weekly_count"; count: number };

// Input types for server actions
export type CreateHabitInput = {
  name: string;
  description?: string;
  recurrenceType: "daily" | "weekly" | "weekly_count";
  recurrenceInterval: number;
  recurrenceWeekdays?: number[];
  recurrenceWeeklyCount?: number;
  preferredTime?: string;
};

export type UpdateHabitInput = Partial<CreateHabitInput>;

export type MarkHabitCompleteInput = {
  habitId: string;
  completedDate?: string;
};

export type GetHabitDetailsInput = {
  habitId: string;
};

// Derived types with calculations
export type HabitWithStats = Habit & {
  completedToday: boolean;
  completionsThisWeek: number;
  completionRate30Days: number;
  completionRate60Days: number;
  completionRate90Days: number;
};

export type HabitDetail = HabitWithStats & {
  last90DaysCompletions: HabitExecution[];
  monthlyTrend: Array<{
    date: string;
    completed: boolean;
  }>;
};

// Error response type
export type HabitActionError = {
  code:
    | "VALIDATION_ERROR"
    | "NOT_FOUND"
    | "UNAUTHORIZED"
    | "ALREADY_EXISTS"
    | "TIER_LIMIT_EXCEEDED"
    | "ARCHIVED"
    | "DATABASE_ERROR"
    | "INVALID_DATE";
  message: string;
};

// Success response wrapper
export type HabitActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: HabitActionError };
