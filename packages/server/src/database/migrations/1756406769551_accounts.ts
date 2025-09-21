import { sql, type Kysely } from "kysely";
import { schema as auth_schema } from "./1753121979263_auth.js";
import { createUpdateTimestampTrigger } from "../utils/triggers.js";

export const schema = "accounts";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema.createSchema(schema).ifNotExists().execute();

    await db
        .withSchema(schema)
        .schema.createTable("profiles")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("user_id", "uuid", (col) => col.unique().notNull().references(`${auth_schema}.users.id`))
        .addColumn("name", "varchar(256)", (col) => col.check(sql`LENGTH(name) >= 3`))
        .addColumn("surname", "varchar(256)", (col) => col.check(sql`LENGTH(surname) >= 3`))
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        // .addForeignKeyConstraint("employees_auth_users_id_fk", ["user_id"], "auth.users", ["id"], (cb) => cb.onDelete("cascade")) //TODO get back to it
        .execute();

    await createUpdateTimestampTrigger(schema, "profiles").execute(db);

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_account_profiles_modified_at BEFORE
    // 	UPDATE ON accounts_profiles FOR EACH ROW BEGIN
    // 		UPDATE accounts_profiles
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations

    // await sql`DROP TRIGGER IF EXISTS update_account_profiles_modified_at;`.execute(db);
    await db.withSchema(schema).schema.dropTable("profiles").execute();

    await db.schema.dropSchema("accounts").execute();
}
