import type { AccountsProfiles } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { DatabaseService } from "@syncellus/database/database.ts";

const db = DatabaseService.getInstance();

const PROFILES_TABLE = "accounts.profiles" as const;

export const insertNewAccountToDb = async (
	account: Insertable<AccountsProfiles>,
) => {
	return await db.insertInto(PROFILES_TABLE).values(account)
		.returningAll().executeTakeFirstOrThrow();
};

export const selectAllAccountsFromDb = async () => {
	const q = db
		.selectFrom(PROFILES_TABLE)
		.leftJoin("auth.users", "accounts.profiles.user_id", "auth.users.id")
		.select([
			"accounts.profiles.id",
			"name",
			"surname",
			"email",
			"active",
			"auth.users.created_at",
			"auth.users.modified_at",
		]);
	return await q.execute();
};

export const selectOneAccountByIdFromDb = async (id: string) => {
	return await db
		.selectFrom(PROFILES_TABLE)
		.leftJoin("auth.users", "accounts.profiles.user_id", "auth.users.id")
		.select([
			"accounts.profiles.id",
			"name",
			"surname",
			"email",
			"active",
			"auth.users.created_at",
			"auth.users.modified_at",
		])
		.where("auth.users.id", "=", id)
		.executeTakeFirst();
};

export const updateAccountByIdInDb = async (
	account: Updateable<AccountsProfiles>,
) => {
	return await db.updateTable(PROFILES_TABLE).set(account).where(
		"id",
		"=",
		account.id!,
	).returningAll().executeTakeFirst();
};

export const deleteAccountByIdInDb = async (id: string) => {
	return await db.deleteFrom(PROFILES_TABLE).where("id", "=", id)
		.executeTakeFirst();
};
