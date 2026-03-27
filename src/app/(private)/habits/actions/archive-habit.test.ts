import { describe, it, expect, vi, beforeEach } from 'vitest';
import { archiveHabitAction } from './archive-habit';
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

describe('archiveHabitAction', () => {
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

  it('should archive a habit successfully', async () => {
    const habitId = 'habit-to-archive';
    await db.insert(habit).values({
      id: habitId,
      userId: TEST_USER_ID,
      name: 'Old Habit',
      recurrenceType: 'daily',
      isActive: true,
    });

    const result = await archiveHabitAction({ id: habitId });

    expect(result?.data?.success).toBe(true);

    const [archivedHabit] = await db
      .select()
      .from(habit)
      .where(eq(habit.id, habitId));

    expect(archivedHabit.isActive).toBe(false);
  });

  it('should fail if habit belongs to another user', async () => {
    const otherUserId = 'other-user';
    await db.insert(user).values({
      id: otherUserId,
      name: 'Other User',
      email: 'other@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const otherHabitId = 'other-habit';
    await db.insert(habit).values({
      id: otherHabitId,
      userId: otherUserId,
      name: 'Other Habit',
      recurrenceType: 'daily',
      isActive: true,
    });

    const result = await archiveHabitAction({ id: otherHabitId });

    expect(result?.data?.success).toBe(false);
    if (result?.data && !result.data.success) {
      expect(result.data.error.code).toBe('NOT_FOUND');
    }

    // Verify it was NOT archived
    const [notArchivedHabit] = await db
      .select()
      .from(habit)
      .where(eq(habit.id, otherHabitId));

    expect(notArchivedHabit.isActive).toBe(true);
  });
});
