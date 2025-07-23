import { db } from "../../database/database.js";
import type { EmployeeUpdate, NewEmployee } from "../../types/database.js";

const insertNewEmployeeToDb = async (employee: NewEmployee) => {
    return await db
        .insertInto("employees")
        .values(employee)
        .returningAll()
        .executeTakeFirstOrThrow();
};

const selectAllEmployeesFromDb = async () => {
    return await db.selectFrom("employees").selectAll().execute();
};

const selectOneEmployeeByIdFromDb = async (id: number) => {
    return await db
        .selectFrom("employees")
        .leftJoin("users", "employees.user_id", "users.id")
        .select([
            "name",
            "surname",
            "email",
            "is_active",
            "role",
            "users.createdAt",
            "users.modifiedAt"
        ])
        .where("users.id", "=", id)
        .executeTakeFirst();
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
