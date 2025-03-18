import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/infrastructure/db/migrations",
  schema: [
    "./src/infrastructure/db/schema/user.ts",
    "./src/infrastructure/db/schema/article.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
