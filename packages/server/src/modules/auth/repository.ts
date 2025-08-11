import type { Database, NewUser } from "@syncellus/types/database.js";
import { Kysely } from "kysely";

export class AuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUserToDb = async (user: NewUser) => {
        return await this.db.insertInto("users").values(user).returning(["id", "email", "createdAt", "modifiedAt", "is_active", "role"]).executeTakeFirst();
    };

    public selectUserByEmailFromDb = async (email: string) => {
        return await this.db.selectFrom("users").select(["id", "role", "password"]).where("email", "=", email).executeTakeFirst();
    };
}
