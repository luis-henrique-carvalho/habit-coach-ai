"use server";

import { db } from "@/db";
import { habit, habitRecurrence, habitExecution } from "@/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { subtractDays } from "@/lib/utils/date";

/**
 * Get a single habit by ID with full details
 * Includes recurrence configuration and last 90 days of executions
 *
 * @param habitId - The ID of the habit to fetch
 * @returns The habit with full details or null if not found
 */
export async function getHabitById(habitId: string) {
  try {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Query the habit
    const [habitData] = await db
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
      })
      .from(habit)
      .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
      .limit(1);

    // Return null if habit not found or doesn't belong to user
    if (!habitData) {
      return null;
    }

    // Query recurrence configuration
    const [recurrenceData] = await db
      .select()
      .from(habitRecurrence)
      .where(eq(habitRecurrence.habitId, habitId))
      .limit(1);

    // Query last 90 days of executions
    const ninetyDaysAgo = subtractDays(new Date(), 90);
    const ninetyDaysAgoStr = ninetyDaysAgo.toISOString().split("T")[0]; // YYYY-MM-DD

    const executions = await db
      .select()
      .from(habitExecution)
      .where(
        and(
          eq(habitExecution.habitId, habitId),
          gte(habitExecution.completedDate, ninetyDaysAgoStr)
        )
      )
      .orderBy(desc(habitExecution.completedDate));

    return {
      ...habitData,
      recurrence: recurrenceData || null,
      executions: executions || [],
    };
  } catch (error) {
    console.error("Error fetching habit by ID:", error);
    throw error;
  }
}
