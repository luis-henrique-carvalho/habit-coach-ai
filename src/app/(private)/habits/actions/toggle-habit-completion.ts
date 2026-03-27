"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq, desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { habit, habitExecution } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import type { ActionResult } from "@/lib/types/action";
import {
  differenceInDays,
  isFuture,
  parseISO,
} from "date-fns";
import { calculateCurrentStreak } from "@/lib/utils/streak-calculator";

const toggleSchema = z.object({
  habitId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const toggleHabitCompletionAction = actionClient
  .inputSchema(toggleSchema)
  .action(
    async ({ parsedInput }): Promise<ActionResult<{ completed: boolean }>> => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user?.id) {
        return {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Você deve estar autenticado" },
        };
      }

      // Validate date
      const targetDate = parseISO(parsedInput.date);
      if (isFuture(targetDate)) {
        return {
          success: false,
          error: {
            code: "INVALID_DATE",
            message: "Não é possível registrar hábitos para datas futuras",
          },
        };
      }

      const daysAgo = differenceInDays(new Date(), targetDate);
      if (daysAgo > 7) {
        return {
          success: false,
          error: {
            code: "INVALID_DATE",
            message: "Só é possível registrar hábitos dos últimos 7 dias",
          },
        };
      }

      // Verify ownership
      const existing = await db
        .select()
        .from(habit)
        .where(eq(habit.id, parsedInput.habitId))
        .limit(1);

      if (!existing[0] || existing[0].userId !== session.user.id) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Hábito não encontrado" },
        };
      }

      const habitRecord = existing[0];

      // Toggle: check if execution exists for this date
      const existingExec = await db
        .select({ id: habitExecution.id })
        .from(habitExecution)
        .where(
          and(
            eq(habitExecution.habitId, parsedInput.habitId),
            eq(habitExecution.completedDate, parsedInput.date)
          )
        )
        .limit(1);

      let completed: boolean;

      if (existingExec[0]) {
        // Uncomplete — delete execution
        await db
          .delete(habitExecution)
          .where(eq(habitExecution.id, existingExec[0].id));
        completed = false;
      } else {
        // Complete — insert execution
        await db.insert(habitExecution).values({
          id: crypto.randomUUID(),
          habitId: parsedInput.habitId,
          completedAt: new Date(),
          completedDate: parsedInput.date,
        });
        completed = true;
      }

      // Recalculate streaks
      const allExecutions = await db
        .select({ completedDate: habitExecution.completedDate })
        .from(habitExecution)
        .where(eq(habitExecution.habitId, parsedInput.habitId))
        .orderBy(desc(habitExecution.completedDate));

      const executionDates = allExecutions.map((e) => e.completedDate);
      const currentStreak = calculateCurrentStreak(
        executionDates,
        habitRecord.recurrenceType,
        {
          recurrenceWeekdays: habitRecord.recurrenceWeekdays,
          recurrenceWeeklyCount: habitRecord.recurrenceWeeklyCount,
        }
      );

      const longestStreak = Math.max(currentStreak, habitRecord.longestStreak);

      await db
        .update(habit)
        .set({ currentStreak, longestStreak })
        .where(eq(habit.id, parsedInput.habitId));

        console.log(`Updated habit ${habitRecord.id}: completed=${completed}, currentStreak=${currentStreak}, longestStreak=${longestStreak}`);

      revalidatePath("/habits");
      return { success: true, data: { completed } };
    }
  );
