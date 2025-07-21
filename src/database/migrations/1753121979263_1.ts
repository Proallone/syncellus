import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await db.schema
        .createTable("employees")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("surname", "text", (col) => col.notNull())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("password", "text", (col) => col.notNull())
        .addColumn("createdAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn("modifiedAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute();

    await db.schema
        .createIndex("employee_id")
        .on("employees")
        .column("id")
        .execute();
    await db.schema
        .createIndex("employee_email")
        .on("employees")
        .column("email")
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_employees_modifiedAt BEFORE
		UPDATE ON employees FOR EACH ROW BEGIN
			UPDATE employees
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("timesheets")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("employee_id", "integer", (col) =>
            col.references("employees.id")
        )
        .addColumn("createdAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn("modifiedAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn("date", "text", (col) => col.notNull())
        .addColumn("start_hour", "text", (col) => col.notNull())
        .addColumn("end_hour", "text", (col) =>
            col.notNull().check(sql`end_hour > start_hour`)
        )
        .addColumn("hours_worked", "text", (col) =>
            col.generatedAlwaysAs(
                sql`timediff(time(end_hour), time(start_hour))`
            )
        )
        .addColumn("approved", "boolean", (col) => col.defaultTo(false))
        .execute();

    await db.schema
        .createIndex("timesheets_id")
        .on("timesheets")
        .column("id")
        .execute();
    await db.schema
        .createIndex("timesheets_employee_id")
        .on("timesheets")
        .column("employee_id")
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_timesheets_modifiedAt BEFORE
		UPDATE ON timesheets FOR EACH ROW BEGIN
			UPDATE timesheets
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await sql`DROP TRIGGER IF EXISTS update_timesheets_modifiedAt;`.execute(db);
    await db.schema.dropIndex("timesheets_id").execute();
    await db.schema.dropIndex("timesheets_employee_id").execute();

    await db.schema.dropTable("timesheets").execute();

    await sql`DROP TRIGGER IF EXISTS update_employees_modifiedAt;`.execute(db);
    await db.schema.dropIndex("employee_id").execute();
    await db.schema.dropIndex("employee_email").execute();

    await db.schema.dropTable("employees").execute();
}
