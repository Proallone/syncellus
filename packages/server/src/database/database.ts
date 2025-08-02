import { Database } from "@syncellus/types/database.js";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
    database: new SQLite("syncellus.sqlite")
});

export const db = new Kysely<Database>({
    dialect
});
