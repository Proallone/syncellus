import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema
        .createTable("workspaces_teams")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("public_id", "text", (col) => col.notNull().check(sql`LENGTH(public_id) = 10`))
        .addColumn("owner_id", "text", (col) =>
            col
                .references("auth_users.id")
                .notNull()
                .check(sql`LENGTH(owner_id) = 36`)
        )
        .addColumn("name", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(name) < 256`)
                .notNull()
        )
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("workspaces_teams_user_id_fk", ["owner_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_teams_modified_at BEFORE
		UPDATE ON workspaces_teams FOR EACH ROW BEGIN
			UPDATE workspaces_teams
			SET
			modified_at = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("workspaces_team_roles")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("name", "text", (col) =>
            col
                .unique()
                .check(sql`LENGTH(description) < 256`)
                .notNull()
        )
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) < 256`))
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_team_roles_modified_at BEFORE
		UPDATE ON workspaces_team_roles FOR EACH ROW BEGIN
			UPDATE workspaces_team_roles
			SET
			modified_at = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    //TODO add invited_by email?
    await db.schema
        .createTable("workspaces_team_invitations")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("team_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(team_id) = 36`)
                .references("workspaces_teams.id")
        )
        .addColumn("invited_email", "text", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(invited_email) >= 3 AND LENGTH(invited_email) <= 255`)
        )
        .addColumn("status", "text", (col) => col.notNull().defaultTo("pending")) //todo handle better
        .addColumn("invitation_token", "text", (col) => col.notNull().check(sql`LENGTH(invitation_token) = 64`))
        .addColumn("expires_at", "datetime", (col) => col.defaultTo(sql`(datetime('now', '+7 days'))`).notNull()) //TODO time from config
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS workspaces_team_invitations_modified_at BEFORE
		UPDATE ON workspaces_team_invitations FOR EACH ROW BEGIN
			UPDATE workspaces_team_invitations
			SET
			modified_at = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("workspaces_team_members")
        .addColumn("team_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(team_id) = 36`)
                .references("workspaces_teams.id")
        )
        .addColumn("user_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(user_id) = 36`)
                .references("auth_users.id")
        )
        .addColumn("role_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(role_id) = 36`)
                .references("workspaces_team_roles.id")
        )
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("workspaces_team_members_team_id_fk", ["team_id"], "workspaces_teams", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("workspaces_team_members_auth_users_id_fk", ["user_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_team_members_modified_at BEFORE
		UPDATE ON workspaces_team_members FOR EACH ROW BEGIN
			UPDATE workspaces_team_members
			SET
			modified_at = datetime ('now')
			WHERE
			team_id = OLD.team_id AND user_id = OLD.user_id;
		END;`.execute(db);

    await db.schema
        .createTable("workspaces_tasks")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("team_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(team_id) = 36`)
                .references("workspaces_teams.id")
        )
        .addColumn("name", "text", (col) => col.check(sql`LENGTH(description) < 256`).notNull())
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) < 256`))
        .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        //TODO add valid_to column, max hours?
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS workspaces_tasks_modified_at BEFORE
		UPDATE ON workspaces_tasks FOR EACH ROW BEGIN
			UPDATE workspaces_tasks
			SET
			modified_at = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("workspaces_timesheets")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("employee_id", "text", (col) =>
            col
                .references("accounts_profiles.id")
                .notNull()
                .check(sql`LENGTH(employee_id) = 36`)
        )
        .addColumn("task_id", "text", (col) =>
            col
                .references("workspaces_tasks.id")
                .notNull()
                .check(sql`LENGTH(task_id) = 36`)
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
        .addForeignKeyConstraint("workspaces_timesheets_employee_id_fk", ["employee_id"], "accounts_profiles", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.schema.createIndex("workspaces_timesheets_employee_id").on("workspaces_timesheets").column("employee_id").execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_timesheets_modified_at BEFORE
		UPDATE ON workspaces_timesheets FOR EACH ROW BEGIN
			UPDATE workspaces_timesheets
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

    await db.schema.dropTable("workspaces_timesheets").execute();
    await db.schema.dropTable("workspaces_tasks").execute();
    await db.schema.dropTable("workspaces_team_members").execute();
    await db.schema.dropTable("workspaces_team_invitations").execute();
    await db.schema.dropTable("workspaces_team_roles").execute();
    await db.schema.dropTable("workspaces_teams").execute();
}
