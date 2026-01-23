"use server";

import { db } from "@/db";
import { habit, habitRecurrence, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { updateHabitSchema } from "../schemas/habit-schema";
import { eq, and } from "drizzle-orm";
import { calculateCurrentStreak, calculateLongestStreak } from "@/lib/utils/streak";
import type { Recurrence } from "@/lib/utils/recurrence";

/**
 * Update an existing habit
 * If recurrence is changed, recalculates the current streak
 */
export const updateHabit = actionClient
  .inputSchema(updateHabitSchema)
  .action(async ({ parsedInput }) => {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const { habitId, name, description, recurrence } = parsedInput;

    // Verify ownership
    const [existingHabit] = await db
      .select()
      .from(habit)
      .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
      .limit(1);

    if (!existingHabit) {
      throw new Error("Habit not found or you don't have permission to update it");
    }

    // Update habit and recurrence in transaction
    const result = await db.transaction(async (tx) => {
      // Update habit fields if provided
      const updateData: {
        name?: string;
        description?: string | null;
        currentStreak?: number;
        longestStreak?: number;
        updatedAt: Date;
      } = {
        updatedAt: new Date(),
      };

      if (name !== undefined) {
        updateData.name = name;
      }

      if (description !== undefined) {
        updateData.description = description;
      }

      const [updatedHabit] = await tx
        .update(habit)
        .set(updateData)
        .where(eq(habit.id, habitId))
        .returning();

      let updatedRecurrence = null;

      // Update recurrence if provided
      if (recurrence) {
        [updatedRecurrence] = await tx
          .update(habitRecurrence)
          .set({
            type: recurrence.type,
            intervalDays:
              recurrence.type === "daily" ? recurrence.intervalDays : null,
            weekdays:
              recurrence.type === "weekly" ? recurrence.weekdays : null,
            intervalMonths:
              recurrence.type === "monthly" ? recurrence.intervalMonths : null,
            intervalYears:
              recurrence.type === "annual" ? recurrence.intervalYears : null,
            updatedAt: new Date(),
          })
          .where(eq(habitRecurrence.habitId, habitId))
          .returning();

        // Recalculate streaks if recurrence changed
        // Get all executions for this habit
        const executions = await tx
          .select()
          .from(habitExecution)
          .where(eq(habitExecution.habitId, habitId));

        const recurrenceConfig: Recurrence = {
          type: recurrence.type,
          intervalDays:
            recurrence.type === "daily" ? recurrence.intervalDays : null,
          weekdays:
            recurrence.type === "weekly" ? recurrence.weekdays : null,
          intervalMonths:
            recurrence.type === "monthly" ? recurrence.intervalMonths : null,
          intervalYears:
            recurrence.type === "annual" ? recurrence.intervalYears : null,
        };

        const currentStreak = calculateCurrentStreak(
          updatedHabit,
          executions.map((e) => ({
            ...e,
            completedDate: e.completedDate,
          })),
          recurrenceConfig
        );

        const longestStreak = calculateLongestStreak(
          currentStreak,
          updatedHabit.longestStreak
        );

        // Update streaks
        await tx
          .update(habit)
          .set({
            currentStreak,
            longestStreak,
          })
          .where(eq(habit.id, habitId));

        updatedHabit.currentStreak = currentStreak;
        updatedHabit.longestStreak = longestStreak;
      }

      return {
        habit: updatedHabit,
        recurrence: updatedRecurrence,
      };
    });

    // Revalidate paths to update UI
    revalidatePath("/habits");
    revalidatePath(`/habits/${habitId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
    };
  });
