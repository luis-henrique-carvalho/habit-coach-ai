/**
 * Recurrence utility functions for determining active days
 */

import {
  normalizeDateToMidnight,
  getDayOfWeek,
  addDays,
  daysBetween,
} from "./date";

export type RecurrenceType = "daily" | "weekly" | "monthly" | "annual";

export interface Recurrence {
  type: RecurrenceType;
  intervalDays?: number | null;
  weekdays?: number[] | null;
  intervalMonths?: number | null;
  intervalYears?: number | null;
}

/**
 * Check if a given date is an active day for the habit based on its recurrence configuration
 * @param date - The date to check
 * @param recurrence - The recurrence configuration
 * @param habitCreatedAt - When the habit was created (used for interval calculations)
 * @returns true if the habit should be active on this date
 */
export function isActiveDay(
  date: Date,
  recurrence: Recurrence,
  habitCreatedAt: Date
): boolean {
  const normalizedDate = normalizeDateToMidnight(date);
  const normalizedCreatedAt = normalizeDateToMidnight(habitCreatedAt);

  switch (recurrence.type) {
    case "daily":
      return isDailyActiveDay(
        normalizedDate,
        normalizedCreatedAt,
        recurrence.intervalDays ?? 1
      );

    case "weekly":
      return isWeeklyActiveDay(normalizedDate, recurrence.weekdays ?? []);

    case "monthly":
      return isMonthlyActiveDay(
        normalizedDate,
        normalizedCreatedAt,
        recurrence.intervalMonths ?? 1
      );

    case "annual":
      return isAnnualActiveDay(
        normalizedDate,
        normalizedCreatedAt,
        recurrence.intervalYears ?? 1
      );

    default:
      return false;
  }
}

/**
 * Check if a date is active for daily recurrence
 * @param date - The date to check
 * @param startDate - The start date (habit creation date)
 * @param intervalDays - Interval in days (e.g., 1 = every day, 2 = every other day)
 */
function isDailyActiveDay(
  date: Date,
  startDate: Date,
  intervalDays: number
): boolean {
  // Date must be on or after start date
  if (date < startDate) return false;

  // Calculate days since start
  const daysSinceStart = daysBetween(startDate, date);

  // Check if it falls on the interval
  return daysSinceStart % intervalDays === 0;
}

/**
 * Check if a date is active for weekly recurrence
 * @param date - The date to check
 * @param weekdays - Array of active weekdays (0 = Sunday, 6 = Saturday)
 */
function isWeeklyActiveDay(date: Date, weekdays: number[]): boolean {
  if (!weekdays || weekdays.length === 0) return false;

  const dayOfWeek = getDayOfWeek(date);
  return weekdays.includes(dayOfWeek);
}

/**
 * Check if a date is active for monthly recurrence
 * @param date - The date to check
 * @param startDate - The start date (habit creation date)
 * @param intervalMonths - Interval in months (e.g., 1 = every month, 2 = every other month)
 */
function isMonthlyActiveDay(
  date: Date,
  startDate: Date,
  intervalMonths: number
): boolean {
  // Date must be on or after start date
  if (date < startDate) return false;

  // Must be the same day of month
  if (date.getDate() !== startDate.getDate()) return false;

  // Calculate months since start
  const monthsSinceStart =
    (date.getFullYear() - startDate.getFullYear()) * 12 +
    (date.getMonth() - startDate.getMonth());

  // Check if it falls on the interval
  return monthsSinceStart % intervalMonths === 0;
}

/**
 * Check if a date is active for annual recurrence
 * @param date - The date to check
 * @param startDate - The start date (habit creation date)
 * @param intervalYears - Interval in years (e.g., 1 = every year, 2 = every other year)
 */
function isAnnualActiveDay(
  date: Date,
  startDate: Date,
  intervalYears: number
): boolean {
  // Date must be on or after start date
  if (date < startDate) return false;

  // Must be the same month and day
  if (
    date.getMonth() !== startDate.getMonth() ||
    date.getDate() !== startDate.getDate()
  ) {
    return false;
  }

  // Calculate years since start
  const yearsSinceStart = date.getFullYear() - startDate.getFullYear();

  // Check if it falls on the interval
  return yearsSinceStart % intervalYears === 0;
}

/**
 * Get the next active date after a given date
 * Useful for UI hints and scheduling
 */
export function getNextActiveDate(
  afterDate: Date,
  recurrence: Recurrence,
  habitCreatedAt: Date
): Date | null {
  const normalizedAfterDate = normalizeDateToMidnight(afterDate);
  let checkDate = addDays(normalizedAfterDate, 1);

  // Limit search to 365 days to prevent infinite loops
  const maxDays = 365;
  for (let i = 0; i < maxDays; i++) {
    if (isActiveDay(checkDate, recurrence, habitCreatedAt)) {
      return checkDate;
    }
    checkDate = addDays(checkDate, 1);
  }

  return null; // No active date found within 365 days
}

/**
 * Get all active dates in a date range
 * Useful for calendar visualizations
 */
export function getActiveDatesInRange(
  startDate: Date,
  endDate: Date,
  recurrence: Recurrence,
  habitCreatedAt: Date
): Date[] {
  const activeDates: Date[] = [];
  let currentDate = normalizeDateToMidnight(startDate);
  const normalizedEndDate = normalizeDateToMidnight(endDate);

  while (currentDate <= normalizedEndDate) {
    if (isActiveDay(currentDate, recurrence, habitCreatedAt)) {
      activeDates.push(new Date(currentDate));
    }
    currentDate = addDays(currentDate, 1);
  }

  return activeDates;
}
