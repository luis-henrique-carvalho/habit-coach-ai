"use server";

import { actionClient } from "@/lib/safe-action";
import { archiveHabitSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export const archiveHabitAction = actionClient
  .schema(archiveHabitSchema)
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
            message: "You must be authenticated to archive a habit",
          },
        };
      }

      const userId = session.user.id;
      const { habitId } = parsedInput;

      // Fetch the habit to verify ownership
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
            message: "You do not have permission to archive this habit",
          },
        };
      }

      // Archive the habit by setting isActive to false
      // This preserves all historical data
      await db
        .update(habit)
        .set({
          isActive: false,
          updatedAt: new Date(),
        })
        .where(eq(habit.id, habitId));

      return {
        success: true as const,
        data: {
          habitId,
          archived: true,
          message: "Habit archived successfully",
        },
      };
    } catch (error) {
      console.error("Error archiving habit:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to archive habit. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
