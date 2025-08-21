import type { EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { EmployeeRepository } from "@syncellus/modules/accounts/repository.js";
import { uuidv7 } from "uuidv7";

export class EmployeeService {
    constructor(private readonly repo: EmployeeRepository) {}

    public insertNewEmployee = async (employee: NewEmployee) => {
        return await this.repo.insertNewEmployeeToDb({ id: uuidv7(), ...employee });
    };

    public selectAllEmployees = async (query: GetEmployeeQuery) => {
        return await this.repo.selectAllEmployeesFromDb(query);
    };

    public selectOneEmployeeById = async (id: string) => {
        return await this.repo.selectOneEmployeeByIdFromDb(id);
    };

    public updateEmployeeById = async (employee: EmployeeUpdate) => {
        return await this.repo.updateEmployeeByIdInDb(employee);
    };

    public deleteEmployeeById = async (id: string) => {
        return await this.repo.deleteEmployeeByIdInDb(id);
    };
}
