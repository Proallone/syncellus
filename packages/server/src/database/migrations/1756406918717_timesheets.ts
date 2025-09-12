import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema
        .createTable("timesheets_entries")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("employee_id", "text", (col) =>
            col
                .references("accounts_profiles.id")
                .notNull()
                .check(sql`LENGTH(employee_id) = 36`)
        )
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
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
		CREATE TRIGGER IF NOT EXISTS update_timesheets_entries_modified_at BEFORE
		UPDATE ON timesheets_entries FOR EACH ROW BEGIN
			UPDATE timesheets_entries
			SET
			modified_at = datetime ('now')
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
    await sql`DROP TRIGGER IF EXISTS update_timesheets_entries_modified_at;`.execute(db);
    await db.schema.dropIndex("timesheets_entries_employee_id").execute();
    await db.schema.dropTable("timesheets_entries").execute();
}
