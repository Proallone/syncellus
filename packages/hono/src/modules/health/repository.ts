import type { DB } from "@syncellus/hono/types/database.d.ts";
import { type Kysely, sql } from "kysely";
import type { IHealthRepository, DatabaseHealthResponse } from "@syncellus/hono/modules/health/types.d.ts";

export class HealthRepository implements IHealthRepository {
  constructor(private readonly db: Kysely<DB>) {}

  public getDatabaseVersionFromDb = async (): Promise<DatabaseHealthResponse> => {
    const { rows: version } = await sql<
      DatabaseHealthResponse
    >`SELECT version() as postgres_version;`.execute(this.db);
    return version[0];
  };

  public getDatabaseHealth = async (): Promise<boolean> => {
    return await !!sql<string>`SELECT 1;`.execute(this.db);
  };
}
