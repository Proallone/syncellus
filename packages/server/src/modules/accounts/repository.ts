import type { Database, EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { Kysely } from "kysely";

export class AccountsRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewAccountToDb = async (account: NewEmployee) => {
        return await this.db.insertInto("accounts_profiles").values(account).returningAll().executeTakeFirstOrThrow();
    };

    public selectAllAccountsFromDb = async (_query: GetEmployeeQuery) => {
        const q = this.db
            .selectFrom("accounts_profiles")
            .leftJoin("auth_users", "accounts_profiles.user_id", "auth_users.id")
            .select(["accounts_profiles.id", "name", "surname", "email", "active", "auth_users.createdAt", "auth_users.modifiedAt"]);

        // if (query.active) q = q.where("active", "=", query.active); //? no boolean in sqlite...

        return await q.execute();
    };

    public selectOneAccountByIdFromDb = async (id: string) => {
        return await this.db
            .selectFrom("accounts_profiles")
            .leftJoin("auth_users", "accounts_profiles.user_id", "auth_users.id")
            .select(["accounts_profiles.id", "name", "surname", "email", "active", "auth_users.createdAt", "auth_users.modifiedAt"])
            .where("auth_users.id", "=", id)
            .executeTakeFirst();
    };

    public updateAccountByIdInDb = async (account: EmployeeUpdate) => {
        return await this.db.updateTable("accounts_profiles").set(account).where("id", "=", account.id).returningAll().executeTakeFirst();
    };

    public deleteAccountByIdInDb = async (id: string) => {
        return await this.db.deleteFrom("accounts_profiles").where("id", "=", id).executeTakeFirst();
    };
}
