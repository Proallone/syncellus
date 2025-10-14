import { type Kysely, sql } from "kysely";
import { createUpdateTimestampTrigger } from "../utils/triggers.ts";

export const schema = "auth";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.\
// biome-ignore lint/suspicious/noExplicitAny: required by library
export async function up(db: Kysely<any>): Promise<void> {
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema.createSchema(schema).ifNotExists().execute();

  await db
    .withSchema(schema)
    .schema.createTable("users")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn("public_id", "varchar(10)", (col) => col.unique().notNull())
    .addColumn(
      "email",
      "varchar(256)",
      (col) => col.unique().notNull().check(sql`LENGTH(email) >= 3`),
    )
    .addColumn("password", "varchar(256)", (col) => col.notNull())
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn(
      "modified_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn("verified", "boolean", (col) => col.defaultTo(false))
    .addColumn("active", "boolean", (col) => col.defaultTo(false))
    .execute();

  await db
    .withSchema(schema)
    .schema.createView("users_view")
    .as(db.selectFrom(`${schema}.users`).selectAll())
    .execute();

  // await db.schema.createIndex("auth_user_email").on("auth.users").column("email").execute();

  await createUpdateTimestampTrigger(schema, "users").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("roles")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn("name", "varchar(40)", (col) => col.notNull())
    .addColumn("description", "varchar(256)")
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn(
      "modified_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "roles").execute(db);

  await db
    .withSchema(schema)
    .schema.createView("roles_view")
    .as(db.selectFrom(`${schema}.roles`).selectAll())
    .execute();

  // await sql`
  // 	CREATE TRIGGER IF NOT EXISTS update_auth_roles_modified_at BEFORE
  // 	UPDATE ON auth_roles FOR EACH ROW BEGIN
  // 		UPDATE auth_roles
  // 		SET
  // 		modified_at = timestamptz ('now')
  // 		WHERE
  // 		id = OLD.id;
  // 	END;`.execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("scopes")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn("scope", "varchar(256)", (col) => col.notNull().unique())
    .addColumn("description", "varchar(256)")
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn(
      "modified_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "scopes").execute(db);

  await db
    .withSchema(schema)
    .schema.createView("scopes_view")
    .as(db.selectFrom(`${schema}.scopes`).selectAll())
    .execute();

  // await sql`
  // 	CREATE TRIGGER IF NOT EXISTS update_auth_scopes_modified_at BEFORE
  // 	UPDATE ON auth_scopes FOR EACH ROW BEGIN
  // 		UPDATE auth_scopes
  // 		SET
  // 		modified_at = timestamptz ('now')
  // 		WHERE
  // 		id = OLD.id;
  // 	END;`.execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("role_scopes")
    .addColumn(
      "role_id",
      "uuid",
      (col) => col.references(`${schema}.roles.id`).notNull(),
    )
    .addColumn(
      "scope_id",
      "uuid",
      (col) => col.references(`${schema}.scopes.id`).notNull(),
    )
    // .addPrimaryKeyConstraint("primary_key", ["role_id", "scope_id"])
    .addForeignKeyConstraint(
      "auth_role_scopes_role_id_fk",
      ["role_id"],
      `${schema}.roles`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "auth_role_scopes_scope_id_fk",
      ["scope_id"],
      `${schema}.scopes`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await db
    .withSchema(schema)
    .schema.createView("role_scopes_view")
    .as(db.selectFrom(`${schema}.role_scopes`).selectAll())
    .execute();

  await db
    .withSchema(schema)
    .schema.createTable("user_roles")
    .addColumn(
      "user_id",
      "uuid",
      (col) => col.references(`${schema}.users.id`).notNull(),
    )
    .addColumn(
      "role_id",
      "uuid",
      (col) => col.references(`${schema}.roles.id`).notNull(),
    )
    .addPrimaryKeyConstraint("user_roles_pkey", ["user_id", "role_id"])
    .addForeignKeyConstraint(
      "auth_user_role_user_id_fk",
      ["user_id"],
      `${schema}.users`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "auth_user_roles_role_id_fk",
      ["role_id"],
      `${schema}.roles`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await db
    .withSchema(schema)
    .schema.createView("user_roles_view")
    .as(db.selectFrom(`${schema}.user_roles`).selectAll())
    .execute();
  // await db
  //     .withSchema("auth")
  //     .schema.createView("user_roles_names_view")
  //     .as(db.selectFrom("auth.user_roles").innerJoin("auth.roles", "auth.user_roles.role_id", "auth.roles.id").innerJoin("auth.users", "auth.users.id", "auth.user_roles.user_id").select(["auth.roles.name", "auth.users.id"])).execute();

  await db
    .withSchema(schema)
    .schema.createTable("password_reset_tokens")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn(
      "user_id",
      "uuid",
      (col) => col.references(`${schema}.users.id`).notNull().unique(),
    )
    .addColumn("token_hash", "varchar(64)", (col) => col.notNull())
    .addColumn(
      "expires_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now() + interval '15 minutes'`).notNull(),
    ) //TODO minutes from config
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db
    .withSchema(schema)
    .schema.createView("password_reset_tokens_view")
    .as(db.selectFrom(`${schema}.password_reset_tokens`).selectAll())
    .execute();

  await db
    .withSchema(schema)
    .schema.createTable("email_verification_tokens")
    .addColumn("id", "uuid", (col) => col.primaryKey().notNull())
    .addColumn(
      "user_id",
      "uuid",
      (col) => col.references("auth.users.id").notNull().unique(),
    )
    .addColumn("token_hash", "varchar(64)", (col) => col.notNull())
    .addColumn(
      "expires_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now() + interval '1 day'`).notNull(),
    ) //TODO minutes from config
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "email_verification_tokens")
    .execute(db);

  await db
    .withSchema(schema)
    .schema.createView("email_verification_tokens_view")
    .as(db.selectFrom(`${schema}.email_verification_tokens`).selectAll())
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// biome-ignore lint/suspicious/noExplicitAny: required by library
export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.withSchema(schema).schema.dropView("email_verification_tokens_view")
    .execute();
  await db.withSchema(schema).schema.dropTable("email_verification_tokens")
    .execute();

  await db.withSchema(schema).schema.dropView("password_reset_tokens_view")
    .execute();
  await db.withSchema(schema).schema.dropTable("password_reset_tokens")
    .execute();

  await db.withSchema(schema).schema.dropView("user_roles_view").execute();
  await db.withSchema(schema).schema.dropTable("user_roles").execute();

  await db.withSchema(schema).schema.dropView("role_scopes_view").execute();
  await db.withSchema(schema).schema.dropTable("role_scopes").execute();

  await db.withSchema(schema).schema.dropView("scopes_view").execute();
  await db.withSchema(schema).schema.dropTable("scopes").execute();

  await db.withSchema(schema).schema.dropView("roles_view").execute();
  await db.withSchema(schema).schema.dropTable("roles").execute();

  await db.withSchema(schema).schema.dropView("users_view").execute();
  await db.withSchema(schema).schema.dropTable("users").execute();

  await db.schema.dropSchema(schema).execute();
}
