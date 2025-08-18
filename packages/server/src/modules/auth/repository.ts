import type { Database, NewUser } from "@syncellus/types/database.js";
import { Kysely } from "kysely";

export class AuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUserToDb = async (user: NewUser) => {
        return await this.db.insertInto("users").values(user).returning(["id", "public_id", "email", "createdAt", "modifiedAt", "is_active", "role"]).executeTakeFirst(); //TODO do not return id
    };

    public selectUserByEmailFromDb = async (email: string) => {
        return await this.db.selectFrom("users").select(["public_id", "email", "role", "password"]).where("email", "=", email).executeTakeFirst();
    };

    public selectUserByIdFromDb = async (id: string) => {
        return await this.db.selectFrom("users").select(["id", "role"]).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicIDfromDb = async (public_id: string) => {
        return await this.db.selectFrom("users").select(["public_id", "role"]).where("public_id", "=", public_id).executeTakeFirst();
    };
}
