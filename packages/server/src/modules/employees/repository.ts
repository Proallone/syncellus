import type { Database, EmployeeUpdate, NewEmployee } from "@syncellus/types/database.js";
import type { GetEmployeeQuery } from "@syncellus/types/index.js";
import type { Kysely } from "kysely";

export class EmployeeRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewEmployeeToDb = async (employee: NewEmployee) => {
        return await this.db.insertInto("employees").values(employee).returningAll().executeTakeFirstOrThrow();
    };

    public selectAllEmployeesFromDb = async (query: GetEmployeeQuery) => {
        let q = this.db
            .selectFrom("employees")
            .leftJoin("users", "employees.user_id", "users.id")
            .select(["employees.id", "name", "surname", "email", "is_active", "role", "users.createdAt", "users.modifiedAt"]);

        if (query.is_active) q = q.where("is_active", "=", query.is_active === "true" ? 1 : 0); //? no boolean in sqlite...

        if (query.role) q = q.where("role", "in", query.role.split(","));

        return await q.execute();
    };

    public selectOneEmployeeByIdFromDb = async (id: string) => {
        return await this.db
            .selectFrom("employees")
            .leftJoin("users", "employees.user_id", "users.id")
            .select(["employees.id", "name", "surname", "email", "is_active", "role", "users.createdAt", "users.modifiedAt"])
            .where("users.id", "=", id)
            .executeTakeFirst();
    };

    public updateEmployeeByIdInDb = async (employee: EmployeeUpdate) => {
        return await this.db.updateTable("employees").set(employee).where("id", "=", employee.id).returningAll().executeTakeFirst();
    };

    public deleteEmployeeByIdInDb = async (id: string) => {
        return await this.db.deleteFrom("employees").where("id", "=", id).executeTakeFirst();
    };
}
