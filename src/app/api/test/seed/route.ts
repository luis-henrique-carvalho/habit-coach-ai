import { NextResponse } from "next/server";
import { db } from "@/db";
import { user, session, habit, habitExecution } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  // STRICTLY for local testing/CI
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testUserId = "cypress-test-user";
  const testSessionToken = "cypress-session-token";

  try {
    // Upsert test user
    await db.insert(user).values({
      id: testUserId,
      name: "Cypress Tester",
      email: "cypress@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: user.id,
      set: { name: "Cypress Tester" }
    });

    // Create session
    await db.insert(session).values({
      id: "cypress-session-id",
      userId: testUserId,
      token: testSessionToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: session.id,
      set: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) }
    });

    // Clear habits and executions for this user
    // We fetch habits first because we might want to be more specific, 
    // but a simple delete where userId matches is more efficient.
    await db.delete(habitExecution).where(
      eq(habitExecution.habitId, db.select({ id: habit.id }).from(habit).where(eq(habit.userId, testUserId)))
    );
    await db.delete(habit).where(eq(habit.userId, testUserId));

    return NextResponse.json({ 
      success: true, 
      userId: testUserId, 
      sessionToken: testSessionToken 
    });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
