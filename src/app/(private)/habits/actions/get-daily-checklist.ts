"use server";

import { actionClient } from "@/lib/safe-action";
import { getDailyChecklistSchema } from "../schemas/habit-schema";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema/habit-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, isNull, inArray } from "drizzle-orm";
import {
  calculateStreak,
  formatDate,
} from "@/lib/utils/streak-calculator";
import { HabitWithStats } from "@/lib/types/habit";

export const getDailyChecklistAction = actionClient
  .schema(getDailyChecklistSchema)
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
            message: "You must be authenticated to view your checklist",
          },
        };
      }

      const userId = session.user.id;

      // Determine target date
      let targetDate = new Date();
      if (parsedInput.date) {
        targetDate = new Date(parsedInput.date + "T00:00:00");
      }
      targetDate.setHours(0, 0, 0, 0);

      const dayOfWeek = targetDate.getDay();
      const targetDateStr = formatDate(targetDate);

      // Fetch all active habits for user
      const userHabits = await db
        .select()
        .from(habit)
        .where(
          and(
            eq(habit.userId, userId),
            eq(habit.isActive, true)
          )
        );

      console.log("User habits:", userHabits);

      // Fetch all completions for this user
      const allCompletions = await db
        .select()
        .from(habitExecution)
        .where(
          inArray(habitExecution.habitId, userHabits.map((h) => h.id))
        );

        console.log("All completions:", allCompletions);

      // Group completions by habit
      const completionsByHabit = new Map<string, typeof allCompletions>();
      for (const completion of allCompletions) {
        if (!completionsByHabit.has(completion.habitId)) {
          completionsByHabit.set(completion.habitId, []);
        }
        completionsByHabit.get(completion.habitId)!.push(completion);
      }

      // Filter to habits due today and calculate stats
      const habitsDueToday: HabitWithStats[] = [];

      for (const h of userHabits) {
        // Check if habit is due today based on frequency
        let isDueToday = false;

        if (h.recurrenceType === "daily") {
          isDueToday = true;
        } else if (h.recurrenceType === "weekly") {
          const scheduledWeekdays = h.recurrenceWeekdays || [];
          isDueToday = scheduledWeekdays.includes(dayOfWeek);
        } else if (h.recurrenceType === "weekly_count") {
          // For weekly count, we show it every day (user decides which days to do it)
          isDueToday = true;
        }

        if (!isDueToday) continue;

        // Get completions for this habit
        const habitCompletions = completionsByHabit.get(h.id) || [];

        // Build frequency pattern for streak calculation
        const frequency =
          h.recurrenceType === "daily"
            ? { type: "daily" as const }
            : h.recurrenceType === "weekly"
              ? {
                  type: "weekly" as const,
                  weekdays: h.recurrenceWeekdays || [],
                }
              : {
                  type: "weekly_count" as const,
                  count: h.recurrenceWeeklyCount || 1,
                };

        // Calculate streak
        const { current: currentStreak } = calculateStreak(
          habitCompletions,
          frequency,
          targetDate
        );

        // Check if completed today
        const completedToday = habitCompletions.some(
          (c) => c.completedDate === targetDateStr
        );

        // Calculate completions this week
        const weekStart = new Date(targetDate);
        weekStart.setDate(weekStart.getDate() - dayOfWeek);
        const weekStartStr = formatDate(weekStart);

        const completionsThisWeek = habitCompletions.filter(
          (c) => c.completedDate >= weekStartStr
        ).length;

        habitsDueToday.push({
          ...h,
          currentStreak,
          longestStreak: h.longestStreak,
          completedToday,
          completionsThisWeek,
          completionRate30Days: 0, // Not needed for checklist, but required by type
          completionRate60Days: 0,
          completionRate90Days: 0,
        });
      }

      // Sort by preferred time, then by creation time
      habitsDueToday.sort((a, b) => {
        if (a.preferredTime && b.preferredTime) {
          return a.preferredTime.localeCompare(b.preferredTime);
        }
        if (a.preferredTime) return -1;
        if (b.preferredTime) return 1;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });

      return {
        success: true as const,
        data: {
          date: targetDateStr,
          habits: habitsDueToday,
          totalHabitsToday: habitsDueToday.length,
          completedCount: habitsDueToday.filter((h) => h.completedToday).length,
        },
      };
    } catch (error) {
      console.error("Error fetching daily checklist:", error);
      return {
        success: false as const,
        error: {
          code: "DATABASE_ERROR" as const,
          message:
            "Failed to fetch your checklist. Please try again or contact support if the issue persists.",
        },
      };
    }
  });
