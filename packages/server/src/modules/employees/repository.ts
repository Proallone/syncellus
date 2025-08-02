import { db } from "@syncellus/database/database.js";
import type { EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";

const insertNewEmployeeToDb = async (employee: NewEmployee) => {
    return await db.insertInto("employees").values(employee).returningAll().executeTakeFirstOrThrow();
};

const selectAllEmployeesFromDb = async (query: GetEmployeeQuery) => {
    let q = db
        .selectFrom("employees")
        .leftJoin("users", "employees.user_id", "users.id")
        .select(["employees.id", "name", "surname", "email", "is_active", "role", "users.createdAt", "users.modifiedAt"]);

    if (!!query.is_active) q = q.where("is_active", "=", query.is_active === "true" ? 1 : 0); //? no boolean in sqlite...

    if (!!query.role) q = q.where("role", "in", query.role.split(","));

    return await q.execute();
};

const selectOneEmployeeByIdFromDb = async (id: number) => {
    return await db
        .selectFrom("employees")
        .leftJoin("users", "employees.user_id", "users.id")
        .select(["employees.id", "name", "surname", "email", "is_active", "role", "users.createdAt", "users.modifiedAt"])
        .where("users.id", "=", id)
        .executeTakeFirst();
};

const updateEmployeeByIdInDb = async (employee: EmployeeUpdate) => {
    return await db.updateTable("employees").set(employee).where("id", "=", Number(employee.id)).returningAll().executeTakeFirst();
};

const deleteEmployeeByIdInDb = async (id: number) => {
    return await db.deleteFrom("employees").where("id", "=", id).executeTakeFirst();
};

export { insertNewEmployeeToDb, selectAllEmployeesFromDb, selectOneEmployeeByIdFromDb, updateEmployeeByIdInDb, deleteEmployeeByIdInDb };
