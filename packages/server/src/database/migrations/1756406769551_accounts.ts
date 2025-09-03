import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema
        .createTable("accounts_profiles")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("user_id", "text", (col) => col.unique().notNull().references("auth_users.id"))
        .addColumn("name", "text", (col) => col.check(sql`LENGTH(name) >= 3 AND LENGTH(name) <= 255`))
        .addColumn("surname", "text", (col) => col.check(sql`LENGTH(surname) >= 3 AND LENGTH(surname) <= 255`))
        .addColumn("createdAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("employees_auth_users_id_fk", ["user_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_account_profiles_modifiedAt BEFORE
		UPDATE ON accounts_profiles FOR EACH ROW BEGIN
			UPDATE accounts_profiles
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await sql`DROP TRIGGER IF EXISTS update_account_profiles_modifiedAt;`.execute(db);
    await db.schema.dropTable("accounts_profiles").execute();
}
