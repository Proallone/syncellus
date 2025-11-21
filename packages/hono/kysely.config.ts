import { defineConfig } from "@kysely-org/kysely-ctl";
import { DatabaseService } from "@syncellus/hono/database/database.ts";

const db = DatabaseService.getInstance();

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	kysely: db,
	migrations: {
		migrationFolder: "./src/database/migrations",
	},
	//   plugins: [],
	seeds: {
		seedFolder: "./src/database/seeds",
	},
});
