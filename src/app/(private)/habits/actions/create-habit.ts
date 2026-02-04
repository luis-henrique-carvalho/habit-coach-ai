"use server";

import { actionClient } from "@/lib/safe-action";
import { createHabitSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, isNull } from "drizzle-orm";

export const createHabitAction = actionClient
  .inputSchema(createHabitSchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session || !session.user?.id) {
        return {
          success: false as const,
          error: {
            code: "UNAUTHORIZED" as const,
            message: "You must be authenticated to create a habit",
          },
        };
      }

      const userId = session.user.id;

      // Check free tier limit (max 3 active habits)
      // In a real app, this would check the user's subscription tier
      const activeHabits = await db
        .select({ id: habit.id })
        .from(habit)
        .where(
          and(
            eq(habit.userId, userId),
            isNull(habit.isActive) // Only count active habits - Note: schema has default true
          )
        );

      // For MVP, enforce free tier limit of 3 active habits
      // TODO: Check user's actual subscription tier
      if (activeHabits.length >= 3) {
        return {
          success: false as const,
          error: {
            code: "TIER_LIMIT_EXCEEDED" as const,
            message:
              "You have reached the maximum number of active habits for your plan. Upgrade to Pro for unlimited habits.",
          },
        };
      }

      // Create habit
      const habitId = crypto.randomUUID();
      const newHabit = {
        id: habitId,
        userId,
        name: parsedInput.name,
        description: parsedInput.description || null,
        isActive: true,
        currentStreak: 0,
        longestStreak: 0,
        recurrenceType: parsedInput.recurrenceType as "daily" | "weekly" | "weekly_count",
        recurrenceInterval: parsedInput.recurrenceInterval || 1,
        recurrenceWeekdays: parsedInput.recurrenceWeekdays || null,
        recurrenceWeeklyCount: parsedInput.recurrenceWeeklyCount || null,
        preferredTime: parsedInput.preferredTime || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.insert(habit).values(newHabit);

      return {
        success: true as const,
        data: newHabit,
      };
    } catch (error) {
      console.error("Error creating habit:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to create habit. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
