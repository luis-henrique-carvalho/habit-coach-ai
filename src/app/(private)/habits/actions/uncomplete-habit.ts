"use server";

import { db } from "@/db";
import { habit, habitRecurrence, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { uncompleteHabitSchema } from "../schemas/habit-schema";
import { eq, and } from "drizzle-orm";
import { formatDateToString } from "@/lib/utils/date";
import { calculateCurrentStreak } from "@/lib/utils/streak";
import type { Recurrence } from "@/lib/utils/recurrence";

/**
 * Remove a habit completion for a specific date
 * Recalculates and updates streaks after removal
 */
export const uncompleteHabit = actionClient
  .inputSchema(uncompleteHabitSchema)
  .action(async ({ parsedInput }) => {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const { habitId, completedDate } = parsedInput;

    // Verify ownership
    const [habitData] = await db
      .select()
      .from(habit)
      .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
      .limit(1);

    if (!habitData) {
      throw new Error("Habit not found or you don't have permission to update it");
    }

    // Format date to YYYY-MM-DD string for database
    const completedDateStr = formatDateToString(completedDate);

    // Delete execution and recalculate streaks in transaction
    const result = await db.transaction(async (tx) => {
      // Delete the execution record
      const deletedExecutions = await tx
        .delete(habitExecution)
        .where(
          and(
            eq(habitExecution.habitId, habitId),
            eq(habitExecution.completedDate, completedDateStr)
          )
        )
        .returning();

      if (deletedExecutions.length === 0) {
        throw new Error("No completion found for this date");
      }

      // Get recurrence configuration
      const [recurrenceData] = await tx
        .select()
        .from(habitRecurrence)
        .where(eq(habitRecurrence.habitId, habitId))
        .limit(1);

      if (!recurrenceData) {
        throw new Error("Habit recurrence configuration not found");
      }

      const recurrence: Recurrence = {
        type: recurrenceData.type,
        intervalDays: recurrenceData.intervalDays,
        weekdays: recurrenceData.weekdays,
        intervalMonths: recurrenceData.intervalMonths,
        intervalYears: recurrenceData.intervalYears,
      };

      // Get remaining executions for streak calculation
      const remainingExecutions = await tx
        .select()
        .from(habitExecution)
        .where(eq(habitExecution.habitId, habitId));

      // Recalculate streaks
      const currentStreak = calculateCurrentStreak(
        habitData,
        remainingExecutions.map((e) => ({
          ...e,
          completedDate: e.completedDate,
        })),
        recurrence
      );

      // Note: longestStreak is never decreased when uncompleting
      // We keep the existing longestStreak value

      // Update habit with new current streak
      const [updatedHabit] = await tx
        .update(habit)
        .set({
          currentStreak,
          updatedAt: new Date(),
        })
        .where(eq(habit.id, habitId))
        .returning();

      return {
        deletedExecution: deletedExecutions[0],
        habit: updatedHabit,
      };
    });

    // Revalidate paths to update UI
    revalidatePath("/habits");
    revalidatePath(`/habits/${habitId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
      message: `Completion removed. Current streak: ${result.habit.currentStreak}`,
    };
  });
