import type { Database } from "@syncellus/types/database.js";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

export class DatabaseService {
    private static instance: Kysely<Database> | null = null;
    private constructor() {} //? prevent `new DatabaseService()`

    public static getInstance(): Kysely<Database> {
        if (!DatabaseService.instance) {
            const dialect = new SqliteDialect({
                database: new SQLite("syncellus.sqlite")
            });

            DatabaseService.instance = new Kysely<Database>({ dialect });
        }
        return DatabaseService.instance;
    }
}
