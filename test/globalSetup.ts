import { execSync } from 'node:child_process';
import path from 'node:path';

export default async function setup() {
  console.log('--- GLOBAL SETUP: Starting test database ---');

  const dockerComposeFile = path.resolve(process.cwd(), 'docker-compose.test.yml');

  try {
    // Start the database container
    execSync(`docker compose -f ${dockerComposeFile} up -d`, { stdio: 'inherit' });

    // Wait for the database to be ready
    console.log('Waiting for database to be healthy...');
    let ready = false;
    for (let i = 0; i < 10; i++) {
      try {
        execSync(`docker compose -f ${dockerComposeFile} exec -T db-test pg_isready -U test_user -d test_db`, {
          stdio: 'ignore',
        });
        ready = true;
        break;
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!ready) {
      throw new Error('Database failed to become ready in time');
    }

    // Run Drizzle migrations
    console.log('Running Drizzle migrations...');
    // We override DATABASE_URL for migrations to point to the test DB
    // Note: Since migrations run from host, we use localhost and mapped port 5433
    const TEST_DATABASE_URL = 'postgresql://test_user:test_password@localhost:5433/test_db';
    execSync(`DATABASE_URL=${TEST_DATABASE_URL} pnpm drizzle-kit migrate`, {
      stdio: 'inherit',
    });

    console.log('--- GLOBAL SETUP: DONE ---');
  } catch (error) {
    console.error('--- GLOBAL SETUP: FAILED ---', error);
    throw error;
  }
}

export async function teardown() {
  console.log('--- GLOBAL TEARDOWN: Stopping test database ---');
  const dockerComposeFile = path.resolve(process.cwd(), 'docker-compose.test.yml');
  try {
    execSync(`docker compose -f ${dockerComposeFile} down -v`, { stdio: 'inherit' });
    console.log('--- GLOBAL TEARDOWN: DONE ---');
  } catch (error) {
    console.error('--- GLOBAL TEARDOWN: FAILED ---', error);
  }
}
