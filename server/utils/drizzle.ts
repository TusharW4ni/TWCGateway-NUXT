import { drizzle } from "drizzle-orm/d1";
import { useRuntimeConfig } from "#imports";
import * as schema from "../database/schema";

export { sql, eq, and, or } from "drizzle-orm";
export const tables = schema;
export function useDrizzle() {
  const config = useRuntimeConfig();
  return drizzle(config.DATABASE_URL, { schema });
}

export type User = typeof schema.users.$inferSelect;
