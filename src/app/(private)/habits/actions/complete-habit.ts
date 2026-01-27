"use server";

import { db } from "@/db";
import { habit, habitRecurrence, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { completeHabitSchema } from "../schemas/habit-schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";
import { isActiveDay, type Recurrence } from "@/lib/utils/recurrence";
import { formatDateToString } from "@/lib/utils/date";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "@/lib/utils/streak";

/**
 * Complete a habit for a specific date
 * Validates that the date is an active day according to recurrence rules
 * Recalculates and updates streaks
 */
export const completeHabit = actionClient
  .inputSchema(completeHabitSchema)
  .action(async ({ parsedInput }) => {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const { habitId, completedDate } = parsedInput;

    // Verify ownership and get habit data
    const [habitData] = await db
      .select()
      .from(habit)
      .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
      .limit(1);

    if (!habitData) {
      throw new Error("Habit not found or you don't have permission to update it");
    }

    // Get recurrence configuration
    const [recurrenceData] = await db
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

    // Validate that completedDate is an active day
    const isActive = isActiveDay(completedDate, recurrence, habitData.createdAt);

    if (!isActive) {
      throw new Error(
        "This habit is not scheduled for this date according to its recurrence pattern"
      );
    }

    // Format date to YYYY-MM-DD string for database
    const completedDateStr = formatDateToString(completedDate);

    // Insert execution and update streaks in transaction
    const result = await db.transaction(async (tx) => {
      // Insert execution record (unique constraint will prevent duplicates)
      const executionId = randomUUID();

      try {
        const [execution] = await tx
          .insert(habitExecution)
          .values({
            id: executionId,
            habitId: habitId,
            completedAt: new Date(),
            completedDate: completedDateStr,
          })
          .returning();

        // Get all executions for streak calculation
        const allExecutions = await tx
          .select()
          .from(habitExecution)
          .where(eq(habitExecution.habitId, habitId));

        // Calculate new streaks
        const currentStreak = calculateCurrentStreak(
          habitData,
          allExecutions.map((e) => ({
            ...e,
            completedDate: e.completedDate,
          })),
          recurrence
        );

        const longestStreak = calculateLongestStreak(
          currentStreak,
          habitData.longestStreak
        );

        // Update habit with new streaks
        const [updatedHabit] = await tx
          .update(habit)
          .set({
            currentStreak,
            longestStreak,
            updatedAt: new Date(),
          })
          .where(eq(habit.id, habitId))
          .returning();

        return {
          execution,
          habit: updatedHabit,
        };
      } catch (error: unknown) {
        // Check if it's a unique constraint violation
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "23505"
        ) {
          throw new Error("This habit has already been completed for this date");
        }
        throw error;
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/habits");
    revalidatePath(`/habits/${habitId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
      message: `Habit completed! Current streak: ${result.habit.currentStreak}`,
    };
  });
