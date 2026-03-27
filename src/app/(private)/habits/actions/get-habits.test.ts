import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getHabitsAction } from './get-habits';
import { db } from '@/db';
import { user, habit, habitExecution } from '@/db/schema';
import { auth } from '@/lib/auth';
import { format } from 'date-fns';

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

describe('getHabitsAction', () => {
  const TEST_USER_ID = 'user-a';
  const OTHER_USER_ID = 'user-b';

  beforeEach(async () => {
    // Create test users
    await db.insert(user).values([
      {
        id: TEST_USER_ID,
        name: 'User A',
        email: 'a@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: OTHER_USER_ID,
        name: 'User B',
        email: 'b@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Mock session for User A
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

  it('should return only habits belonging to the authenticated user', async () => {
    // Habit for User A
    await db.insert(habit).values({
      id: 'habit-a',
      userId: TEST_USER_ID,
      name: 'User A Habit',
      recurrenceType: 'daily',
    });

    // Habit for User B
    await db.insert(habit).values({
      id: 'habit-b',
      userId: OTHER_USER_ID,
      name: 'User B Habit',
      recurrenceType: 'daily',
    });

    const result = await getHabitsAction({});

    expect(result.success).toBe(true);
    if (result.success && result.data) {
      expect(result.data.habits).toHaveLength(1);
      expect(result.data.habits[0].name).toBe('User A Habit');
      expect(result.data.total).toBe(1);
    }
  });

  it('should correctly identify habits completed today', async () => {
    const habitId = 'habit-completed';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Completed Habit',
      recurrenceType: 'daily',
    });

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    await db.insert(habitExecution).values({
      id: 'exec-1',
      habitId: habitId,
      completedAt: new Date(),
      completedDate: todayStr,
    });

    const result = await getHabitsAction({});

    expect(result.success).toBe(true);
    if (result.success && result.data) {
      const h = result.data.habits.find((h) => h.id === habitId);
      expect(h?.completedToday).toBe(true);
    }
  });

  it('should filter habits by name query', async () => {
    await db.insert(habit).values([
      {
        id: 'h1',
        userId: TEST_USER_ID,
        name: 'Drink Water',
        recurrenceType: 'daily',
      },
      {
        id: 'h2',
        userId: TEST_USER_ID,
        name: 'Read Book',
        recurrenceType: 'daily',
      },
    ]);

    const result = await getHabitsAction({ query: 'water' });

    expect(result.success).toBe(true);
    if (result.success && result.data) {
      expect(result.data.habits).toHaveLength(1);
      expect(result.data.habits[0].name).toBe('Drink Water');
    }
  });

  it('should support pagination', async () => {
    // Create 15 habits
    const habitsToInsert = Array.from({ length: 15 }).map((_, i) => ({
      id: `h-${i}`,
      userId: TEST_USER_ID,
      name: `Habit ${i}`,
      recurrenceType: 'daily' as const,
      createdAt: new Date(Date.now() - i * 1000), // Ensure deterministic order
    }));
    await db.insert(habit).values(habitsToInsert);

    const result = await getHabitsAction({ page: '2', limit: '10' });

    expect(result.success).toBe(true);
    if (result.success && result.data) {
      expect(result.data.habits).toHaveLength(5);
      expect(result.data.currentPage).toBe(2);
      expect(result.data.totalPages).toBe(2);
      expect(result.data.total).toBe(15);
    }
  });

  describe('status filtering', () => {
    beforeEach(async () => {
      // Habit 1: Active
      await db.insert(habit).values({
        id: 'h-active',
        userId: TEST_USER_ID,
        name: 'Active Habit',
        recurrenceType: 'daily',
        isActive: true,
      });

      // Habit 2: Archived
      await db.insert(habit).values({
        id: 'h-archived',
        userId: TEST_USER_ID,
        name: 'Archived Habit',
        recurrenceType: 'daily',
        isActive: false,
      });
    });

    it('should return all habits when status is "all"', async () => {
      const result = await getHabitsAction({ status: 'all' });
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.habits).toHaveLength(2);
      }
    });

    it('should return only active habits when status is "active"', async () => {
      const result = await getHabitsAction({ status: 'active' });
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.habits).toHaveLength(1);
        expect(result.data.habits[0].id).toBe('h-active');
      }
    });

    it('should return only archived habits when status is "archived"', async () => {
      const result = await getHabitsAction({ status: 'archived' });
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data.habits).toHaveLength(1);
        expect(result.data.habits[0].id).toBe('h-archived');
      }
    });
  });
});
