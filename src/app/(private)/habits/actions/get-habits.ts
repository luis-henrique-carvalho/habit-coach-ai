"use server";

import { headers } from "next/headers";
import { and, eq, ilike, sql, desc } from "drizzle-orm";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { ActionResult } from "@/lib/types/action";
import type { HabitWithStatus } from "../types";
import {
  format,
  getDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";

type GetHabitsResult = {
  habits: HabitWithStatus[];
  totalPages: number;
  currentPage: number;
  total: number;
};

function isDueToday(
  recurrenceType: string,
  recurrenceWeekdays: number[] | null,
): boolean {
  const today = getDay(new Date()); // 0=Sunday
  if (recurrenceType === "daily") return true;
  if (recurrenceType === "weekly") {
    return recurrenceWeekdays?.includes(today) ?? false;
  }
  // weekly_count — always show (user picks which days)
  return true;
}

export async function getHabitsAction(params: {
  page?: string;
  limit?: string;
  query?: string;
}): Promise<ActionResult<GetHabitsResult>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Você deve estar autenticado" },
    };
  }

  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(params.limit || "10", 10)));
  const offset = (page - 1) * limit;
  const userId = session.user.id;

  const conditions = [eq(habit.userId, userId), eq(habit.isActive, true)];
  if (params.query) {
    conditions.push(ilike(habit.name, `%${params.query}%`));
  }

  const whereClause = and(...conditions);

  const [habits, countResult] = await Promise.all([
    db
      .select()
      .from(habit)
      .where(whereClause)
      .orderBy(desc(habit.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(habit)
      .where(whereClause),
  ]);

  const total = countResult[0]?.count ?? 0;
  const todayStr = format(new Date(), "yyyy-MM-dd");

  // Check today's completions for all habits
  const habitIds = habits.map((h) => h.id);
  let todayExecutions: { habitId: string }[] = [];
  if (habitIds.length > 0) {
    todayExecutions = await db
      .select({ habitId: habitExecution.habitId })
      .from(habitExecution)
      .where(
        and(
          sql`${habitExecution.habitId} IN (${sql.join(
            habitIds.map((id) => sql`${id}`),
            sql`, `
          )})`,
          eq(habitExecution.completedDate, todayStr)
        )
      );
  }

  const completedTodaySet = new Set(todayExecutions.map((e) => e.habitId));

  // For weekly_count habits, check weekly completions
  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const weekEnd = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const weeklyCountMap = new Map<string, number>();
  const weeklyCountHabitIds = habits
    .filter((h) => h.recurrenceType === "weekly_count")
    .map((h) => h.id);

  if (weeklyCountHabitIds.length > 0) {
    const weeklyExecs = await db
      .select({
        habitId: habitExecution.habitId,
        count: sql<number>`count(*)::int`,
      })
      .from(habitExecution)
      .where(
        and(
          sql`${habitExecution.habitId} IN (${sql.join(
            weeklyCountHabitIds.map((id) => sql`${id}`),
            sql`, `
          )})`,
          sql`${habitExecution.completedDate} >= ${weekStart}`,
          sql`${habitExecution.completedDate} <= ${weekEnd}`
        )
      )
      .groupBy(habitExecution.habitId);

    for (const row of weeklyExecs) {
      weeklyCountMap.set(row.habitId, row.count);
    }
  }

  const habitsWithStatus: HabitWithStatus[] = habits.map((h) => ({
    ...h,
    completedToday: completedTodaySet.has(h.id),
    isDueToday: isDueToday(h.recurrenceType, h.recurrenceWeekdays),
  }));

  return {
    success: true,
    data: {
      habits: habitsWithStatus,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    },
  };
}
