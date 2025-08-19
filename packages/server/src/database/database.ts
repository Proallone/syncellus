import type { Database as DB } from "@syncellus/types/database.js";
import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3-multiple-ciphers";

export class DatabaseService {
    private static instance: Kysely<DB> | null = null;

    private constructor() {}

    public static getInstance(): Kysely<DB> {
        if (!DatabaseService.instance) {
            const encryptionKey = process.env.DATABASE_KEY;

            if (!encryptionKey) {
                throw new Error("DATABASE_KEY environment variable is not set.");
            }

            const dbInstance = new Database("syncellus.sqlite");

            try {
                dbInstance.pragma(`key='${encryptionKey}'`);
            } catch (err) {
                dbInstance.close();
                console.error("Failed to open encrypted database. The key may be incorrect.");
                throw err;
            }

            const dialect = new SqliteDialect({
                database: dbInstance
            });

            DatabaseService.instance = new Kysely<DB>({ dialect });
        }

        return DatabaseService.instance;
    }
}
