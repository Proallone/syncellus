import { type Kysely, sql } from "kysely";
import type { DbHealthResponse } from "@syncellus/types/index.js";
import type { Database } from "@syncellus/types/database.js";

export class HealthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public getDatabaseVersionFromDb = async (): Promise<DbHealthResponse> => {
        const { rows: version } = await sql<DbHealthResponse>`SELECT sqlite_version() as sqlite_version;`.execute(this.db);
        return version[0];
    };
}
