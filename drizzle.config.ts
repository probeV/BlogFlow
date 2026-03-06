import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/backend/db/schema/*",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
});
