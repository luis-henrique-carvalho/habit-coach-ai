"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { habit } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import type { ActionResult } from "@/lib/types/action";
import { upsertHabitSchema } from "../schemas/upsert-habit-schema";

export const upsertHabitAction = actionClient
  .inputSchema(upsertHabitSchema)
  .action(
    async ({ parsedInput }): Promise<ActionResult<{ id: string }>> => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user?.id) {
        return {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Você deve estar autenticado" },
        };
      }

      const userId = session.user.id;

      try {
        if (parsedInput.id) {
          // Update existing habit
          const existing = await db
            .select({ id: habit.id, userId: habit.userId })
            .from(habit)
            .where(eq(habit.id, parsedInput.id))
            .limit(1);

          if (!existing[0] || existing[0].userId !== userId) {
            return {
              success: false,
              error: { code: "NOT_FOUND", message: "Hábito não encontrado" },
            };
          }

          await db
            .update(habit)
            .set({
              name: parsedInput.name,
              description: parsedInput.description || null,
              recurrenceType: parsedInput.recurrenceType,
              recurrenceWeekdays: parsedInput.recurrenceWeekdays || null,
              recurrenceWeeklyCount: parsedInput.recurrenceWeeklyCount || null,
              preferredTime: parsedInput.preferredTime || null,
            })
            .where(eq(habit.id, parsedInput.id));

          revalidatePath("/habits");
          return { success: true, data: { id: parsedInput.id } };
        }

        // Create new habit — enforce Free tier limit (max 3 active habits)
        const activeCount = await db
          .select({ id: habit.id })
          .from(habit)
          .where(and(eq(habit.userId, userId), eq(habit.isActive, true)));

        if (activeCount.length >= 3) {
          // TODO: Check if user is Pro — for now, enforce limit for all users
          return {
            success: false,
            error: {
              code: "TIER_LIMIT_EXCEEDED",
              message: "Você atingiu o limite de 3 hábitos ativos. Faça upgrade para o plano Pro.",
            },
          };
        }

        const newId = crypto.randomUUID();
        await db.insert(habit).values({
          id: newId,
          userId,
          name: parsedInput.name,
          description: parsedInput.description || null,
          isActive: true,
          currentStreak: 0,
          longestStreak: 0,
          recurrenceType: parsedInput.recurrenceType,
          recurrenceWeekdays: parsedInput.recurrenceWeekdays || null,
          recurrenceWeeklyCount: parsedInput.recurrenceWeeklyCount || null,
          preferredTime: parsedInput.preferredTime || null,
        });

        revalidatePath("/habits");
        return { success: true, data: { id: newId } };
      } catch (error: unknown) {
        const pgError = (error as { cause?: { constraint_name?: string } })
          ?.cause;
        if (pgError?.constraint_name === "habit_userId_name_active_unique") {
          return {
            success: false,
            error: {
              code: "ALREADY_EXISTS",
              message: "Já existe um hábito ativo com esse nome",
            },
          };
        }

        return {
          success: false,
          error: { code: "DATABASE_ERROR", message: "Erro ao salvar hábito" },
        };
      }
    }
  );
