import type { AccountsProfiles, DB } from "@syncellus/types/database.d.ts";
import type { GetEmployeeQuery } from "@syncellus/types/index.d.ts";
import type { Insertable, Kysely, Updateable } from "kysely";

export class AccountsRepository {
  constructor(private readonly db: Kysely<DB>) {}

  public insertNewAccountToDb = async (
    account: Insertable<AccountsProfiles>,
  ) => {
    return await this.db.insertInto("accounts.profiles").values(account)
      .returningAll().executeTakeFirstOrThrow();
  };

  public selectAllAccountsFromDb = async (_query: GetEmployeeQuery) => {
    const q = this.db
      .selectFrom("accounts.profiles")
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

    // if (query.active) q = q.where("active", "=", query.active); //? no boolean in sqlite...

    return await q.execute();
  };

  public selectOneAccountByIdFromDb = async (id: string) => {
    return await this.db
      .selectFrom("accounts.profiles")
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

  public updateAccountByIdInDb = async (
    account: Updateable<AccountsProfiles>,
  ) => {
    return await this.db.updateTable("accounts.profiles").set(account).where(
      "id",
      "=",
      account.id,
    ).returningAll().executeTakeFirst();
  };

  public deleteAccountByIdInDb = async (id: string) => {
    return await this.db.deleteFrom("accounts.profiles").where("id", "=", id)
      .executeTakeFirst();
  };
}
