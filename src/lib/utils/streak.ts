/**
 * Streak calculation utilities for habit tracking
 */

import { isSameDate, normalizeDateToMidnight, previousDay } from "./date";
import { isActiveDay, type Recurrence } from "./recurrence";

export interface HabitExecution {
  id: string;
  habitId: string;
  completedAt: Date;
  completedDate: string; // YYYY-MM-DD format
  createdAt: Date;
}

export interface HabitWithRecurrence {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Calculate the current streak for a habit
 * Counts consecutive active days (working backward from today) where the habit was completed
 *
 * @param habit - The habit data
 * @param executions - Array of execution records
 * @param recurrence - The recurrence configuration
 * @returns The current streak count
 */
export function calculateCurrentStreak(
  habit: HabitWithRecurrence,
  executions: HabitExecution[],
  recurrence: Recurrence
): number {
  const today = normalizeDateToMidnight(new Date());
  let streak = 0;
  let checkDate = today;

  // Sort executions by date descending for efficient lookup
  const sortedExecutions = executions
    .map((e) => ({
      ...e,
      completedDateObj: normalizeDateToMidnight(new Date(e.completedDate)),
    }))
    .sort(
      (a, b) => b.completedDateObj.getTime() - a.completedDateObj.getTime()
    );

  // Create a Set for O(1) lookup of completed dates
  const completedDatesSet = new Set(
    sortedExecutions.map((e) => e.completedDateObj.getTime())
  );

  // Limit iterations to prevent infinite loops (e.g., 1000 days)
  const maxIterations = 1000;
  let iterations = 0;

  while (iterations < maxIterations) {
    // Check if checkDate is before habit was created
    if (checkDate < normalizeDateToMidnight(habit.createdAt)) {
      break;
    }

    // Is this an active day according to recurrence rules?
    const isActive = isActiveDay(checkDate, recurrence, habit.createdAt);

    if (!isActive) {
      // Skip non-active days
      checkDate = previousDay(checkDate);
      iterations++;
      continue;
    }

    // Active day: was it completed?
    const wasCompleted = completedDatesSet.has(checkDate.getTime());

    if (!wasCompleted) {
      // Active day not completed → streak broken
      break;
    }

    // Increment streak and move to previous day
    streak++;
    checkDate = previousDay(checkDate);
    iterations++;
  }

  return streak;
}

/**
 * Calculate what the longest streak should be
 * Returns the maximum of current streak and existing longest streak
 *
 * @param currentStreak - The newly calculated current streak
 * @param existingLongestStreak - The existing longest streak record
 * @returns The updated longest streak
 */
export function calculateLongestStreak(
  currentStreak: number,
  existingLongestStreak: number
): number {
  return Math.max(currentStreak, existingLongestStreak);
}

/**
 * Check if a streak should be updated (current > longest)
 *
 * @param currentStreak - The current streak count
 * @param longestStreak - The longest streak record
 * @returns true if the longest streak should be updated
 */
export function shouldUpdateLongestStreak(
  currentStreak: number,
  longestStreak: number
): boolean {
  return currentStreak > longestStreak;
}

/**
 * Get streak status for today
 * Determines if the user has completed today's habit and what their status is
 */
export function getStreakStatus(
  habit: HabitWithRecurrence,
  executions: HabitExecution[],
  recurrence: Recurrence
): {
  isCompletedToday: boolean;
  isActiveToday: boolean;
  canCompleteToday: boolean;
} {
  const today = normalizeDateToMidnight(new Date());

  const isActiveToday = isActiveDay(today, recurrence, habit.createdAt);

  const isCompletedToday = executions.some((execution) => {
    const executionDate = normalizeDateToMidnight(
      new Date(execution.completedDate)
    );
    return isSameDate(executionDate, today);
  });

  const canCompleteToday = isActiveToday && !isCompletedToday;

  return {
    isCompletedToday,
    isActiveToday,
    canCompleteToday,
  };
}

/**
 * Calculate completion rate over a period
 * Returns the percentage of active days that were completed
 */
export function calculateCompletionRate(
  habit: HabitWithRecurrence,
  executions: HabitExecution[],
  recurrence: Recurrence,
  days: number = 30
): number {
  const today = normalizeDateToMidnight(new Date());
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days);

  let activeDaysCount = 0;
  let completedDaysCount = 0;

  const completedDatesSet = new Set(
    executions.map((e) =>
      normalizeDateToMidnight(new Date(e.completedDate)).getTime()
    )
  );

  const checkDate = new Date(startDate);

  while (checkDate <= today) {
    if (isActiveDay(checkDate, recurrence, habit.createdAt)) {
      activeDaysCount++;

      if (completedDatesSet.has(checkDate.getTime())) {
        completedDaysCount++;
      }
    }

    checkDate.setDate(checkDate.getDate() + 1);
  }

  if (activeDaysCount === 0) return 0;

  return Math.round((completedDaysCount / activeDaysCount) * 100);
}
