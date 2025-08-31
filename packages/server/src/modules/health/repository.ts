import { type Kysely, QueryResult, sql } from "kysely";
import type { DbHealthResponse } from "@syncellus/types/index.js";
import type { Database } from "@syncellus/types/database.js";

export class HealthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public getDatabaseVersionFromDb = async (): Promise<DbHealthResponse> => {
        const { rows: version } = await sql<DbHealthResponse>`SELECT sqlite_version() as sqlite_version;`.execute(this.db);
        return version[0];
    };

    public getDatabaseHealth = async (): Promise<QueryResult<string>> => {
        return await sql<string>`SELECT 1;`.execute(this.db);
    };
}
