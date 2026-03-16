export interface CreateHabitOptions {
  description?: string;
  recurrenceType?: 'daily' | 'weekly' | 'weekly_count';
  weekdays?: string[];
  weeklyCount?: number;
  preferredTime?: string;
}
