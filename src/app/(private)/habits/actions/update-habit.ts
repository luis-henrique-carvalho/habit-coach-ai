"use server";

import { actionClient } from "@/lib/safe-action";
import { updateHabitSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

// Add habitId to the update schema
const updateHabitWithIdSchema = updateHabitSchema.extend({
  habitId: z.string().min(1, "Habit ID is required"),
});

export const updateHabitAction = actionClient
  .schema(updateHabitWithIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      // Get authenticated user
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session || !session.user?.id) {
        return {
          success: false as const,
          error: {
            code: "UNAUTHORIZED" as const,
            message: "You must be authenticated to update a habit",
          },
        };
      }

      const userId = session.user.id;
      const { habitId, ...updateData } = parsedInput;

      // Fetch the habit to verify ownership and state
      const existingHabit = await db
        .select()
        .from(habit)
        .where(eq(habit.id, habitId))
        .limit(1);

      if (existingHabit.length === 0) {
        return {
          success: false as const,
          error: {
            code: "NOT_FOUND" as const,
            message: "Habit not found",
          },
        };
      }

      const currentHabit = existingHabit[0];

      // Verify ownership
      if (currentHabit.userId !== userId) {
        return {
          success: false as const,
          error: {
            code: "UNAUTHORIZED" as const,
            message: "You do not have permission to update this habit",
          },
        };
      }

      // Cannot edit archived habits
      if (!currentHabit.isActive) {
        return {
          success: false as const,
          error: {
            code: "ARCHIVED" as const,
            message:
              "Cannot edit an archived habit. Please restore it first.",
          },
        };
      }

      // Check if name is being changed and if it conflicts
      if (
        updateData.name &&
        updateData.name !== currentHabit.name
      ) {
        const conflictingHabit = await db
          .select({ id: habit.id })
          .from(habit)
          .where(
            and(
              eq(habit.userId, userId),
              eq(habit.name, updateData.name),
              eq(habit.isActive, true)
            )
          )
          .limit(1);

        if (conflictingHabit.length > 0) {
          return {
            success: false as const,
            error: {
              code: "ALREADY_EXISTS" as const,
              message: "You already have an active habit with this name",
            },
          };
        }
      }

      // Prepare update object
      const updatePayload: Record<string, any> = {
        ...updateData,
        updatedAt: new Date(),
      };

      // Update the habit
      await db
        .update(habit)
        .set(updatePayload)
        .where(eq(habit.id, habitId));

      // Fetch and return updated habit
      const updatedHabit = await db
        .select()
        .from(habit)
        .where(eq(habit.id, habitId))
        .limit(1);

      return {
        success: true as const,
        data: updatedHabit[0],
      };
    } catch (error) {
      console.error("Error updating habit:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to update habit. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
