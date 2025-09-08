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
        .addColumn("public_id", "text", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(public_id) = 10`)
        )
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
        .addColumn("createdAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("workspaces_teams_user_id_fk", ["owner_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_teams_modifiedAt BEFORE
		UPDATE ON workspaces_teams FOR EACH ROW BEGIN
			UPDATE workspaces_teams
			SET
			modifiedAT = datetime ('now')
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
        .addColumn("user_id", "text", (col) => col.check(sql`LENGTH(user_id) = 36`).references("auth_users.id"))
        .addColumn("role", "text", (col) => col.notNull().defaultTo("member")) //TODO add enum or roles entity?
        .addColumn("createdAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "datetime", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addForeignKeyConstraint("workspaces_team_members_team_id_fk", ["team_id"], "workspaces_teams", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("workspaces_team_members_auth_users_id_fk", ["user_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_workspaces_team_members_modifiedAt BEFORE
		UPDATE ON workspaces_team_members FOR EACH ROW BEGIN
			UPDATE workspaces_team_members
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

    await db.schema.dropTable("workspaces_team_members").execute();
    await db.schema.dropTable("workspaces_teams").execute();
}
