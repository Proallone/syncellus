import type { Database as DB } from "@syncellus/types/database.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export class DatabaseService {
    private static instance: Kysely<DB> | null = null;

    public static getInstance(): Kysely<DB> {
        if (!DatabaseService.instance) {
            //TODO take from config
            const dialect = new PostgresDialect({
                pool: new Pool({
                    database: "syncellus",
                    host: "localhost",
                    user: "admin",
                    password: "password",
                    port: 5432,
                    max: 10
                })
            });

            DatabaseService.instance = new Kysely<DB>({ dialect });
        }

        return DatabaseService.instance;
    }
}
