import type { Database as DB } from "@syncellus/types/database.js";
import { Kysely } from "kysely";
import { LibsqlDialect } from "kysely-libsql";
import { createClient } from "@libsql/client";
export class DatabaseService {
    private static instance: Kysely<DB> | null = null;

    private constructor() {}

    public static getInstance(): Kysely<DB> {
        if (!DatabaseService.instance) {
            const encryptionKey = process.env.DATABASE_KEY; //TODO fix this to use config

            const isDev = ["dev", "development", "test"].includes(process.env.NODE_ENV); //TODO fix this to use config

            if (!encryptionKey && !isDev) {
                throw new Error("DATABASE_KEY environment variable is not set.");
            }

            const client = createClient({
                url: "file:syncellus.sqlite",
                encryptionKey: !isDev ? encryptionKey : null
            });

            const dialect = new LibsqlDialect({ client });

            DatabaseService.instance = new Kysely<DB>({ dialect });
        }

        return DatabaseService.instance;
    }
}
