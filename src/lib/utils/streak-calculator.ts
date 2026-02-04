import { HabitExecution, FrequencyPattern } from "@/lib/types/habit";

/**
 * Calculates current and longest streak for a habit based on completions and frequency pattern
 *
 * Streaks are calculated by checking if completions match the habit's frequency requirement:
 * - Daily habits: consecutive calendar days of completion
 * - Weekly habits (specific days): consecutive occurrences of scheduled weekdays
 * - Weekly count habits: satisfaction of completion count in rolling 7-day windows
 *
 * @param completions - Array of completion records sorted by date (newest first recommended)
 * @param frequency - Frequency pattern defining habit schedule
 * @param referenceDate - The date to calculate streak from (defaults to today)
 * @returns Object with current streak and record streak in days
 */
export function calculateStreak(
  completions: HabitExecution[],
  frequency: FrequencyPattern,
  referenceDate: Date = new Date()
): {
  current: number;
  record: number;
} {
  if (completions.length === 0) {
    return { current: 0, record: 0 };
  }

  // Convert completions to a Set of date strings for O(1) lookup
  const completedDates = new Set(completions.map((c) => c.completedDate));

  switch (frequency.type) {
    case "daily":
      return calculateDailyStreak(completedDates, referenceDate);

    case "weekly":
      return calculateWeeklyStreak(
        completedDates,
        frequency.weekdays,
        referenceDate
      );

    case "weekly_count":
      return calculateWeeklyCountStreak(
        completedDates,
        frequency.count,
        referenceDate
      );

    default:
      return { current: 0, record: 0 };
  }
}

/**
 * Calculates streak for daily habits
 * A streak is broken if a day is missed
 */
function calculateDailyStreak(
  completedDates: Set<string>,
  referenceDate: Date
): { current: number; record: number } {
  const dates = Array.from(completedDates).sort().reverse(); // Newest first
  if (dates.length === 0) return { current: 0, record: 0 };

  let currentStreak = 0;
  let recordStreak = 0;
  let tempStreak = 0;

  // Check each day going backwards from reference date
  const checkDate = new Date(referenceDate);
  checkDate.setHours(0, 0, 0, 0);

  // Check if today is completed
  const todayStr = formatDate(checkDate);
  if (completedDates.has(todayStr)) {
    currentStreak = 1;
    tempStreak = 1;
  } else {
    // If today is not completed, current streak is 0
    // But we still calculate the longest streak
    tempStreak = 0;
  }

  // Go backwards through all dates
  const allDates = new Set<string>();
  for (const [key] of completedDates.entries()) {
    allDates.add(key);
  }

  const sortedDates = Array.from(allDates)
    .map((dateStr) => new Date(dateStr + "T00:00:00"))
    .sort((a, b) => b.getTime() - a.getTime());

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDateStr = formatDate(sortedDates[i]);
    const expectedDateStr = formatDate(
      new Date(
        checkDate.getTime() - (currentStreak + tempStreak) * 24 * 60 * 60 * 1000
      )
    );

    if (currentDateStr === expectedDateStr) {
      if (currentStreak > 0) {
        currentStreak++;
      } else {
        tempStreak++;
      }
    } else if (currentStreak === 0 && tempStreak > 0) {
      // We've found a gap in the streak history
      recordStreak = Math.max(recordStreak, tempStreak);
      tempStreak = 0;
    }
  }

  recordStreak = Math.max(
    recordStreak,
    Math.max(currentStreak, tempStreak)
  );

  return { current: currentStreak, record: recordStreak };
}

/**
 * Calculates streak for weekly habits (specific days only)
 * A streak requires completion on all scheduled days each week
 */
