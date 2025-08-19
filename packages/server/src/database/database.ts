import type { Database as DB } from "@syncellus/types/database.js";
import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3-multiple-ciphers";
// import config from "@syncellus/configs/config.js";
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

            const dbInstance = new Database("syncellus.sqlite");
            if (!isDev) {
                //encrypt database only if not in dev
                dbInstance.pragma(`key='${encryptionKey}'`); //? this has to be executed first - otherwise throws
            }

            dbInstance.pragma(`journal_mode = WAL`);

            const dialect = new SqliteDialect({
                database: dbInstance
            });

            DatabaseService.instance = new Kysely<DB>({ dialect });
        }

        return DatabaseService.instance;
    }
}
