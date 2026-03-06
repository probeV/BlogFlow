import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import path from "path";

/**
 * Initializes a in-memory database for unit test.
 */
export async function setupTestDb() {
  const sqlite = new Database(":memory:");
  const db = drizzle(sqlite);

  await migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), "drizzle"),
  });

  return { db, sqlite };
}
