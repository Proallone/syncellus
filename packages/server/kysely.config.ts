import { db as kysely } from "./src/database/database.js";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
    // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
    kysely,
    migrations: {
        migrationFolder: "./src/database/migrations"
    },
    //   plugins: [],
    seeds: {
        seedFolder: "./src/database/seeds"
    }
});
