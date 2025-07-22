import { db } from "../../database/database.js";
import { hashPassword } from "../../utils/crypto.js";
import type { EmployeeUpdate, NewEmployee } from "../../types/database.js";

const insertNewEmployeeToDb = async (employee: NewEmployee) => {
    return await db
        .insertInto("employees")
        .values({
            ...employee,
            password: await hashPassword(employee.password)
        })
        .returningAll()
        .executeTakeFirstOrThrow();
};

const selectAllEmployeesFromDb = async () => {
    return await db.selectFrom("employees").selectAll().execute();
};

const selectOneEmployeeByIdFromDb = async (id: number) => {
    return await db
        .selectFrom("employees")
        .select(["name", "surname", "email", "createdAt", "modifiedAt"])
        .where("id", "=", id)
        .execute();
};

const updateEmployeeByIdInDb = async (employee: EmployeeUpdate) => {
    return await db
        .updateTable("employees")
        .set(employee)
        .where("id", "=", Number(employee.id))
        .returningAll()
        .executeTakeFirst();
};

const deleteEmployeeByIdInDb = async (id: number) => {
    return await db
        .deleteFrom("employees")
        .where("id", "=", id)
        .executeTakeFirst();
};

export {
    insertNewEmployeeToDb,
    selectAllEmployeesFromDb,
    selectOneEmployeeByIdFromDb,
    updateEmployeeByIdInDb,
    deleteEmployeeByIdInDb
};
