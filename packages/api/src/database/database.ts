import type { DB } from "@syncellus/types/database.d.ts";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { extractDbCredentials } from "@syncellus/utils/databaseUrlHelper.ts";
import { ConfigService } from "@syncellus/config/config.ts";

export class DatabaseService {
	private static instance: Kysely<DB> | null = null;

	public static getInstance(): Kysely<DB> {
		const config = ConfigService.getInstance();

		if (!DatabaseService.instance) {
			if (!config.DATABASE_URL) throw new Error("DATABASE_URL env variable not provided");

			const credentials = extractDbCredentials(config.DATABASE_URL);

			//TODO this is the first time database is accessed - but it might change in the future, change this pool config
			const dbConfig = {
				...credentials,
				max: 10,
			};

			const dialect = new PostgresDialect({
				pool: new Pool(dbConfig),
			});

			DatabaseService.instance = new Kysely<DB>({ dialect });
		}

		return DatabaseService.instance;
	}
}
