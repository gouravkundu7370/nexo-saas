import { defineConfig } from "drizzle-kit";

import {config} from 'dotenv'

config({path :".env"})

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  migrations: {
    prefix: "supabase",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://localhost:5432/drizzle",
  },
});
