import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await sql`PRAGMA journal_mode=WAL;`.execute(db);

    await db.schema
        .createTable("auth_users")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("public_id", "text", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(public_id) = 10`)
        )
        .addColumn("email", "text", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(email) >= 3 AND LENGTH(email) <= 255`)
        )
        .addColumn("password", "text", (col) => col.notNull().check(sql`LENGTH(password) >= 3 AND LENGTH(password) <= 255`))
        .addColumn("createdAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("active", "integer", (col) => col.defaultTo(0))
        .addColumn("role", "text", (col) => col.check(sql`role in ('admin', 'manager', 'employee')`).defaultTo("employee"))
        .execute();

    await db.schema.createIndex("user_email").on("auth_users").column("email").execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_auth_users_modifiedAt BEFORE
		UPDATE ON auth_users FOR EACH ROW BEGIN
			UPDATE auth_users
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
    await sql`DROP TRIGGER IF EXISTS update_auth_users_modifiedAt;`.execute(db);
    await db.schema.dropTable("auth_users").execute();
    await sql`PRAGMA journal_mode=DELETE;`.execute(db);
}
