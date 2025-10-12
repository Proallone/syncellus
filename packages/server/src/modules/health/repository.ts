import type { DB } from "@syncellus/types/database.d.ts";
import type { DbHealthResponse } from "@syncellus/types/index.ts";
import { type Kysely, sql } from "kysely";
import type { IHealthRepository } from "./types.d.ts";

export class HealthRepository implements IHealthRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public getDatabaseVersionFromDb = async (): Promise<DbHealthResponse> => {
        const { rows: version } = await sql<DbHealthResponse>`SELECT version() as postgres_version;`.execute(this.db);
        return version[0];
    };
    public getDatabaseHealth = async (): Promise<boolean> => {
        return !!sql<string>`SELECT 1;`.execute(this.db);
    };
}
