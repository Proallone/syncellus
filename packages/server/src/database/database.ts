// import { AppConfig } from "@syncellus/configs/config.js";
import type { DB } from "@syncellus/types/database.js";
import { extractDbCredentials } from "@syncellus/utils/databaseUrlHelper.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export class DatabaseService {
    private static instance: Kysely<DB> | null = null;

    public static getInstance(): Kysely<DB> {
        // const config = AppConfig.getInstance(); //TODO fix

        if (!DatabaseService.instance) {
            const DATABASE_URL = process.env.DATABASE_URL;
            const { database, host, user, password, port } = extractDbCredentials(DATABASE_URL);
            //TODO this is the first time database is accessed - but it might change in the future, change this pool config
            const config = {
                database: database,
                host: host,
                user: user,
                password: password,
                port: port,
                max: 10
            };

            const dialect = new PostgresDialect({
                pool: new Pool(config)
            });

            DatabaseService.instance = new Kysely<DB>({ dialect });
        }

        return DatabaseService.instance;
    }
}
