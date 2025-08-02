import type { EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import { GetEmployeeQuery } from "@syncellus/types/index.js";
import { insertNewEmployeeToDb, selectAllEmployeesFromDb, selectOneEmployeeByIdFromDb, updateEmployeeByIdInDb, deleteEmployeeByIdInDb } from "@syncellus/modules/employees/repository.js";

const insertNewEmployee = async (employee: NewEmployee) => {
    return await insertNewEmployeeToDb(employee);
};

const selectAllEmployees = async (query: GetEmployeeQuery) => {
    return await selectAllEmployeesFromDb(query);
};

const selectOneEmployeeById = async (id: number) => {
    return await selectOneEmployeeByIdFromDb(id);
};

const updateEmployeeById = async (employee: EmployeeUpdate) => {
    return await updateEmployeeByIdInDb(employee);
};

const deleteEmployeeById = async (id: number) => {
    return await deleteEmployeeByIdInDb(id);
};

export { insertNewEmployee, selectAllEmployees, selectOneEmployeeById, updateEmployeeById, deleteEmployeeById };
