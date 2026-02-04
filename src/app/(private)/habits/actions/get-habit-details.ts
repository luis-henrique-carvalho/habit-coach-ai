"use server";

import { actionClient } from "@/lib/safe-action";
import { getHabitDetailsSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import {
  calculateStreak,
  calculateCompletionRate,
  formatDate,
} from "@/lib/utils/streak-calculator";
import { HabitDetail } from "@/lib/types/habit";

export const getHabitDetailsAction = actionClient
  .schema(getHabitDetailsSchema)
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
            message: "You must be authenticated to view habit details",
          },
        };
      }

      const userId = session.user.id;
      const { habitId } = parsedInput;

      // Fetch the habit
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
            message: "You do not have permission to view this habit",
          },
        };
      }

      // Fetch last 90 days of completions
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const ninetyDaysAgoStr = formatDate(ninetyDaysAgo);

      const completions = await db
        .select()
        .from(habitExecution)
        .where(eq(habitExecution.habitId, habitId));

      // Build frequency pattern
      const frequency =
        currentHabit.recurrenceType === "daily"
          ? { type: "daily" as const }
          : currentHabit.recurrenceType === "weekly"
            ? {
                type: "weekly" as const,
                weekdays: currentHabit.recurrenceWeekdays || [],
              }
            : {
                type: "weekly_count" as const,
                count: currentHabit.recurrenceWeeklyCount || 1,
              };

      // Calculate streaks
      const { current: currentStreak, record: longestStreak } =
        calculateStreak(completions, frequency);

      // Get completed dates for rate calculation
      const completedDates = new Set(
        completions.map((c) => c.completedDate)
      );

      // Calculate completion rates
      const completionRate30Days = calculateCompletionRate(
        completedDates,
        30
      );
      const completionRate60Days = calculateCompletionRate(
        completedDates,
        60
      );
      const completionRate90Days = calculateCompletionRate(
        completedDates,
        90
      );

      // Check if completed today
      const today = formatDate(new Date());
      const completedToday = completedDates.has(today);

      // Get completions for last 90 days
      const last90DaysCompletions = completions.filter(
        (c) => c.completedDate >= ninetyDaysAgoStr
      );

      // Build monthly trend (array of last 30 days)
      const monthlyTrend = [];
      const today30Days = new Date();
      for (let i = 29; i >= 0; i--) {
        const checkDate = new Date(today30Days);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = formatDate(checkDate);
        monthlyTrend.push({
          date: dateStr,
          completed: completedDates.has(dateStr),
        });
      }

      const result: HabitDetail = {
        ...currentHabit,
        currentStreak,
        longestStreak,
        completedToday,
        completionsThisWeek: last90DaysCompletions.length, // TODO: calculate actual this week
        completionRate30Days,
        completionRate60Days,
        completionRate90Days,
        last90DaysCompletions,
        monthlyTrend,
      };

      return {
        success: true as const,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching habit details:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to fetch habit details. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
