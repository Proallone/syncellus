import type { IAuthRepository } from "@syncellus/modules/auth/types.js";
import type { AuthEmailVerificationTokens, AuthPasswordResetTokens, AuthUsers, DB } from "@syncellus/types/database.js";
import type { DeleteResult, Insertable, Kysely, Selectable } from "kysely";

export class AuthRepository implements IAuthRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public insertNewUser = async (user: Insertable<AuthUsers>): Promise<Selectable<AuthUsers>> => {
        return await this.db.insertInto("auth.users").values(user).returningAll().executeTakeFirstOrThrow();
    };

    public verifyUserEmail = async (id: string) => {
        return await this.db.updateTable("auth.users").set({ verified: true }).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByEmail = async (email: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth.users_view").selectAll().where("email", "=", email).executeTakeFirst();
    };

    public selectUserByID = async (id: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth.users_view").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicID = async (public_id: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth.users_view").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public updateUserPassword = async (id: string, newPassword: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.updateTable("auth.users").set({ password: newPassword }).where("id", "=", id).returningAll().executeTakeFirst();
    };

    public getUserRoles = async (user_public_id: string): Promise<string[]> => {
        const user = await this.selectUserByPublicID(user_public_id);
        if (!user) return [];

        //TODO replace with view read
        const roles = await this.db
            .selectFrom("auth.user_roles")
            .innerJoin("auth.roles", "auth.user_roles.role_id", "auth.roles.id")
            .select("auth.roles.name")
            .where("auth.user_roles.user_id", "=", user.id)
            .execute();

        return roles.map((role) => role.name);
    };

    public getUserScopes = async (user_public_id: string): Promise<string[]> => {
        const user = await this.selectUserByPublicID(user_public_id);
        if (!user) return [];

        //TODO replace with view read
        const scopes = await this.db
            .selectFrom("auth.user_roles")
            .innerJoin("auth.role_scopes", "auth.user_roles.role_id", "auth.role_scopes.role_id")
            .innerJoin("auth.scopes", "auth.role_scopes.scope_id", "auth.scopes.id")
            .select("auth.scopes.scope")
            .where("auth.user_roles.user_id", "=", user.id)
            .execute();

        return scopes.map((scope) => scope.scope);
    };

    public insertPasswordResetToken = async (entry: Insertable<AuthPasswordResetTokens>) => {
        return await this.db.insertInto("auth.password_reset_tokens").values(entry).returningAll().executeTakeFirstOrThrow();
    };

    public selectPasswordResetTokenByHash = async (tokenHash: string) => {
        return await this.db.selectFrom("auth.password_reset_tokens").selectAll().where("auth.password_reset_tokens.token_hash", "=", tokenHash).executeTakeFirst();
    };

    public deletePasswordResetTokenByID = async (id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth.password_reset_tokens").where("auth.password_reset_tokens.id", "=", id).executeTakeFirst();
    };

    public deletePasswordResetTokensByUserID = async (user_id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth.password_reset_tokens").where("auth.password_reset_tokens.user_id", "=", user_id).executeTakeFirst();
    };

    public insertEmailVerificationToken = async (entry: Insertable<AuthEmailVerificationTokens>) => {
        return await this.db.insertInto("auth.email_verification_tokens").values(entry).returningAll().executeTakeFirst();
    };

    public selectEmailVerificationTokenByHash = async (tokenHash: string) => {
        return await this.db.selectFrom("auth.email_verification_tokens").selectAll().where("auth.email_verification_tokens.token_hash", "=", tokenHash).executeTakeFirst();
    };

    public deleteEmailVerificationTokenByID = async (id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth.email_verification_tokens").where("auth.email_verification_tokens.id", "=", id).executeTakeFirst();
    };

    public deleteEmailVerificationTokensByUserID = async (user_id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth.email_verification_tokens").where("auth.email_verification_tokens.user_id", "=", user_id).executeTakeFirst();
    };
}
