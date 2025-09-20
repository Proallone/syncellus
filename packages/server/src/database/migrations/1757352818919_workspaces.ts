import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema.createSchema("workspaces").ifNotExists().execute();

    await db.schema
        .createTable("workspaces.teams")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("public_id", "varchar(10)", (col) => col.notNull())
        .addColumn("owner_id", "uuid", (col) => col.references("auth.users.id").notNull())
        .addColumn("name", "varchar(256)", (col) => col.notNull())
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addForeignKeyConstraint("workspaces_teams_user_id_fk", ["owner_id"], "auth.users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_workspaces_teams_modified_at BEFORE
    // 	UPDATE ON workspaces_teams FOR EACH ROW BEGIN
    // 		UPDATE workspaces_teams
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("workspaces.team_roles")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("name", "varchar(256)", (col) => col.unique().notNull())
        .addColumn("description", "varchar(256)")
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_workspaces_team_roles_modified_at BEFORE
    // 	UPDATE ON workspaces_team_roles FOR EACH ROW BEGIN
    // 		UPDATE workspaces_team_roles
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    //TODO add invited_by email?
    await db.schema
        .createTable("workspaces.team_invitations")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("team_id", "uuid", (col) => col.notNull().references("workspaces.teams.id"))
        .addColumn("invited_email", "varchar(256)", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(invited_email) >= 3`)
        )
        .addColumn("status", "varchar(40)", (col) => col.notNull().defaultTo("pending")) //todo handle better
        .addColumn("invitation_token", "varchar(64)", (col) => col.notNull())
        .addColumn("expires_at", "timestamptz", (col) => col.defaultTo(sql`now() + interval '7 days'`).notNull()) //TODO time from config
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS workspaces_team_invitations_modified_at BEFORE
    // 	UPDATE ON workspaces_team_invitations FOR EACH ROW BEGIN
    // 		UPDATE workspaces_team_invitations
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("workspaces.team_members")
        .addColumn("team_id", "uuid", (col) => col.notNull().references("workspaces.teams.id"))
        .addColumn("user_id", "uuid", (col) => col.notNull().references("auth.users.id"))
        .addColumn("role_id", "uuid", (col) => col.notNull().references("workspaces.team_roles.id"))
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addForeignKeyConstraint("workspaces_team_members_team_id_fk", ["team_id"], "workspaces.teams", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("workspaces_team_members_auth_users_id_fk", ["user_id"], "auth.users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_workspaces_team_members_modified_at BEFORE
    // 	UPDATE ON workspaces_team_members FOR EACH ROW BEGIN
    // 		UPDATE workspaces_team_members
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		team_id = OLD.team_id AND user_id = OLD.user_id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("workspaces.tasks")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("team_id", "uuid", (col) => col.notNull().references("workspaces.teams.id"))
        .addColumn("name", "varchar(256)", (col) => col.notNull())
        .addColumn("description", "varchar(256)")
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        //TODO add valid_to column, max hours?
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS workspaces_tasks_modified_at BEFORE
    // 	UPDATE ON workspaces_tasks FOR EACH ROW BEGIN
    // 		UPDATE workspaces_tasks
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("workspaces.timesheet_statuses")
        .addColumn("id", "int2", (col) => col.primaryKey())
        .addColumn("name", "varchar(40)", (col) => col.notNull())
        .execute();

    await db.schema
        .createTable("workspaces.timesheets")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("user_id", "uuid", (col) => col.references("auth.users.id").notNull())
        .addColumn("task_id", "uuid", (col) => col.references("workspaces.tasks.id").notNull())
        .addColumn("status_id", "int2", (col) => col.references("workspaces.timesheet_statuses.id").notNull().defaultTo(0))
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("start_time", "timestamptz", (col) => col.notNull())
        .addColumn("end_time", "timestamptz", (col) => col.notNull().check(sql`end_time > start_time`))
        .addColumn("hours_worked", "time", (col) => col.generatedAlwaysAs(sql`end_time - start_time`).stored())
        .addForeignKeyConstraint("workspaces_timesheets_employee_id_fk", ["user_id"], "auth.users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    // await db.schema.createIndex("workspacestimesheets_employee_id").on("workspaces_timesheets").column("employee_id").execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_workspaces_timesheets_modified_at BEFORE
    // 	UPDATE ON workspaces_timesheets FOR EACH ROW BEGIN
    // 		UPDATE workspaces_timesheets
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

    await db.schema.dropTable("workspaces.timesheets").execute();
    await db.schema.dropTable("workspaces.timesheet_statuses").execute();
    await db.schema.dropTable("workspaces.tasks").execute();
    await db.schema.dropTable("workspaces.team_members").execute();
    await db.schema.dropTable("workspaces.team_invitations").execute();
    await db.schema.dropTable("workspaces.team_roles").execute();
    await db.schema.dropTable("workspaces.teams").execute();
    await db.schema.dropSchema("workspaces").execute();
}
