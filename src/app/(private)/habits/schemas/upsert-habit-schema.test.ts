import { describe, it, expect } from 'vitest';
import { upsertHabitSchema } from './upsert-habit-schema';

describe('upsertHabitSchema', () => {
  it('should validate a valid daily habit', () => {
    const validDailyHabit = {
      name: 'Exercise',
      description: 'Go to the gym',
      recurrenceType: 'daily',
      preferredTime: '08:00',
    };

    const result = upsertHabitSchema.safeParse(validDailyHabit);
    expect(result.success).toBe(true);
  });

  it('should validate a valid weekly habit with weekdays', () => {
    const validWeeklyHabit = {
      name: 'Reading',
      recurrenceType: 'weekly',
      recurrenceWeekdays: [1, 3, 5], // Mon, Wed, Fri
    };

    const result = upsertHabitSchema.safeParse(validWeeklyHabit);
    expect(result.success).toBe(true);
  });

  it('should validate a valid weekly_count habit', () => {
    const validWeeklyCountHabit = {
      name: 'Meditation',
      recurrenceType: 'weekly_count',
      recurrenceWeeklyCount: 3,
    };

    const result = upsertHabitSchema.safeParse(validWeeklyCountHabit);
    expect(result.success).toBe(true);
  });

  it('should fail if name is missing', () => {
    const invalidHabit = {
      recurrenceType: 'daily',
    };

    const result = upsertHabitSchema.safeParse(invalidHabit);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome é obrigatório');
    }
  });

  it('should fail if name is too long', () => {
    const invalidHabit = {
      name: 'a'.repeat(101),
      recurrenceType: 'daily',
    };

    const result = upsertHabitSchema.safeParse(invalidHabit);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome deve ter no máximo 100 caracteres');
    }
  });

  it('should fail if recurrenceType is weekly but no weekdays are selected', () => {
    const invalidHabit = {
      name: 'Reading',
      recurrenceType: 'weekly',
      recurrenceWeekdays: [],
    };

    const result = upsertHabitSchema.safeParse(invalidHabit);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Selecione pelo menos um dia da semana');
    }
  });

  it('should fail if recurrenceType is weekly_count but no count is provided', () => {
    const invalidHabit = {
      name: 'Meditation',
      recurrenceType: 'weekly_count',
    };

    const result = upsertHabitSchema.safeParse(invalidHabit);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Informe um valor entre 1 e 7');
    }
  });

  it('should fail if preferredTime has an invalid format', () => {
    const invalidHabit = {
      name: 'Exercise',
      recurrenceType: 'daily',
      preferredTime: '8:00', // Missing leading zero
    };

    const result = upsertHabitSchema.safeParse(invalidHabit);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Formato de hora inválido (HH:mm)');
    }
  });
});
