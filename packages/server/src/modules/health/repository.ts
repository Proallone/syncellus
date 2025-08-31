import { type Kysely, sql } from "kysely";
import type { DbHealthResponse } from "@syncellus/types/index.js";
import type { DB } from "@syncellus/types/db.js";

export class HealthRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public getDatabaseVersionFromDb = async (): Promise<DbHealthResponse> => {
        const { rows: version } = await sql<DbHealthResponse>`SELECT sqlite_version() as sqlite_version;`.execute(this.db);
        return version[0];
    };
}
