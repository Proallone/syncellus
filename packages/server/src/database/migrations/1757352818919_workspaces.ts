import { type Kysely, sql } from "kysely";
import { createUpdateTimestampTrigger } from "../utils/triggers.ts";
import { schema as auth_schema } from "./1753121979263_auth.ts";

export const schema = "workspaces";
// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// deno-lint-ignore no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations

  await db.schema.createSchema("workspaces").ifNotExists().execute();

  await db
    .withSchema(schema)
    .schema.createTable("teams")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("public_id", "varchar(10)", (col) => col.notNull())
    .addColumn(
      "owner_id",
      "uuid",
      (col) => col.references(`${auth_schema}.users.id`).notNull(),
    )
    .addColumn("name", "varchar(256)", (col) => col.notNull())
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
    .addForeignKeyConstraint(
      "workspaces_teams_user_id_fk",
      ["owner_id"],
      `${auth_schema}.users`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "teams").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("team_roles")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar(256)", (col) => col.unique().notNull())
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

  await createUpdateTimestampTrigger(schema, "team_roles").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("invitation_statuses")
    .addColumn("id", "int2", (col) => col.primaryKey())
    .addColumn("name", "varchar(40)", (col) => col.notNull())
    .execute();

  //TODO add invited_by email?
  await db
    .withSchema(schema)
    .schema.createTable("team_invitations")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn(
      "team_id",
      "uuid",
      (col) => col.notNull().references(`${schema}.teams.id`),
    )
    .addColumn(
      "invited_email",
      "varchar(256)",
      (col) => col.unique().notNull().check(sql`LENGTH(invited_email) >= 3`),
    )
    .addColumn(
      "status_id",
      "int2",
      (col) =>
        col.notNull().references(`${schema}.invitation_statuses.id`).defaultTo(
          0,
        ),
    )
    .addColumn("invitation_token", "varchar(64)", (col) => col.notNull())
    .addColumn(
      "expires_at",
      "timestamptz",
      (col) => col.defaultTo(sql`now() + interval '7 days'`).notNull(),
    ) //TODO time from config
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

  await createUpdateTimestampTrigger(schema, "team_invitations").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("team_members")
    .addColumn(
      "team_id",
      "uuid",
      (col) => col.notNull().references(`${schema}.teams.id`),
    )
    .addColumn(
      "user_id",
      "uuid",
      (col) => col.notNull().references(`${auth_schema}.users.id`),
    )
    .addColumn(
      "role_id",
      "uuid",
      (col) => col.notNull().references(`${schema}.team_roles.id`),
    )
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
    .addForeignKeyConstraint(
      "workspaces_team_members_team_id_fk",
      ["team_id"],
      `${schema}.teams`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "workspaces_team_members_auth_users_id_fk",
      ["user_id"],
      `${auth_schema}.users`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "team_members").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("tasks")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn(
      "team_id",
      "uuid",
      (col) => col.notNull().references(`${schema}.teams.id`),
    )
    .addColumn("name", "varchar(256)", (col) => col.notNull())
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
    //TODO add valid_to column, max hours?
    .execute();

  await createUpdateTimestampTrigger(schema, "tasks").execute(db);

  await db
    .withSchema(schema)
    .schema.createTable("timesheet_statuses")
    .addColumn("id", "int2", (col) => col.primaryKey())
    .addColumn("name", "varchar(40)", (col) => col.notNull())
    .execute();

  await db
    .withSchema(schema)
    .schema.createTable("timesheets")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn(
      "user_id",
      "uuid",
      (col) => col.references(`${auth_schema}.users.id`).notNull(),
    )
    .addColumn(
      "task_id",
      "uuid",
      (col) => col.references(`${schema}.tasks.id`).notNull(),
    )
    .addColumn(
      "status_id",
      "int2",
      (col) =>
        col.references(`${schema}.timesheet_statuses.id`).notNull().defaultTo(
          0,
        ),
    )
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
    .addColumn("start_time", "timestamptz", (col) => col.notNull())
    .addColumn(
      "end_time",
      "timestamptz",
      (col) => col.notNull().check(sql`end_time > start_time`),
    )
    .addColumn(
      "hours_worked",
      "time",
      (col) => col.generatedAlwaysAs(sql`end_time - start_time`).stored(),
    )
    .addForeignKeyConstraint(
      "workspaces_timesheets_employee_id_fk",
      ["user_id"],
      `${auth_schema}.users`,
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await createUpdateTimestampTrigger(schema, "timesheets").execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
// deno-lint-ignore no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations

  await db.withSchema(schema).schema.dropTable("timesheets").execute();
  await db.withSchema(schema).schema.dropTable("timesheet_statuses").execute();
  await db.withSchema(schema).schema.dropTable("tasks").execute();
  await db.withSchema(schema).schema.dropTable("team_members").execute();
  await db.withSchema(schema).schema.dropTable("team_invitations").execute();
  await db.withSchema(schema).schema.dropTable("invitation_statuses").execute();
  await db.withSchema(schema).schema.dropTable("team_roles").execute();
  await db.withSchema(schema).schema.dropTable("teams").execute();
  await db.schema.dropSchema("workspaces").execute();
}
