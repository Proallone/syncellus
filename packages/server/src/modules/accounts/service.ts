import type { EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { AccountsRepository } from "@syncellus/modules/accounts/repository.js";
import { uuidv7 } from "uuidv7";

export class AccountsService {
    constructor(private readonly repo: AccountsRepository) {}

    public insertNewAccount = async (account: NewEmployee) => {
        return await this.repo.insertNewAccountToDb({ id: uuidv7(), ...account });
    };

    public selectAllAccounts = async (query: GetEmployeeQuery) => {
        return await this.repo.selectAllAccountsFromDb(query);
    };

    public selectOneAccountById = async (id: string) => {
        return await this.repo.selectOneAccountByIdFromDb(id);
    };

    public updateAccountById = async (account: EmployeeUpdate) => {
        return await this.repo.updateAccountByIdInDb(account);
    };

    public deleteAccountById = async (id: string) => {
        return await this.repo.deleteAccountByIdInDb(id);
    };
}
