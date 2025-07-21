import { db } from "../../database/database.js";
import { hashPassword } from "../../utils/crypto.js";
import type { EmployeeUpdate, NewEmployee } from "../../types/database.js";

const createNewEmployee = async (employee: NewEmployee) => {
    return await db
        .insertInto("employees")
        .values({
            ...employee,
            password: await hashPassword(employee.password)
        })
        .returningAll()
        .executeTakeFirstOrThrow();
};

const getAllEmployees = async () => {
    return await db.selectFrom("employees").selectAll().execute();
};

const getEmployeeById = async (id: number) => {
    return await db
        .selectFrom("employees")
        .select(["name", "surname", "email", "createdAt", "modifiedAt"])
        .where("id", "=", id)
        .execute();
};

const patchEmployeeInDb = async (employee: EmployeeUpdate) => {
    return await db
        .updateTable("employees")
        .set(employee)
        .where("id", "=", Number(employee.id))
        .returningAll()
        .executeTakeFirst();
};

const deleteEmployeeInDb = async (id: number) => {
    return await db
        .deleteFrom("employees")
        .where("id", "=", id)
        .executeTakeFirst();
};

export {
    createNewEmployee,
    getAllEmployees,
    getEmployeeById,
    patchEmployeeInDb,
    deleteEmployeeInDb
};
