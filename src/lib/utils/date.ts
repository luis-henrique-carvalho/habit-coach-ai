/**
 * Date utility functions for habit management
 */

/**
 * Check if two dates are the same day (ignoring time)
 */
export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Subtract days from a date and return new date
 */
export function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

/**
 * Add days to a date and return new date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Check if a date is within N days from today (past or future)
 */
export function isWithinDays(date: Date, days: number): boolean {
  const today = normalizeDateToMidnight(new Date());
  const normalizedDate = normalizeDateToMidnight(date);
  const diffMs = Math.abs(normalizedDate.getTime() - today.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays <= days;
}

/**
 * Normalize date to midnight (00:00:00.000)
 * Useful for date-only comparisons
 */
export function normalizeDateToMidnight(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * Format date to YYYY-MM-DD string
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to Date
 */
export function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Get the previous day
 */
export function previousDay(date: Date): Date {
  return subtractDays(date, 1);
}

/**
 * Get the next day
 */
export function nextDay(date: Date): Date {
  return addDays(date, 1);
}

/**
 * Get the number of days between two dates (ignoring time)
 */
export function daysBetween(date1: Date, date2: Date): number {
  const normalized1 = normalizeDateToMidnight(date1);
  const normalized2 = normalizeDateToMidnight(date2);
  const diffMs = normalized2.getTime() - normalized1.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
