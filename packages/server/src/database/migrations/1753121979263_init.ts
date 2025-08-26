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

    await db.schema
        .createTable("accounts_profiles")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("user_id", "text", (col) => col.unique().notNull().references("auth_users.id"))
        .addColumn("name", "text", (col) => col.check(sql`LENGTH(name) >= 3 AND LENGTH(name) <= 255`))
        .addColumn("surname", "text", (col) => col.check(sql`LENGTH(surname) >= 3 AND LENGTH(surname) <= 255`))
        .addColumn("createdAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("employees_auth_users_id_fk", ["user_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_employees_modifiedAt BEFORE
		UPDATE ON accounts_profiles FOR EACH ROW BEGIN
			UPDATE accounts_profiles
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("timesheets_entries")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("employee_id", "text", (col) =>
            col
                .references("accounts_profiles.id")
                .notNull()
                .check(sql`LENGTH(employee_id) = 36`)
        )
        .addColumn("createdAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("date", "text", (col) => col.notNull())
        .addColumn("start_hour", "text", (col) => col.notNull())
        .addColumn("end_hour", "text", (col) => col.notNull().check(sql`end_hour > start_hour`))
        .addColumn("hours_worked", "text", (col) =>
            col
                .generatedAlwaysAs(
                    //? SQLite equivalent for timediff and formatting as HH:MM
                    sql`strftime('%H:%M', (julianday('2000-01-01 ' || time(end_hour)) - julianday('2000-01-01 ' || time(start_hour))) * 86400, 'unixepoch')`
                )
                .stored()
        )
        .addColumn("status", "text", (col) => col.check(sql`status in ('draft', 'submitted', 'approved', 'rejected')`).defaultTo("draft"))
        .addForeignKeyConstraint("timesheets_entries_employee_id_fk", ["employee_id"], "accounts_profiles", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.schema.createIndex("timesheets_entries_employee_id").on("timesheets_entries").column("employee_id").execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_timesheets_entries_modifiedAt BEFORE
		UPDATE ON timesheets_entries FOR EACH ROW BEGIN
			UPDATE timesheets_entries
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
    await sql`DROP TRIGGER IF EXISTS update_timesheets_entries_modifiedAt;`.execute(db);
    await db.schema.dropIndex("timesheets_entries_employee_id").execute();

    await db.schema.dropTable("timesheets_entries").execute();

    await sql`DROP TRIGGER IF EXISTS update_employees_modifiedAt;`.execute(db);

    await db.schema.dropTable("accounts_profiles").execute();

    await sql`DROP TRIGGER IF EXISTS update_auth_users_modifiedAt;`.execute(db);

    await db.schema.dropTable("auth_users").execute();

    await sql`PRAGMA journal_mode=DELETE;`.execute(db);
}
