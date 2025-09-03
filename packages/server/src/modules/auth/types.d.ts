import type { NewPasswordResetToken, NewUser, PasswordResetToken, User } from "@syncellus/types/database.js";
import type { AuthCredentials, Credentials, UserJWTPayload } from "@syncellus/types/index.js";
import type { DeleteResult } from "kysely";

export interface IAuthRepository {
    insertNewUser(user: NewUser): Promise<User>;
    selectUserByEmail(email: string): Promise<User | undefined>;
    selectUserByPublicID(public_id: string): Promise<User | undefined>;
    updateUserPassword(id: string, newPassword: string): Promise<User>;
    getUserRoles(user_public_id: string): Promise<string[]>;
    getUserScopes(user_public_id: string): Promise<string[]>;
    insertPasswordResetToken(entry: NewPasswordResetToken): Promise<PasswordResetToken>;
    selectPasswordResetTokenByHash(tokenHash: string): Promise<PasswordResetToken>;
    deletePasswordResetTokenByID(id: string): Promise<DeleteResult>;
}

export interface IAuthService {
    registerNewUser(user: AuthCredentials): Promise<User>;
    verifyUserCredentials(credentials: Credentials): Promise<UserJWTPayload>;
    issueLoginToken(user: Express.User & { public_id: string }): Promise<string>;
    issuePasswordResetToken(email: string): Promise<string>;
    performPasswordReset(token: string, newPassword: string): Promise<void>;
    findUserByPublicID(public_id: string): Promise<User>;
}
