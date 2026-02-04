"use server";

import { actionClient } from "@/lib/safe-action";
import { markHabitCompleteSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { formatDate } from "@/lib/utils/streak-calculator";

export const markHabitCompleteAction = actionClient
  .schema(markHabitCompleteSchema)
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
            message: "You must be authenticated to mark a habit complete",
          },
        };
      }

      const userId = session.user.id;
      const { habitId } = parsedInput;

      // Determine completion date
      let completedDate = parsedInput.completedDate;
      if (!completedDate) {
        completedDate = formatDate(new Date());
      }

      // Validate date is not in future
      const dateObj = new Date(completedDate + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateObj > today) {
        return {
          success: false as const,
          error: {
            code: "INVALID_DATE" as const,
            message: "Cannot mark habit complete for future dates",
          },
        };
      }

      // Validate backdate is within 7 days
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      if (dateObj < sevenDaysAgo) {
        return {
          success: false as const,
          error: {
            code: "INVALID_DATE" as const,
            message: "Cannot backdate completion more than 7 days",
          },
        };
      }

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
            message: "You do not have permission to mark this habit complete",
          },
        };
      }

      // Insert or ignore (idempotent due to unique constraint)
      const executionId = crypto.randomUUID();
      const completedAt = new Date();

      try {
        await db.insert(habitExecution).values({
          id: executionId,
          habitId,
          completedDate,
          completedAt,
          createdAt: completedAt,
        });
      } catch (error) {
        // If duplicate, that's fine - it means it's already marked
        // Check if the duplicate constraint error occurred
        if (
          error instanceof Error &&
          error.message.includes("unique constraint")
        ) {
          // Idempotent - return success
          return {
            success: true as const,
            data: {
              habitId,
              completedDate,
              message: "Habit already marked complete for this date",
            },
          };
        }
        throw error;
      }

      return {
        success: true as const,
        data: {
          habitId,
          completedDate,
          message: "Habit marked complete successfully",
        },
      };
    } catch (error) {
      console.error("Error marking habit complete:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to mark habit complete. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
