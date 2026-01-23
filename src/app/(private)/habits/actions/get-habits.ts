"use server";

import { db } from "@/db";
import { habit, habitRecurrence } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Get all habits for the current user
 * @param includeInactive - Whether to include archived/inactive habits (default: false)
 * @returns Array of habits with recurrence configuration and execution count
 */
export async function getHabits(includeInactive: boolean = false) {
  try {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Build query conditions
    const conditions = includeInactive
      ? [eq(habit.userId, userId)]
      : [eq(habit.userId, userId), eq(habit.isActive, true)];

    // Query habits with recurrence
    const habits = await db
      .select({
        id: habit.id,
        userId: habit.userId,
        name: habit.name,
        description: habit.description,
        isActive: habit.isActive,
        currentStreak: habit.currentStreak,
        longestStreak: habit.longestStreak,
        createdAt: habit.createdAt,
        updatedAt: habit.updatedAt,
        recurrence: {
          id: habitRecurrence.id,
          habitId: habitRecurrence.habitId,
          type: habitRecurrence.type,
          intervalDays: habitRecurrence.intervalDays,
          weekdays: habitRecurrence.weekdays,
          intervalMonths: habitRecurrence.intervalMonths,
          intervalYears: habitRecurrence.intervalYears,
          createdAt: habitRecurrence.createdAt,
          updatedAt: habitRecurrence.updatedAt,
        },
      })
      .from(habit)
      .leftJoin(habitRecurrence, eq(habit.id, habitRecurrence.habitId))
      .where(and(...conditions))
      .orderBy(desc(habit.createdAt));

    return habits;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
}
