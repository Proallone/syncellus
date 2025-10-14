import type {
  AuthEmailVerificationTokens,
  AuthPasswordResetTokens,
  AuthUsers,
} from "@syncellus/types/database.d.ts";
import type {
  AuthCredentials,
  Credentials,
  UserJWTPayload,
} from "@syncellus/types/index.ts";
import type { DeleteResult, Insertable, Selectable } from "kysely";

export interface IAuthRepository {
  insertNewUser(user: Insertable<AuthUsers>): Promise<Selectable<AuthUsers>>;
  selectUserByEmail(email: string): Promise<Selectable<AuthUsers | undefined>>;
  selectUserByPublicID(
    public_id: string,
  ): Promise<Selectable<AuthUsers | undefined>>;
  updateUserPassword(
    id: string,
    newPassword: string,
  ): Promise<Selectable<AuthUsers>>;
  getUserRoles(user_public_id: string): Promise<string[]>;
  getUserScopes(user_public_id: string): Promise<string[]>;

  insertPasswordResetToken(
    entry: Insertable<AuthPasswordResetTokens>,
  ): Promise<Selectable<AuthPasswordResetTokens>>;
  selectPasswordResetTokenByHash(
    tokenHash: string,
  ): Promise<Selectable<AuthPasswordResetTokens>>;
  deletePasswordResetTokenByID(id: string): Promise<DeleteResult>;
  deletePasswordResetTokensByUserID(user_id: string): Promise<DeleteResult>;

  insertEmailVerificationToken(
    entry: Insertable<AuthEmailVerificationTokens>,
  ): Promise<Selectable<AuthEmailVerificationTokens>>;
  selectEmailVerificationTokenByHash(
    tokenHash: string,
  ): Promise<Selectable<AuthEmailVerificationTokens>>;
  deleteEmailVerificationTokenByID(id: string): Promise<DeleteResult>;
  deleteEmailVerificationTokensByUserID(user_id: string): Promise<DeleteResult>;
}

export interface IAuthService {
  registerNewUser(user: AuthCredentials): Promise<Selectable<AuthUsers>>;
  verifyAccountEmail(token: string): Promise<boolean>;
  verifyUserCredentials(credentials: Credentials): Promise<UserJWTPayload>;
  issueLoginToken(user: Express.User & { public_id: string }): Promise<string>;
  issuePasswordResetToken(email: string): Promise<string>;
  performPasswordReset(token: string, newPassword: string): Promise<void>;
  findUserByPublicID(public_id: string): Promise<Selectable<AuthUsers>>;
}
