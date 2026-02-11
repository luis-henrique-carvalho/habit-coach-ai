"use server";

import { headers } from "next/headers";
import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { ActionResult } from "@/lib/types/action";
import type { HabitDetail, WeeklyTrendData } from "../types";
import {
  subDays,
  format,
  startOfWeek,
  addWeeks,
  isBefore,
  isAfter,
  getDay,
} from "date-fns";
import {
  calculateCurrentStreak,
  calculateCompletionRates,
} from "@/lib/utils/streak-calculator";

export async function getHabitDetailAction(params: {
  id: string;
}): Promise<ActionResult<HabitDetail>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Você deve estar autenticado" },
    };
  }

  const habitRecord = await db
    .select()
    .from(habit)
    .where(eq(habit.id, params.id))
    .limit(1);

  if (!habitRecord[0] || habitRecord[0].userId !== session.user.id) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "Hábito não encontrado" },
    };
  }

  const h = habitRecord[0];
  const ninetyDaysAgo = format(subDays(new Date(), 90), "yyyy-MM-dd");

  // Fetch executions for last 90 days
  const executions = await db
    .select()
    .from(habitExecution)
    .where(
      and(
        eq(habitExecution.habitId, h.id),
        sql`${habitExecution.completedDate} >= ${ninetyDaysAgo}`
      )
    )
    .orderBy(desc(habitExecution.completedDate));

  const executionDates = executions.map((e) => e.completedDate);

  const currentStreak = calculateCurrentStreak(executionDates, h.recurrenceType, {
    recurrenceWeekdays: h.recurrenceWeekdays,
    recurrenceWeeklyCount: h.recurrenceWeeklyCount,
  });
  const longestStreak = Math.max(currentStreak, h.longestStreak);

  const completionRates = calculateCompletionRates(
    executionDates,
    h.recurrenceType,
    {
      recurrenceWeekdays: h.recurrenceWeekdays,
      recurrenceWeeklyCount: h.recurrenceWeeklyCount,
    },
    h.createdAt
  );

  // Weekly trend for last 12 weeks
  const weeklyTrend = calculateWeeklyTrend(
    executionDates,
    h.recurrenceType,
    {
      recurrenceWeekdays: h.recurrenceWeekdays,
      recurrenceWeeklyCount: h.recurrenceWeeklyCount,
    },
    h.createdAt
  );

  return {
    success: true,
    data: {
      ...h,
      stats: {
        currentStreak,
        longestStreak,
        completionRates,
      },
      executions,
      weeklyTrend,
    },
  };
}

function calculateWeeklyTrend(
  executionDates: string[],
  recurrenceType: string,
  config: { recurrenceWeekdays?: number[] | null; recurrenceWeeklyCount?: number | null },
  createdAt: Date
): WeeklyTrendData[] {
  const today = new Date();
  const completedSet = new Set(executionDates);
  const trend: WeeklyTrendData[] = [];

  for (let w = 11; w >= 0; w--) {
    const weekStart = startOfWeek(addWeeks(today, -w), { weekStartsOn: 1 });

    let expected = 0;
    let completed = 0;

    if (recurrenceType === "weekly_count") {
      expected = config.recurrenceWeeklyCount ?? 1;
      // Count completions in this week
      for (let d = 0; d < 7; d++) {
        const day = addWeeks(weekStart, 0);
        day.setDate(weekStart.getDate() + d);
        if (isAfter(day, today)) break;
        if (isBefore(day, createdAt)) continue;
        const dayStr = format(day, "yyyy-MM-dd");
        if (completedSet.has(dayStr)) completed++;
      }
    } else {
      for (let d = 0; d < 7; d++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + d);
        if (isAfter(day, today)) break;
        if (isBefore(day, createdAt)) continue;

        const isExpected =
          recurrenceType === "daily" ||
          (recurrenceType === "weekly" &&
            config.recurrenceWeekdays?.includes(getDay(day)));

        if (isExpected) {
          expected++;
          const dayStr = format(day, "yyyy-MM-dd");
          if (completedSet.has(dayStr)) completed++;
        }
      }
    }

    const weekLabel = format(weekStart, "dd/MM");
    const rate = expected > 0 ? Math.round((completed / expected) * 100) : 0;
    trend.push({ week: weekLabel, rate });
  }

  return trend;
}
