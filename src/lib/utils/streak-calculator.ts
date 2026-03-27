import {
  subDays,
  format,
  differenceInDays,
  getDay,
  startOfWeek,
  addWeeks,
  isBefore,
  isAfter,
} from "date-fns";

type RecurrenceType = "daily" | "weekly" | "weekly_count";

interface RecurrenceConfig {
  recurrenceWeekdays?: number[] | null;
  recurrenceWeeklyCount?: number | null;
}

/**
 * Checks if a given date is an expected completion day for the recurrence type.
 */
function isExpectedDay(
  date: Date,
  recurrenceType: RecurrenceType,
  config: RecurrenceConfig
): boolean {
  if (recurrenceType === "daily") return true;
  if (recurrenceType === "weekly") {
    const dayOfWeek = getDay(date); // 0=Sunday
    return config.recurrenceWeekdays?.includes(dayOfWeek) ?? false;
  }
  // weekly_count: any day counts, handled by week-level logic
  return true;
}

/**
 * Calculate current streak for daily and weekly (specific days) habits.
 * Walks backwards from today counting consecutive expected-day completions.
 * If today is not yet completed, starts counting from yesterday.
 */
export function calculateCurrentStreak(
  executionDates: string[], // "YYYY-MM-DD" format
  recurrenceType: RecurrenceType,
  config: RecurrenceConfig
): number {
  if (recurrenceType === "weekly_count") {
    return calculateWeeklyCountStreak(executionDates, config);
  }

  const completedSet = new Set(executionDates);
  const today = new Date();
  let streak = 0;

  // Start from today. If today is expected but not completed, start from yesterday.
  let currentDate = today;
  const todayStr = format(today, "yyyy-MM-dd");

  if (
    isExpectedDay(today, recurrenceType, config) &&
    !completedSet.has(todayStr)
  ) {
    // Today not done yet — start from yesterday
    currentDate = subDays(today, 1);
  }

  // Walk backwards
  for (let i = 0; i < 365; i++) {
    const dateStr = format(currentDate, "yyyy-MM-dd");
    if (isExpectedDay(currentDate, recurrenceType, config)) {
      if (completedSet.has(dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    currentDate = subDays(currentDate, 1);
  }

  return streak;
}

/**
 * Calculate streak for weekly_count habits.
 * Checks consecutive weeks (Mon-Sun) where the target count was met.
 */
function calculateWeeklyCountStreak(
  executionDates: string[],
  config: RecurrenceConfig
): number {
  const target = config.recurrenceWeeklyCount ?? 1;
  const today = new Date();
  let streak = 0;

  // Build a map of week start → completion count
  const weekCompletions = new Map<string, number>();
  for (const dateStr of executionDates) {
    const date = new Date(dateStr + "T00:00:00");
    const weekStartStr = format(
      startOfWeek(date, { weekStartsOn: 1 }),
      "yyyy-MM-dd"
    );
    weekCompletions.set(
      weekStartStr,
      (weekCompletions.get(weekStartStr) ?? 0) + 1
    );
  }

  // Check current week first
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const currentWeekStartStr = format(currentWeekStart, "yyyy-MM-dd");
  const currentWeekCount = weekCompletions.get(currentWeekStartStr) ?? 0;

  // Current week counts if target is already met
  if (currentWeekCount >= target) {
    streak++;
  }

  // Walk backwards from previous week
  let checkWeek = addWeeks(currentWeekStart, -1);
  for (let i = 0; i < 52; i++) {
    const weekStr = format(checkWeek, "yyyy-MM-dd");
    const count = weekCompletions.get(weekStr) ?? 0;
    if (count >= target) {
      streak++;
    } else {
      // If current week didn't count and this is the first past week, still check
      if (i === 0 && currentWeekCount < target) {
        // Current week not met, so streak can still start from this past week
        if (count >= target) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    checkWeek = addWeeks(checkWeek, -1);
  }

  return streak;
}

/**
 * Calculate completion rates for 30, 60, and 90 day windows.
 * Returns percentages (0-100).
 */
export function calculateCompletionRates(
  executionDates: string[],
  recurrenceType: RecurrenceType,
  config: RecurrenceConfig,
  createdAt: Date
): { days30: number; days60: number; days90: number } {
  const today = new Date();
  const completedSet = new Set(executionDates);

  function rateForWindow(windowDays: number): number {
    const windowStart = subDays(today, windowDays - 1);
    // Don't count days before habit creation
    const effectiveStart = isBefore(windowStart, createdAt)
      ? createdAt
      : windowStart;

    if (isAfter(effectiveStart, today)) return 0;

    let expected = 0;
    let completed = 0;

    for (let i = 0; i <= differenceInDays(today, effectiveStart); i++) {
      const date = subDays(today, i);
      if (isBefore(date, effectiveStart)) break;

      if (recurrenceType === "weekly_count") {
        // For weekly_count, expected days = (weeks in window) * weeklyCount
        // Calculated differently below
        continue;
      }

      if (isExpectedDay(date, recurrenceType, config)) {
        expected++;
        const dateStr = format(date, "yyyy-MM-dd");
        if (completedSet.has(dateStr)) {
          completed++;
        }
      }
    }

    // Special handling for weekly_count
    if (recurrenceType === "weekly_count") {
      const target = config.recurrenceWeeklyCount ?? 1;
      // Count weeks in window
      const weeksInWindow = Math.ceil(
        differenceInDays(today, effectiveStart) / 7
      );
      expected = weeksInWindow * target;
      completed = executionDates.filter((d) => {
        const date = new Date(d + "T00:00:00");
        return !isBefore(date, effectiveStart) && !isAfter(date, today);
      }).length;
    }

    if (expected === 0) return 0;
    return Math.round((completed / expected) * 1000) / 10;
  }

  return {
    days30: rateForWindow(30),
    days60: rateForWindow(60),
    days90: rateForWindow(90),
  };
}
