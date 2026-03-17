import { NextResponse } from "next/server";
import { db } from "@/db";
import { user, habit, habitExecution } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function POST() {
  // Permitir apenas se explicitamente em ambiente de teste
  // Nota: Em builds de produção (next start), NODE_ENV é sempre "production"
  if (process.env.NEXT_PUBLIC_APP_ENV !== "test" && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testEmail = "cypress@example.com";

  try {
    // 1. Get the user if it exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, testEmail),
    });

    if (existingUser) {
      // Get habit IDs for this user
      const userHabits = await db
        .select({ id: habit.id })
        .from(habit)
        .where(eq(habit.userId, existingUser.id));

      if (userHabits.length > 0) {
        const habitIds = userHabits.map((h) => h.id);
        // 2. Delete all habit executions for these habits
        await db.delete(habitExecution).where(inArray(habitExecution.habitId, habitIds));
        // 3. Delete all habits for this user
        await db.delete(habit).where(inArray(habit.id, habitIds));
      }

      // 4. Delete the user
      await db.delete(user).where(eq(user.id, existingUser.id));
    }

    return NextResponse.json({
      success: true,
      message: "Database cleaned for test user"
    });
  } catch (error) {
    console.error("Seeding/Cleanup failed:", error);
    return NextResponse.json({ error: "Seeding/Cleanup failed" }, { status: 500 });
  }
}
