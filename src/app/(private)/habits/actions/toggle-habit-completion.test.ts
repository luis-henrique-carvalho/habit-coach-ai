import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toggleHabitCompletionAction } from './toggle-habit-completion';
import { db } from '@/db';
import { user, habit, habitExecution } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { format, subDays, addDays } from 'date-fns';

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Headers()),
}));

// Mock better-auth session
vi.mock('@/lib/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/auth')>();
  return {
    ...actual,
    auth: {
      ...actual.auth,
      api: {
        ...actual.auth.api,
        getSession: vi.fn(),
      },
    },
  };
});

// Mock revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('toggleHabitCompletionAction', () => {
  const TEST_USER_ID = 'user-a';

  beforeEach(async () => {
    // Create test user
    await db.insert(user).values({
      id: TEST_USER_ID,
      name: 'User A',
      email: 'a@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mock session
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: TEST_USER_ID,
        email: 'a@example.com',
        name: 'User A',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: 'session-a',
        userId: TEST_USER_ID,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        token: 'token-a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });

  it('should mark a habit as completed if it was not', async () => {
    const habitId = 'habit-1';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Daily Yoga',
      recurrenceType: 'daily',
      isActive: true,
    });

    const dateStr = format(new Date(), 'yyyy-MM-dd');
    const result = await toggleHabitCompletionAction({ habitId, date: dateStr });

    expect(result?.data?.success).toBe(true);
    if (result?.data?.success) {
      expect(result.data.data.completed).toBe(true);
    }

    const execs = await db
      .select()
      .from(habitExecution)
      .where(and(eq(habitExecution.habitId, habitId), eq(habitExecution.completedDate, dateStr)));

    expect(execs).toHaveLength(1);
  });

  it('should unmark a habit as completed if it was already completed', async () => {
    const habitId = 'habit-1';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Daily Yoga',
      recurrenceType: 'daily',
      isActive: true,
    });

    const dateStr = format(new Date(), 'yyyy-MM-dd');
    await db.insert(habitExecution).values({
      id: 'exec-1',
      habitId,
      completedAt: new Date(),
      completedDate: dateStr,
    });

    const result = await toggleHabitCompletionAction({ habitId, date: dateStr });

    expect(result?.data?.success).toBe(true);
    if (result?.data?.success) {
      expect(result.data.data.completed).toBe(false);
    }

    const execs = await db
      .select()
      .from(habitExecution)
      .where(and(eq(habitExecution.habitId, habitId), eq(habitExecution.completedDate, dateStr)));

    expect(execs).toHaveLength(0);
  });

  it('should fail for future dates', async () => {
    const habitId = 'habit-1';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Future Yoga',
      recurrenceType: 'daily',
      isActive: true,
    });

    const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    const result = await toggleHabitCompletionAction({ habitId, date: tomorrowStr });

    expect(result?.data?.success).toBe(false);
    if (result?.data && !result.data.success) {
      expect(result.data.error.code).toBe('INVALID_DATE');
    }
  });

  it('should fail for dates older than 7 days', async () => {
    const habitId = 'habit-1';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Old Yoga',
      recurrenceType: 'daily',
      isActive: true,
    });

    const tenDaysAgoStr = format(subDays(new Date(), 10), 'yyyy-MM-dd');
    const result = await toggleHabitCompletionAction({ habitId, date: tenDaysAgoStr });

    expect(result?.data?.success).toBe(false);
    if (result?.data && !result.data.success) {
      expect(result.data.error.code).toBe('INVALID_DATE');
    }
  });
});
