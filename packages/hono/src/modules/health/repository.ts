import { sql } from "kysely";
import type { DatabaseHealthResponse } from "./types.d.ts";
import { DatabaseService } from "@syncellus/hono/database/database.ts";

const db = DatabaseService.getInstance();

export const getDatabaseVersionFromDb = async (): Promise<
    DatabaseHealthResponse
  > => {
    const { rows: version } = await sql<
      DatabaseHealthResponse
    >`SELECT version() as postgres_version;`.execute(db);
    return version[0];
  };

export const getDatabaseHealth = async (): Promise<boolean> => {
    return await !!sql<string>`SELECT 1;`.execute(db);
  };

