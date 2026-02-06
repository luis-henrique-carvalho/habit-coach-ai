import { habit, habitExecution } from "@/db/schema/habit-schema";

export type Habit = typeof habit.$inferSelect;
export type HabitExecution = typeof habitExecution.$inferSelect;

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