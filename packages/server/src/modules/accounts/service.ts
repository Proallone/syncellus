import type { EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { AccountsRepository } from "@syncellus/modules/accounts/repository.js";
import { uuidv7 } from "uuidv7";

export class AccountsService {
    constructor(private readonly repo: AccountsRepository) {}

    public insertNewEmployee = async (employee: NewEmployee) => {
        return await this.repo.insertNewAccountToDb({ id: uuidv7(), ...employee });
    };

    public selectAllEmployees = async (query: GetEmployeeQuery) => {
        return await this.repo.selectAllAccountsFromDb(query);
    };

    public selectOneEmployeeById = async (id: string) => {
        return await this.repo.selectOneAccountByIdFromDb(id);
    };

    public updateEmployeeById = async (employee: EmployeeUpdate) => {
        return await this.repo.updateAccountByIdInDb(employee);
    };

    public deleteEmployeeById = async (id: string) => {
        return await this.repo.deleteAccountByIdInDb(id);
    };
}
