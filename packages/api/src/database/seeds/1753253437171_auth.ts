import type { AuthRoles, AuthRoleScopes, AuthScopes, AuthUserRoles, AuthUsers, DB } from "@syncellus/types/database.d.ts";
import type { Insertable, Kysely } from "kysely";
import { schema } from "@syncellus/database/migrations/1753121979263_auth.ts";

const users: Insertable<AuthUsers>[] = [
	{
		id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
		public_id: "84ghpuj191",
		email: "bartek@test.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
		verified: false,
		active: true,
	},
	{
		id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
		public_id: "vigdb4t07d",
		email: "bartek@admin.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
		verified: true,
		active: true,
	},
	{
		id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
		public_id: "pffza5gbco",
		email: "bartek@manager.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
		verified: true,
		active: true,
	},
	{
		id: "0198e817-6726-75fb-be07-6edf8bdd9421",
		public_id: "081ddcee2d",
		email: "bartek@inactive.com",
		password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
		verified: true,
		active: false,
	},
];

const roles: Insertable<AuthRoles>[] = [
	{
		id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
		name: "admin",
		description: "Standard administrator role",
	},
	{
		id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
		name: "user",
		description: "Standard user role",
	},
];

const scopes: Insertable<AuthScopes>[] = [
	{
		id: "0198f237-5cc2-76be-92fb-9e00e52ad827",
		scope: "auth_users:read",
		description: "read scope for auth_users",
	},
	{
		id: "0198f237-5cc2-7980-a50f-e0ff18289301",
		scope: "auth_users:write",
		description: "write scope for auth_users",
	},
];

const role_scopes: Insertable<AuthRoleScopes>[] = [
	{
		role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
		scope_id: "0198f237-5cc2-76be-92fb-9e00e52ad827",
	},
	{
		role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
		scope_id: "0198f237-5cc2-7980-a50f-e0ff18289301",
	},
	{
		role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
		scope_id: "0198f237-5cc2-7980-a50f-e0ff18289301",
	},
];

const user_roles: Insertable<AuthUserRoles>[] = [
	{
		user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
		role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
	},
	{
		user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
		role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
	},
	{
		user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
		role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
	},
	{
		user_id: "0198e817-6726-75fb-be07-6edf8bdd9421",
		role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
	},
];

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.insertInto(`${schema}.users`).values(users).execute();
	await db.insertInto(`${schema}.roles`).values(roles).execute();
	await db.insertInto(`${schema}.scopes`).values(scopes).execute();
	await db.insertInto(`${schema}.role_scopes`).values(role_scopes).execute();
	await db.insertInto(`${schema}.user_roles`).values(user_roles).execute();
}
