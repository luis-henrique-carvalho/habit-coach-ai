"use server";

import { db } from "@/db";
import { habit } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Get the count of active habits for the current user
 * Used for free tier limit checking (max 3 active habits)
 *
 * @returns The number of active habits
 */
export async function getHabitCount(): Promise<number> {
  try {
    // Verify user session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Count active habits
    const result = await db
      .select({ count: count() })
      .from(habit)
      .where(and(eq(habit.userId, userId), eq(habit.isActive, true)));

    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("Error counting habits:", error);
    throw error;
  }
}
