import type { EmployeeUpdate, NewEmployee } from "../../types/database.js";
import {
    insertNewEmployeeToDb,
    selectAllEmployeesFromDb,
    selectOneEmployeeByIdFromDb,
    updateEmployeeByIdInDb,
    deleteEmployeeByIdInDb
} from "./repository.js";

const insertNewEmployee = async (employee: NewEmployee) => {
    return await insertNewEmployeeToDb(employee);
};

const selectAllEmployees = async () => {
    return await selectAllEmployeesFromDb();
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

export {
    insertNewEmployee,
    selectAllEmployees,
    selectOneEmployeeById,
    updateEmployeeById,
    deleteEmployeeById
};
