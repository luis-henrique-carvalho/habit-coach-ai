import { describe, it, expect } from 'vitest';
import { isExpectedDay, generateHeatmapCells } from './habit-heatmap-utils';
import { format, subDays, startOfWeek } from 'date-fns';

describe('habit-heatmap-utils', () => {
  describe('isExpectedDay', () => {
    it('should return true for daily recurrence', () => {
      expect(isExpectedDay(1, 'daily')).toBe(true);
      expect(isExpectedDay(0, 'daily')).toBe(true);
    });

    it('should return true/false for weekly recurrence based on weekdays', () => {
      expect(isExpectedDay(1, 'weekly', [1, 3, 5])).toBe(true);
      expect(isExpectedDay(2, 'weekly', [1, 3, 5])).toBe(false);
    });

    it('should return true for weekly_count recurrence', () => {
      expect(isExpectedDay(1, 'weekly_count')).toBe(true);
    });
  });

  describe('generateHeatmapCells', () => {
    const today = new Date('2024-03-20');
    const createdAt = new Date('2024-03-10');

    it('should correctly mark completed days', () => {
      const executions = [{ completedDate: '2024-03-15' }];
      const cells = generateHeatmapCells(executions, 'daily', [], createdAt, today);

      const cell = cells.find((c) => c.dateStr === '2024-03-15');
      expect(cell?.status).toBe('completed');
    });

    it('should mark missed days if expected and not completed', () => {
      const executions: { completedDate: string }[] = [];
      const cells = generateHeatmapCells(executions, 'daily', [], createdAt, today);

      const cell = cells.find((c) => c.dateStr === '2024-03-15');
      expect(cell?.status).toBe('missed');
    });

    it('should mark not-expected if before creation date', () => {
      const executions: { completedDate: string }[] = [];
      const cells = generateHeatmapCells(executions, 'daily', [], createdAt, today);

      const cell = cells.find((c) => c.dateStr === '2024-03-05');
      expect(cell?.status).toBe('not-expected');
    });

    it('should align to the start of the week (Monday)', () => {
      const cells = generateHeatmapCells([], 'daily', [], createdAt, today);
      
      const ninetyDaysAgo = subDays(today, 89);
      const gridStart = startOfWeek(ninetyDaysAgo, { weekStartsOn: 1 });
      
      expect(cells[0].dateStr).toBe(format(gridStart, 'yyyy-MM-dd'));
      expect(cells[0].dayOfWeek).toBe(1); // Monday
    });
  });
});
