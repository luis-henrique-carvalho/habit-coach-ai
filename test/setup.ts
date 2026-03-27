import { sql } from 'drizzle-orm';
import { db } from '../src/db';
import { beforeEach } from 'vitest';

/**
 * Global test setup that runs before each test case.
 * Ensures the database is in a clean state by truncating all relevant tables.
 */
beforeEach(async () => {
  // We use CASCADE to handle foreign key dependencies (e.g., habit references user)
  const tablesToTruncate = [
    'habit_execution',
    'habit',
    'session',
    'account',
    'verification',
    'user',
  ];

  try {
    for (const table of tablesToTruncate) {
      await db.execute(sql.raw(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`));
    }
  } catch (error) {
    console.error('Failed to truncate tables during setup:', error);
    throw error;
  }
});
