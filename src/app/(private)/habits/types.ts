import type { habit, habitExecution } from "@/db/schema";

export type Habit = typeof habit.$inferSelect;
export type HabitExecution = typeof habitExecution.$inferSelect;

export type HabitWithStatus = Habit & {
  completedToday: boolean;
  isDueToday: boolean;
};

export type HabitStats = {
  currentStreak: number;
  longestStreak: number;
  completionRates: {
    days30: number;
    days60: number;
    days90: number;
  };
};

export type WeeklyTrendData = {
  week: string;
  rate: number;
};

export type HabitDetail = Habit & {
  stats: HabitStats;
  executions: HabitExecution[];
  weeklyTrend: WeeklyTrendData[];
};
