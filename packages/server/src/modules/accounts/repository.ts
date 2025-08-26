import type { Database, EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { Kysely } from "kysely";

export class AccountsRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewAccountToDb = async (employee: NewEmployee) => {
        return await this.db.insertInto("accounts_profiles").values(employee).returningAll().executeTakeFirstOrThrow();
    };

    public selectAllAccountsFromDb = async (query: GetEmployeeQuery) => {
        let q = this.db
            .selectFrom("accounts_profiles")
            .leftJoin("auth_users", "accounts_profiles.user_id", "auth_users.id")
            .select(["accounts_profiles.id", "name", "surname", "email", "is_active", "role", "auth_users.createdAt", "auth_users.modifiedAt"]);

        if (query.is_active) q = q.where("is_active", "=", query.is_active === "true" ? 1 : 0); //? no boolean in sqlite...

        if (query.role) q = q.where("role", "in", query.role.split(","));

        return await q.execute();
    };

    public selectOneAccountByIdFromDb = async (id: string) => {
        return await this.db
            .selectFrom("accounts_profiles")
            .leftJoin("auth_users", "accounts_profiles.user_id", "auth_users.id")
            .select(["accounts_profiles.id", "name", "surname", "email", "is_active", "role", "auth_users.createdAt", "auth_users.modifiedAt"])
            .where("auth_users.id", "=", id)
            .executeTakeFirst();
    };

    public updateAccountByIdInDb = async (employee: EmployeeUpdate) => {
        return await this.db.updateTable("accounts_profiles").set(employee).where("id", "=", employee.id).returningAll().executeTakeFirst();
    };

    public deleteAccountByIdInDb = async (id: string) => {
        return await this.db.deleteFrom("accounts_profiles").where("id", "=", id).executeTakeFirst();
    };
}
