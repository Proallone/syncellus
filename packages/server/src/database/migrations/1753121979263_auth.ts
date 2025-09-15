import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema
        .createTable("auth_users")
        .addColumn("id", "text", (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`LENGTH(id) = 36`)
        )
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
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("verified", "integer", (col) => col.defaultTo(0))
        .addColumn("active", "integer", (col) => col.defaultTo(0))
        .execute();

    await db.schema.createIndex("auth_user_email").on("auth_users").column("email").execute();

    await sql`
        CREATE OR REPLACE FUNCTION update_auth_users_modified_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.modified_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE TRIGGER update_auth_users_modified_at_trigger
        BEFORE UPDATE ON auth_users
        FOR EACH ROW
        EXECUTE FUNCTION update_auth_users_modified_at();`.execute(db);

    await db.schema
        .createTable("auth_roles")
        .addColumn("id", "text", (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`LENGTH(id) = 36`)
        )
        .addColumn("name", "text", (col) => col.notNull().check(sql`LENGTH(name) <= 40`))
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) <= 256`))
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_auth_roles_modified_at BEFORE
    // 	UPDATE ON auth_roles FOR EACH ROW BEGIN
    // 		UPDATE auth_roles
    // 		SET
    // 		modified_at = timestamp ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("auth_scopes")
        .addColumn("id", "text", (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`LENGTH(id) = 36`)
        )
        .addColumn("scope", "text", (col) =>
            col
                .notNull()
                .unique()
                .check(sql`LENGTH(scope) <= 256`)
        )
        .addColumn("description", "text", (col) => col.check(sql`LENGTH(description) <= 256`))
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .addColumn("modified_at", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
        .execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_auth_scopes_modified_at BEFORE
    // 	UPDATE ON auth_scopes FOR EACH ROW BEGIN
    // 		UPDATE auth_scopes
    // 		SET
    // 		modified_at = timestamp ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

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
        // .addPrimaryKeyConstraint("primary_key", ["role_id", "scope_id"])
        .addForeignKeyConstraint("auth_role_scopes_role_id_fk", ["role_id"], "auth_roles", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("auth_role_scopes_scope_id_fk", ["scope_id"], "auth_scopes", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.schema
        .createTable("auth_user_roles")
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
                .references("auth_roles.id")
        )
        .addPrimaryKeyConstraint("primary_key", ["user_id", "role_id"])
        .addForeignKeyConstraint("auth_user_role_user_id_fk", ["user_id"], "auth_users", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("auth_user_roles_role_id_fk", ["role_id"], "auth_roles", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.schema
        .createTable("auth_password_reset_tokens")
        .addColumn("id", "text", (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`LENGTH(id) = 36`)
        )
        .addColumn("user_id", "text", (col) =>
            col
                .notNull()
                .unique()
                .check(sql`LENGTH(user_id) = 36`)
                .references("auth_users.id")
        )
        .addColumn("token_hash", "text", (col) => col.notNull().check(sql`LENGTH(token_hash) = 64`))
        .addColumn("expires_at", "timestamp", (col) => col.defaultTo(sql`now() + interval '15 minutes'`).notNull()) //TODO minutes from config
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.schema
        .createTable("auth_email_verification_tokens")
        .addColumn("id", "text", (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`LENGTH(id) = 36`)
        )
        .addColumn("user_id", "text", (col) =>
            col
                .notNull()
                .unique()
                .check(sql`LENGTH(user_id) = 36`)
                .references("auth_users.id")
        )
        .addColumn("token_hash", "text", (col) => col.notNull().check(sql`LENGTH(token_hash) = 64`))
        .addColumn("expires_at", "timestamp", (col) => col.defaultTo(sql`now() + interval '1 day'`).notNull()) //TODO minutes from config
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await db.schema.dropTable("auth_email_verification_tokens").execute();

    await db.schema.dropTable("auth_password_reset_tokens").execute();

    await db.schema.dropTable("auth_user_roles").execute();

    await db.schema.dropTable("auth_role_scopes").execute();

    await db.schema.dropTable("auth_scopes").execute();

    await db.schema.dropTable("auth_roles").execute();

    await db.schema.dropIndex("auth_user_email").execute();
    await db.schema.dropTable("auth_users").execute();
}
