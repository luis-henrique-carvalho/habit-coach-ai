"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { habit } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import type { ActionResult } from "@/lib/types/action";

const archiveHabitSchema = z.object({
  id: z.string().min(1),
});

export const archiveHabitAction = actionClient
  .inputSchema(archiveHabitSchema)
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

      const existing = await db
        .select({ id: habit.id, userId: habit.userId })
        .from(habit)
        .where(eq(habit.id, parsedInput.id))
        .limit(1);

      if (!existing[0] || existing[0].userId !== session.user.id) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Hábito não encontrado" },
        };
      }

      await db
        .update(habit)
        .set({ isActive: false })
        .where(eq(habit.id, parsedInput.id));

      revalidatePath("/habits");
      return { success: true, data: { id: parsedInput.id } };
    }
  );
