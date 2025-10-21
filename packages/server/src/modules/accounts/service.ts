import type { AccountsRepository } from "@syncellus/modules/accounts/repository.ts";
import type { AccountsProfiles } from "@syncellus/types/database.d.ts";
import type { GetEmployeeQuery } from "@syncellus/types/index.d.ts";
import type { Insertable, Updateable } from "kysely";
import { uuidv7 } from "uuidv7";

export class AccountsService {
  constructor(private readonly repo: AccountsRepository) {}

  public insertNewAccount = async (account: Insertable<AccountsProfiles>) => {
    return await this.repo.insertNewAccountToDb({ id: uuidv7(), ...account });
  };

  public selectAllAccounts = async (query: GetEmployeeQuery) => {
    return await this.repo.selectAllAccountsFromDb(query);
  };

  public selectOneAccountById = async (id: string) => {
    return await this.repo.selectOneAccountByIdFromDb(id);
  };

  public updateAccountById = async (account: Updateable<AccountsProfiles>) => {
    return await this.repo.updateAccountByIdInDb(account);
  };

  public deleteAccountById = async (id: string) => {
    return await this.repo.deleteAccountByIdInDb(id);
  };
}
