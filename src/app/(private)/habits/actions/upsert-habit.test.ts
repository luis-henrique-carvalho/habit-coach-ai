import { describe, it, expect, vi, beforeEach } from 'vitest';
import { upsertHabitAction } from './upsert-habit';
import { db } from '@/db';
import { user, habit } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

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

describe('upsertHabitAction', () => {
  const TEST_USER_ID = 'test-user-id';

  beforeEach(async () => {
    // Create a test user
    await db.insert(user).values({
      id: TEST_USER_ID,
      name: 'Test User',
      email: 'test@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mock session for this user
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: TEST_USER_ID,
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: 'session-id',
        userId: TEST_USER_ID,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        token: 'token',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });

  it('should create a new habit successfully', async () => {
    const input = {
      name: 'Morning Meditation',
      description: '10 minutes of mindfulness',
      recurrenceType: 'daily' as const,
    };

    const result = await upsertHabitAction(input);

    expect(result?.data?.success).toBe(true);
    const newHabitId = result?.data?.success ? result.data.data.id : undefined;
    expect(newHabitId).toBeDefined();

    // Verify DB insertion
    const [insertedHabit] = await db
      .select()
      .from(habit)
      .where(eq(habit.id, newHabitId!));

    expect(insertedHabit).toBeDefined();
    expect(insertedHabit.name).toBe(input.name);
    expect(insertedHabit.userId).toBe(TEST_USER_ID);
  });

  it('should update an existing habit successfully', async () => {
    const habitId = 'existing-habit-id';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Old Name',
      recurrenceType: 'daily',
      isActive: true,
    });

    const input = {
      id: habitId,
      name: 'New Name',
      recurrenceType: 'daily' as const,
    };

    const result = await upsertHabitAction(input);

    expect(result?.data?.success).toBe(true);

    const [updatedHabit] = await db
      .select()
      .from(habit)
      .where(eq(habit.id, habitId));

    expect(updatedHabit.name).toBe('New Name');
  });

  it('should return error if not authenticated', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);

    const input = {
      name: 'Unauth Habit',
      recurrenceType: 'daily' as const,
    };

    const result = await upsertHabitAction(input);

    expect(result?.data?.success).toBe(false);
    if (result?.data && !result.data.success) {
      expect(result.data.error.code).toBe('UNAUTHORIZED');
    }
  });

  it('should fail if user tries to update another user habit', async () => {
    const otherUserId = 'other-user-id';
    await db.insert(user).values({
      id: otherUserId,
      name: 'Other User',
      email: 'other@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const otherHabitId = 'other-habit-id';
    await db.insert(habit).values({
      id: otherHabitId,
      userId: otherUserId,
      name: 'Other Habit',
      recurrenceType: 'daily',
      isActive: true,
    });

    const input = {
      id: otherHabitId,
      name: 'Attempted Hack',
      recurrenceType: 'daily' as const,
    };

    const result = await upsertHabitAction(input);

    expect(result?.data?.success).toBe(false);
    if (result?.data && !result.data.success) {
      expect(result.data.error.code).toBe('NOT_FOUND');
    }
  });
});
