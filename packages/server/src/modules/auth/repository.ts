import type { Database, NewUser } from "@syncellus/types/database.js";
import { Kysely } from "kysely";

export class AuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUser = async (user: NewUser) => {
        return await this.db.insertInto("auth_users").values(user).returning(["id", "public_id", "email", "createdAt", "modifiedAt", "active", "role"]).executeTakeFirst(); //TODO do not return id
    };

    public selectUserByEmail = async (email: string) => {
        return await this.db.selectFrom("auth_users").select(["public_id", "email", "role", "password"]).where("email", "=", email).executeTakeFirst();
    };

    public selectUserByID = async (id: string) => {
        return await this.db.selectFrom("auth_users").select(["id", "role"]).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicID = async (public_id: string) => {
        return await this.db.selectFrom("auth_users").select(["public_id", "role", "password"]).where("public_id", "=", public_id).executeTakeFirst();
    };

    public updateUserPassword = async (public_id: string, newPassword: string) => {
        return await this.db.updateTable("auth_users").set({ password: newPassword }).where("public_id", "=", public_id).executeTakeFirst();
    };
}
