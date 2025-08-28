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
        .execute();

    await db.schema.createIndex("auth_user_email").on("auth_users").column("email").execute();

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
        .createTable("auth_roles")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("name", "text", (col) => col.notNull().check(sql`LENGTH(name) <= 40`))
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) <= 256`))
        .addColumn("createdAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_auth_roles_modifiedAt BEFORE
		UPDATE ON auth_roles FOR EACH ROW BEGIN
			UPDATE auth_roles
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("auth_scopes")
        .addColumn("id", "text", (col) => col.primaryKey().check(sql`LENGTH(id) = 36`))
        .addColumn("scope", "text", (col) =>
            col
                .notNull()
                .unique()
                .check(sql`LENGTH(scope) <= 256`)
        )
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) <= 256`))
        .addColumn("createdAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modifiedAt", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    await sql`
		CREATE TRIGGER IF NOT EXISTS update_auth_scopes_modifiedAt BEFORE
		UPDATE ON auth_scopes FOR EACH ROW BEGIN
			UPDATE auth_scopes
			SET
			modifiedAT = datetime ('now')
			WHERE
			id = OLD.id;
		END;`.execute(db);

    await db.schema
        .createTable("auth_role_scopes")
        .addColumn("role_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(role_id) = 36`)
                .references("auth_roles.id")
        )
        .addColumn("scope_id", "text", (col) =>
            col
                .notNull()
                .check(sql`LENGTH(scope_id) = 36`)
                .references("auth_scopes.id")
        )
        .addForeignKeyConstraint("auth_role_scopes_role_id_fk", ["role_id"], "auth_roles", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("auth_role_scopes_scope_id_fk", ["scope_id"], "auth_scopes", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await db.schema.dropTable("auth_role_scopes").execute();

    await sql`DROP TRIGGER IF EXISTS update_auth_scopes_modifiedAt;`.execute(db);
    await db.schema.dropTable("auth_scopes").execute();

    await sql`DROP TRIGGER IF EXISTS update_auth_roles_modifiedAt;`.execute(db);
    await db.schema.dropTable("auth_roles").execute();

    await sql`DROP TRIGGER IF EXISTS update_auth_users_modifiedAt;`.execute(db);
    await db.schema.dropIndex("auth_user_email").execute();
    await db.schema.dropTable("auth_users").execute();
    await sql`PRAGMA journal_mode=DELETE;`.execute(db);
}