function calculateWeeklyStreak(
  completedDates: Set<string>,
  weekdaysRequired: number[],
  referenceDate: Date
): { current: number; record: number } {
  const daysPerWeekRequired = weekdaysRequired.length;
  if (daysPerWeekRequired === 0) return { current: 0, record: 0 };

  // Convert to Set for faster lookup
  const requiredWeekdays = new Set(weekdaysRequired);

  // Get all completed dates and group by week
  const completedByWeek = new Map<string, Set<number>>();

  for (const dateStr of completedDates) {
    const date = new Date(dateStr + "T00:00:00");
    const weekKey = getWeekKey(date);
    const dayOfWeek = date.getDay();

    if (requiredWeekdays.has(dayOfWeek)) {
      if (!completedByWeek.has(weekKey)) {
        completedByWeek.set(weekKey, new Set());
      }
      completedByWeek.get(weekKey)!.add(dayOfWeek);
    }
  }

  let currentStreak = 0;
  let recordStreak = 0;
  let tempStreak = 0;

  // Check weeks going backwards from reference date
  const checkDate = new Date(referenceDate);
  checkDate.setHours(0, 0, 0, 0);

  const referenceWeekKey = getWeekKey(checkDate);
  const completionsThisWeek = completedByWeek.get(referenceWeekKey) || new Set();

  if (completionsThisWeek.size === daysPerWeekRequired) {
    currentStreak = 1;
    tempStreak = 1;
  } else {
    tempStreak = 0;
  }

  // Check previous weeks
  const sortedWeeks = Array.from(completedByWeek.keys()).sort().reverse();
  for (const week of sortedWeeks) {
    if (week === referenceWeekKey) continue;

    const completionsInWeek = completedByWeek.get(week) || new Set();
    if (completionsInWeek.size === daysPerWeekRequired) {
      if (currentStreak > 0) {
        currentStreak++;
      } else {
        tempStreak++;
      }
    } else if (currentStreak === 0 && tempStreak > 0) {
      recordStreak = Math.max(recordStreak, tempStreak);
      tempStreak = 0;
    }
  }

  recordStreak = Math.max(
    recordStreak,
    Math.max(currentStreak, tempStreak)
  );

  return { current: currentStreak, record: recordStreak };
}

/**
 * Calculates streak for weekly count habits
 * A streak requires minimum completions in a rolling 7-day window
 */
function calculateWeeklyCountStreak(
  completedDates: Set<string>,
  countRequired: number,
  referenceDate: Date
): { current: number; record: number } {
  if (completedDates.size === 0) return { current: 0, record: 0 };

  const sorted = Array.from(completedDates)
    .map((d) => new Date(d + "T00:00:00"))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  let recordStreak = 0;
  let tempStreak = 0;

  // Check rolling 7-day windows backwards from reference date
  for (let i = 0; i < sorted.length; i++) {
    const windowEndDate = new Date(referenceDate);
    windowEndDate.setHours(0, 0, 0, 0);
    windowEndDate.setDate(windowEndDate.getDate() - i);

    const windowStartDate = new Date(windowEndDate);
    windowStartDate.setDate(windowStartDate.getDate() - 6);

    // Count completions in this window
    let completionsInWindow = 0;
    for (const date of sorted) {
      if (date >= windowStartDate && date <= windowEndDate) {
        completionsInWindow++;
      }
      if (date < windowStartDate) break; // Already sorted, can break early
    }

    if (completionsInWindow >= countRequired) {
      if (currentStreak > 0 || i === 0) {
        currentStreak++;
      } else {
        tempStreak++;
      }
    } else if (currentStreak === 0 && tempStreak > 0) {
      recordStreak = Math.max(recordStreak, tempStreak);
      tempStreak = 0;
    }
  }

  recordStreak = Math.max(
    recordStreak,
    Math.max(currentStreak, tempStreak)
  );

  return { current: currentStreak, record: recordStreak };
}

/**
 * Helper: Format date as YYYY-MM-DD string
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Helper: Get ISO week key (YYYY-Www format)
 */
function getWeekKey(date: Date): string {
  const d = new Date(date);
  const dayNum = d.getDay();
  const d2 = new Date(d.valueOf() - dayNum * 86400000);

  const weekKey = `${d2.getFullYear()}-W${String(
    Math.floor((d2.getTime() - new Date(d2.getFullYear(), 0, 1).getTime()) / 86400000 / 7) + 1
  ).padStart(2, "0")}`;

  return weekKey;
}

/**
 * Calculate completion rate for a given number of days
 * @returns Percentage (0-100)
 */
export function calculateCompletionRate(
  completedDates: Set<string>,
  daysWindow: number,
  referenceDate: Date = new Date()
): number {
  const endDate = new Date(referenceDate);
  endDate.setHours(0, 0, 0, 0);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - daysWindow + 1);

  let completionCount = 0;
  for (const dateStr of completedDates) {
    const date = new Date(dateStr + "T00:00:00");
    if (date >= startDate && date <= endDate) {
      completionCount++;
    }
  }

  return Math.round((completionCount / daysWindow) * 100);
}
