import {
  deleteEmailVerificationTokenByID,
  deleteEmailVerificationTokensByUserID,
  deletePasswordResetTokenByID,
  deletePasswordResetTokensByUserID,
  getUserRoles,
  getUserScopes,
  insertEmailVerificationToken,
  insertNewUser,
  insertPasswordResetToken,
  selectEmailVerificationTokenByHash,
  selectPasswordResetTokenByHash,
  selectUserByEmail,
  selectUserByID,
  selectUserByPublicID,
  updateUserPassword,
  verifyUserEmail,
} from "@syncellus/hono/modules/auth/repository.ts";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@syncellus/hono/common/error.ts";
import { generate } from "@std/uuid/unstable-v7";
import { nanoid } from "@syncellus/hono/utils/nanoid.ts";
import {
  generateToken,
  hashPassword,
  sha256,
} from "@syncellus/hono/utils/crypto.ts";

export const registerNewUser = async (
  user: { email: string; password: string },
) => { //TODO replace with zod infered type
  const existing = await selectUserByEmail(user.email);
  if (existing) throw new ConflictError(`User ${user.email} already exists`);

  const newUser = await insertNewUser({
    id: generate(),
    public_id: nanoid(),
    email: user.email,
    password: await hashPassword(user.password),
  });

  const verificationToken = generateToken();
  const tokenHash = sha256(verificationToken);

  await deleteEmailVerificationTokensByUserID(newUser.id);
  await insertEmailVerificationToken({
    id: generate(),
    user_id: newUser.id,
    token_hash: tokenHash,
  });

  //TODO incorporate mail service once it is available
  //   const config = AppConfig.getInstance();
  // const verificationLink =
  //   `${config.APP_URL}/auth/verify-email?token=${verificationToken}`;
  // await this.mailService.sendWelcome(
  //   user.email,
  //   newUser.email,
  //   verificationLink,
  // );

  return newUser;
};

export const issueLoginToken = async (
  user: any, //TODO fix
) => {
  const roles = await getUserRoles(user.public_id);
  const scopes = await getUserScopes(user.public_id);
  const payload = {
    sub: user.public_id,
    roles,
    scopes,
  };
  // const config = AppConfig.getInstance();
  // return Jwt.sign(payload, config.JWT_TOKEN_SECRET, { expiresIn: "30m" }); //TODO fix
  return "blablabla";
};

export const verifyAccountEmail = async (token: string) => {
  const tokenHash = sha256(token);
  const tokenRecord = await selectEmailVerificationTokenByHash(
    tokenHash,
  );

  if (!tokenRecord) {
    throw new NotFoundError("Invalid email verification token");
  }

  if (tokenRecord.expires_at < new Date()) {
    await deleteEmailVerificationTokenByID(tokenRecord.id); //TODO what if fails?
    throw new NotFoundError("Expired email verification token");
  }

  const user = await selectUserByID(tokenRecord.user_id);
  if (!user) {
    throw new NotFoundError(
      "User not found for this email verification token",
    );
  }

  await verifyUserEmail(user.id); //TODO what if fails?
  await deleteEmailVerificationTokensByUserID(user.id); //TODO what if fails? maybe add delete all user tokens?
  return true;
};

export const issuePasswordResetToken = async (email: string) => {
  const user = await selectUserByEmail(email);

  if (!user) throw new NotFoundError(`User with email ${email} not found`);

  const resetToken = generateToken();
  const tokenHash = sha256(resetToken);

  await deletePasswordResetTokensByUserID(user.id);
  await insertPasswordResetToken({
    id: generate(),
    user_id: user.id,
    token_hash: tokenHash,
  });

  //TODO address
  // const config = AppConfig.getInstance();
  // const resetLink =
  //   `${config.APP_URL}/auth/reset-password?token=${resetToken}`;

  // await this.mailService.sendPasswordReset(user.email, resetLink);

  return "blablabl"; //TODO resetLink
};

export const performPasswordReset = async (
  token: string,
  newPassword: string,
) => {
  const tokenHash = sha256(token);
  const tokenRecord = await selectPasswordResetTokenByHash(
    tokenHash,
  );

  if (!tokenRecord) throw new NotFoundError("Invalid password reset token");

  if (tokenRecord.expires_at < new Date()) {
    await deletePasswordResetTokenByID(tokenRecord.id);
    throw new NotFoundError("Expired password reset token");
  }

  const user = await selectUserByID(tokenRecord.user_id);
  if (!user) throw new NotFoundError("User not found for this reset token");

  const hashedPassword = await hashPassword(newPassword);

  await updateUserPassword(user.id, hashedPassword);
  await deletePasswordResetTokensByUserID(user.id);
};

export const findUserByPublicID = async (public_id: string) => {
  const user = await selectUserByPublicID(public_id);
  if (!user) {
    throw new UnauthorizedError(`User with public_id ${public_id} not found`);
  }
  return user;
};
