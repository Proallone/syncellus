import type { Database, NewUser, User } from "@syncellus/types/database.js";
import { Kysely } from "kysely";

export class AuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUser = async (user: NewUser) => {
        return await this.db.insertInto("auth_users").values(user).returning(["id", "public_id", "email", "createdAt", "modifiedAt", "active"]).executeTakeFirst(); //TODO do not return id
    };

    public selectUserByEmail = async (email: string) => {
        return await this.db.selectFrom("auth_users").select(["public_id", "email", "password"]).where("email", "=", email).executeTakeFirst();
    };

    public selectUserByID = async (id: string) => {
        return await this.db.selectFrom("auth_users").select(["id"]).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicID = async (public_id: string): Promise<User> => {
        return await this.db.selectFrom("auth_users").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public updateUserPassword = async (public_id: string, newPassword: string) => {
        return await this.db.updateTable("auth_users").set({ password: newPassword }).where("public_id", "=", public_id).executeTakeFirst();
    };

    public getUserRoles = async (user_public_id: string): Promise<string[]> => {
        const { id } = await this.selectUserByPublicID(user_public_id);
        const roles = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_roles", "auth_user_roles.role_id", "auth_roles.id")
            .select("auth_roles.name")
            .where("auth_user_roles.user_id", "=", id)
            .execute();

        return roles.map((role) => role.name);
    };

    public getUserScopes = async (user_public_id: string): Promise<string[]> => {
        const { id } = await this.selectUserByPublicID(user_public_id);

        const scopes = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_role_scopes", "auth_user_roles.role_id", "auth_role_scopes.role_id")
            .innerJoin("auth_scopes", "auth_role_scopes.scope_id", "auth_scopes.id")
            .select("auth_scopes.scope")
            .where("auth_user_roles.user_id", "=", id)
            .execute();

        return scopes.map((scope) => scope.scope);
    };
}
