"use server";

import { db } from "@/db";
import { habit, habitRecurrence } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { createHabitSchema } from "../schemas/habit-schema";
import { getHabitCount } from "./get-habit-count";
import { randomUUID } from "crypto";

/**
 * Create a new habit with recurrence configuration
 * Enforces free tier limit (max 3 active habits)
 */
export const createHabit = actionClient
  .inputSchema(createHabitSchema)
  .action(async ({ parsedInput }) => {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Check free tier limit (3 active habits)
    const habitCount = await getHabitCount();

    if (habitCount >= 3) {
      // TODO: Add check for Pro plan when implemented
      throw new Error(
        "You have reached the maximum of 3 habits. Upgrade to Pro for unlimited habits."
      );
    }

    // Create habit and recurrence in transaction
    const result = await db.transaction(async (tx) => {
      const habitId = randomUUID();

      // Insert habit
      const [newHabit] = await tx
        .insert(habit)
        .values({
          id: habitId,
          userId: userId,
          name: parsedInput.name,
          description: parsedInput.description || null,
          isActive: true,
          currentStreak: 0,
          longestStreak: 0,
        })
        .returning();

      // Insert recurrence configuration
      const recurrenceId = randomUUID();

      const [newRecurrence] = await tx
        .insert(habitRecurrence)
        .values({
          id: recurrenceId,
          habitId: habitId,
          type: parsedInput.recurrence.type,
          intervalDays:
            parsedInput.recurrence.type === "daily"
              ? parsedInput.recurrence.intervalDays
              : null,
          weekdays:
            parsedInput.recurrence.type === "weekly"
              ? parsedInput.recurrence.weekdays
              : null,
          intervalMonths:
            parsedInput.recurrence.type === "monthly"
              ? parsedInput.recurrence.intervalMonths
              : null,
          intervalYears:
            parsedInput.recurrence.type === "annual"
              ? parsedInput.recurrence.intervalYears
              : null,
        })
        .returning();

      return {
        habit: newHabit,
        recurrence: newRecurrence,
      };
    });

    // Revalidate paths to update UI
    revalidatePath("/habits");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
    };
  });
