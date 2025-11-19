import type { AccountsProfiles } from "@syncellus/hono/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { generate as uuidv7 } from "@std/uuid/unstable-v7";
import {
	deleteAccountByIdInDb,
	insertNewAccountToDb,
	selectAllAccountsFromDb,
	selectOneAccountByIdFromDb,
	updateAccountByIdInDb,
} from "@syncellus/hono/modules/accounts/repository.ts";

export const insertNewAccount = async (account: Insertable<AccountsProfiles>) => {
	return await insertNewAccountToDb({ ...account, id: uuidv7() });
};

export const selectAllAccounts = async () => {
	return await selectAllAccountsFromDb();
};

export const selectOneAccountById = async (id: string) => {
	return await selectOneAccountByIdFromDb(id);
};

export const updateAccountById = async (account: Updateable<AccountsProfiles>) => {
	return await updateAccountByIdInDb(account);
};

export const deleteAccountById = async (id: string) => {
	return await deleteAccountByIdInDb(id);
};
