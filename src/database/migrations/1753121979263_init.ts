import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema
        .createTable("users")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("password", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(password) >= 3 AND LENGTH(password) <= 255`)
        )
        .addColumn("createdAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn("modifiedAt", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .addColumn("is_active", "boolean", (col) => col.defaultTo(true))
        .addColumn("role", "text", (col) =>
            col
                .check(sql`role in ('admin', 'manager', 'employee')`)
                .defaultTo("employee")
        )
        .execute();

    await db.schema.createIndex("user_id").on("users").column("id").execute();

    await db.schema
        .createIndex("user_email")
        .on("users")
        .column("email")
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_users_modifiedAt BEFORE
		UPDATE ON users FOR EACH ROW BEGIN
			UPDATE users
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("employees")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("user_id", "integer", (col) =>
            col.unique().notNull().references("users.id")
        )
        .addColumn("name", "text")
        .addColumn("surname", "text")
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

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_employees_modifiedAt BEFORE
		UPDATE ON employees FOR EACH ROW BEGIN
			UPDATE employees
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await sql`CREATE TRIGGER after_user_insert_add_employee
            AFTER INSERT ON users
            FOR EACH ROW
            BEGIN
                INSERT INTO employees (user_id)
                VALUES (NEW.id);
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
            col
                .generatedAlwaysAs(
                    //? SQLite equivalent for timediff and formatting as HH:MM
                    sql`strftime('%H:%M', (julianday('2000-01-01 ' || time(end_hour)) - julianday('2000-01-01 ' || time(start_hour))) * 86400, 'unixepoch')`
                )
                .stored()
        )
        .addColumn("status", "text", (col) =>
            col
                .check(
                    sql`status in ('draft', 'submitted', 'approved', 'rejected')`
                )
                .defaultTo("draft")
        )
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

    await db.schema.dropTable("employees").execute();

    await sql`DROP TRIGGER IF EXISTS update_users_modifiedAt;`.execute(db);
    await sql`DROP TRIGGER IF EXISTS after_user_insert_add_employee;`.execute(
        db
    );

    await db.schema.dropIndex("user_id").execute();
    await db.schema.dropIndex("user_email").execute();
    await db.schema.dropTable("users").execute();
}
