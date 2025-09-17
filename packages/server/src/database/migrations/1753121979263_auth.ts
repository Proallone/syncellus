import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations

    await db.schema.createSchema("auth").ifNotExists().execute();

    await db.schema
        .createTable("auth.users")
        .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
        .addColumn("public_id", "varchar(10)", (col) => col.unique().notNull())
        .addColumn("email", "varchar(256)", (col) =>
            col
                .unique()
                .notNull()
                .check(sql`LENGTH(email) >= 3`)
        )
        .addColumn("password", "varchar(256)", (col) => col.notNull().check(sql`LENGTH(password) >= 3`))
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("verified", "boolean", (col) => col.defaultTo(false))
        .addColumn("active", "boolean", (col) => col.defaultTo(false))
        .execute();

    await db.withSchema("auth").schema.createView("users_view").as(db.selectFrom("auth.users").selectAll()).execute();

    // await db.schema.createIndex("auth_user_email").on("auth.users").column("email").execute();

    // await sql`
    //     CREATE OR REPLACE FUNCTION update_auth_users_modified_at()
    //     RETURNS TRIGGER AS $$
    //     BEGIN
    //         NEW.modified_at = NOW();
    //         RETURN NEW;
    //     END;
    //     $$ LANGUAGE plpgsql;

    //     CREATE OR REPLACE TRIGGER update_auth_users_modified_at_trigger
    //     BEFORE UPDATE ON auth_users
    //     FOR EACH ROW
    //     EXECUTE FUNCTION update_auth_users_modified_at();`.execute(db);

    await db.schema
        .createTable("auth.roles")
        .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
        .addColumn("name", "varchar(40)", (col) => col.notNull())
        .addColumn("description", "varchar(256)")
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.withSchema("auth").schema.createView("roles_view").as(db.selectFrom("auth.roles").selectAll()).execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_auth_roles_modified_at BEFORE
    // 	UPDATE ON auth_roles FOR EACH ROW BEGIN
    // 		UPDATE auth_roles
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("auth.scopes")
        .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
        .addColumn("scope", "varchar(256)", (col) => col.notNull().unique())
        .addColumn("description", "varchar(256)")
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn("modified_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.withSchema("auth").schema.createView("scopes_view").as(db.selectFrom("auth.scopes").selectAll()).execute();

    // await sql`
    // 	CREATE TRIGGER IF NOT EXISTS update_auth_scopes_modified_at BEFORE
    // 	UPDATE ON auth_scopes FOR EACH ROW BEGIN
    // 		UPDATE auth_scopes
    // 		SET
    // 		modified_at = timestamptz ('now')
    // 		WHERE
    // 		id = OLD.id;
    // 	END;`.execute(db);

    await db.schema
        .createTable("auth.role_scopes")
        .addColumn("role_id", "uuid", (col) => col.notNull().references("auth.roles.id"))
        .addColumn("scope_id", "uuid", (col) => col.notNull().references("auth.scopes.id"))
        // .addPrimaryKeyConstraint("primary_key", ["role_id", "scope_id"])
        .addForeignKeyConstraint("auth_role_scopes_role_id_fk", ["role_id"], "auth.roles", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("auth_role_scopes_scope_id_fk", ["scope_id"], "auth.scopes", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.withSchema("auth").schema.createView("role_scopes_view").as(db.selectFrom("auth.role_scopes").selectAll()).execute();

    await db.schema
        .createTable("auth.user_roles")
        .addColumn("user_id", "uuid", (col) => col.notNull().references("auth.users.id"))
        .addColumn("role_id", "uuid", (col) => col.notNull().references("auth.roles.id"))
        .addPrimaryKeyConstraint("primary_key", ["user_id", "role_id"])
        .addForeignKeyConstraint("auth_user_role_user_id_fk", ["user_id"], "auth.users", ["id"], (cb) => cb.onDelete("cascade"))
        .addForeignKeyConstraint("auth_user_roles_role_id_fk", ["role_id"], "auth.roles", ["id"], (cb) => cb.onDelete("cascade"))
        .execute();

    await db.withSchema("auth").schema.createView("user_roles_view").as(db.selectFrom("auth.user_roles").selectAll()).execute();
    // await db
    //     .withSchema("auth")
    //     .schema.createView("user_roles_names_view")
    //     .as(db.selectFrom("auth.user_roles").innerJoin("auth.roles", "auth.user_roles.role_id", "auth.roles.id").innerJoin("auth.users", "auth.users.id", "auth.user_roles.user_id").select(["auth.roles.name", "auth.users.id"])).execute();

    await db.schema
        .createTable("auth.password_reset_tokens")
        .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
        .addColumn("user_id", "uuid", (col) => col.notNull().unique().references("auth.users.id"))
        .addColumn("token_hash", "uuid", (col) => col.notNull())
        .addColumn("expires_at", "timestamptz", (col) => col.defaultTo(sql`now() + interval '15 minutes'`).notNull()) //TODO minutes from config
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.withSchema("auth").schema.createView("password_reset_tokens_view").as(db.selectFrom("auth.password_reset_tokens").selectAll()).execute();

    await db.schema
        .createTable("auth.email_verification_tokens")
        .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
        .addColumn("user_id", "uuid", (col) => col.notNull().unique().references("auth.users.id"))
        .addColumn("token_hash", "varchar(64)", (col) => col.notNull())
        .addColumn("expires_at", "timestamptz", (col) => col.defaultTo(sql`now() + interval '1 day'`).notNull()) //TODO minutes from config
        .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.withSchema("auth").schema.createView("email_verification_tokens_view").as(db.selectFrom("auth.email_verification_tokens").selectAll()).execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await db.withSchema("auth").schema.dropView("email_verification_tokens_view").execute();
    await db.schema.dropTable("auth.email_verification_tokens").execute();

    await db.withSchema("auth").schema.dropView("password_reset_tokens_view").execute();
    await db.schema.dropTable("auth.password_reset_tokens").execute();

    // await db.withSchema("auth").schema.dropView("user_roles_names_view").execute();
    await db.withSchema("auth").schema.dropView("user_roles_view").execute();
    await db.schema.dropTable("auth.user_roles").execute();

    await db.withSchema("auth").schema.dropView("role_scopes_view").execute();
    await db.schema.dropTable("auth.role_scopes").execute();

    await db.withSchema("auth").schema.dropView("scopes_view").execute();
    await db.schema.dropTable("auth.scopes").execute();

    await db.withSchema("auth").schema.dropView("roles_view").execute();
    await db.schema.dropTable("auth.roles").execute();

    // await db.schema.dropIndex("auth_user_email").execute();
    await db.withSchema("auth").schema.dropView("users_view").execute();
    await db.schema.dropTable("auth.users").execute();

    await db.schema.dropSchema("auth").execute();
}
