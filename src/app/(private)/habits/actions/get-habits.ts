"use server";

import { headers } from "next/headers";
import { and, eq, ilike, sql, desc, exists, SQL } from "drizzle-orm";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { ActionResult } from "@/lib/types/action";
import type { HabitWithStatus, HabitStatusFilter } from "../types";
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

/**
 * Builds the WHERE clause based on provided filters.
 */
function buildHabitFilters(userId: string, query?: string, status?: HabitStatusFilter): SQL | undefined {
  const conditions = [eq(habit.userId, userId)];

  if (status === "archived") {
    conditions.push(eq(habit.isActive, false));
  } else if (status === "active") {
    conditions.push(eq(habit.isActive, true));
  }

  if (query) {
    conditions.push(ilike(habit.name, `%${query}%`));
  }

  return and(...conditions);
}

/**
 * Checks if a habit is due today based on its recurrence configuration.
 */
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
  status?: HabitStatusFilter;
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
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const whereClause = buildHabitFilters(userId, params.query, params.status);

  // Subquery to check today's completion
  const completedTodaySubquery = exists(
    db
      .select()
      .from(habitExecution)
      .where(
        and(
          eq(habitExecution.habitId, habit.id),
          eq(habitExecution.completedDate, todayStr)
        )
      )
  );

  const [habitsData, countResult] = await Promise.all([
    db
      .select({
        habit: habit,
        completedToday: completedTodaySubquery,
      })
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

  // Process weekly_count aggregation if necessary
  const weeklyCountMap = new Map<string, number>();
  const weeklyCountHabitIds = habitsData
    .filter((h) => h.habit.recurrenceType === "weekly_count")
    .map((h) => h.habit.id);

  if (weeklyCountHabitIds.length > 0) {
    const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
    const weekEnd = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

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

  const habitsWithStatus: HabitWithStatus[] = habitsData.map(({ habit: h, completedToday }) => ({
    ...h,
    completedToday: !!completedToday,
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
