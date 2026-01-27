"use server";

import { db } from "@/db";
import { habit } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { deleteHabitSchema } from "../schemas/habit-schema";
import { eq, and } from "drizzle-orm";

/**
 * Delete (soft delete) a habit by setting isActive to false
 * Related recurrence and execution records are preserved for history
 */
export const deleteHabit = actionClient
  .inputSchema(deleteHabitSchema)
  .action(async ({ parsedInput }) => {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const { habitId } = parsedInput;

    // Verify ownership
    const [existingHabit] = await db
      .select()
      .from(habit)
      .where(and(eq(habit.id, habitId), eq(habit.userId, userId)))
      .limit(1);

    if (!existingHabit) {
      throw new Error("Habit not found or you don't have permission to delete it");
    }

    // Soft delete: set isActive to false
    await db
      .update(habit)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(habit.id, habitId));

    // Revalidate paths to update UI
    revalidatePath("/habits");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Habit archived successfully",
    };
  });
