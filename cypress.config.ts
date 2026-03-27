import { defineConfig } from 'cypress';
import { db } from './src/db';
import { user } from './src/db/schema';
import { eq } from 'drizzle-orm';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:seed'() {
          const testEmail = "cypress@example.com";
          try {
            // Because of onDelete: "cascade", deleting the user deletes everything
            await db.delete(user).where(eq(user.email, testEmail));
            return { success: true };
          } catch (error) {
            console.error("Seeding/Cleanup failed:", error);
            throw error;
          }
        },
      });
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});
