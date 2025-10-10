import { AppConfig } from "@syncellus/configs/config.js";
// import { eventBus } from "@syncellus/core/eventBus.js";
import { ConflictError, NotFoundError, UnauthorizedError } from "@syncellus/errors/http.js";
import type { AuthRepository } from "@syncellus/modules/auth/repository.js";
import type { IAuthService } from "@syncellus/modules/auth/types.js";
import type { MailService } from "@syncellus/modules/mailer/service.js";
import type { AuthCredentials, Credentials, UserJWTPayload } from "@syncellus/types/index.js";
import { compareHash, generateToken, hashPassword, sha256 } from "@syncellus/utils/crypto.js";
import { nanoid } from "@syncellus/utils/nanoid.js";
import Jwt from "jsonwebtoken";
import { uuidv7 } from "uuidv7";

export class AuthService implements IAuthService {
    constructor(
        private readonly repo: AuthRepository,
        private readonly mailService: MailService
    ) {}

    public registerNewUser = async (user: AuthCredentials) => {
        const existing = await this.repo.selectUserByEmail(user.email);
        if (existing) throw new ConflictError(`User ${user.email} already exists`);

        const newUser = await this.repo.insertNewUser({
            id: uuidv7(),
            public_id: nanoid(),
            email: user.email,
            password: await hashPassword(user.password)
        });

        // eventBus.emit("user.created", newUser); //TODO this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

        const verificationToken = generateToken();
        const tokenHash = sha256(verificationToken);

        await this.repo.deleteEmailVerificationTokensByUserID(newUser.id);
        await this.repo.insertEmailVerificationToken({ id: uuidv7(), user_id: newUser.id, token_hash: tokenHash });

        const config = AppConfig.getInstance();
        const verificationLink = `${config.APP_URL}/auth/verify-email?token=${verificationToken}`;
        await this.mailService.sendWelcome(user.email, newUser.email, verificationLink);

        return newUser;
    };

    public verifyAccountEmail = async (token: string) => {
        const tokenHash = sha256(token);
        const tokenRecord = await this.repo.selectEmailVerificationTokenByHash(tokenHash);

        if (!tokenRecord) throw new NotFoundError("Invalid email verification token");

        if (tokenRecord.expires_at < new Date()) {
            await this.repo.deleteEmailVerificationTokenByID(tokenRecord.id); //TODO what if fails?
            throw new NotFoundError("Expired email verification token");
        }

        const user = await this.repo.selectUserByID(tokenRecord.user_id);
        if (!user) throw new NotFoundError("User not found for this email verification token");

        await this.repo.verifyUserEmail(user.id); //TODO what if fails?
        await this.repo.deleteEmailVerificationTokensByUserID(user.id); //TODO what if fails? maybe add delete all user tokens?
        return true;
    };

    public verifyUserCredentials = async (credentials: Credentials) => {
        const { email, password } = credentials;

        const userFromDb = await this.repo.selectUserByEmail(email);
        if (!userFromDb) throw new UnauthorizedError("Invalid credentials");

        const match = await compareHash(password, userFromDb.password);
        if (!match) throw new UnauthorizedError("Invalid credentials");

        const user: UserJWTPayload = { public_id: userFromDb.public_id };
        return user;
    };

    public issueLoginToken = async (user: Express.User & { public_id: string }) => {
        const roles = await this.repo.getUserRoles(user.public_id);
        const scopes = await this.repo.getUserScopes(user.public_id);
        const payload = {
            sub: user.public_id,
            roles,
            scopes
        };
        const config = AppConfig.getInstance();
        return Jwt.sign(payload, config.JWT_TOKEN_SECRET, { expiresIn: "30m" }); //TODO move to config
    };

    public issuePasswordResetToken = async (email: string) => {
        const user = await this.repo.selectUserByEmail(email);

        if (!user) throw new NotFoundError(`User with email ${email} not found`);

        const resetToken = generateToken();
        const tokenHash = sha256(resetToken);

        await this.repo.deletePasswordResetTokensByUserID(user.id);
        await this.repo.insertPasswordResetToken({ id: uuidv7(), user_id: user.id, token_hash: tokenHash });

        const config = AppConfig.getInstance();
        const resetLink = `${config.APP_URL}/auth/reset-password?token=${resetToken}`;

        await this.mailService.sendPasswordReset(user.email, resetLink);

        return resetLink;
    };

    public performPasswordReset = async (token: string, newPassword: string) => {
        const tokenHash = sha256(token);
        const tokenRecord = await this.repo.selectPasswordResetTokenByHash(tokenHash);

        if (!tokenRecord) throw new NotFoundError("Invalid password reset token");

        if (tokenRecord.expires_at < new Date()) {
            await this.repo.deletePasswordResetTokenByID(tokenRecord.id);
            throw new NotFoundError("Expired password reset token");
        }

        const user = await this.repo.selectUserByID(tokenRecord.user_id);
        if (!user) throw new NotFoundError("User not found for this reset token");

        const hashedPassword = await hashPassword(newPassword);

        await this.repo.updateUserPassword(user.id, hashedPassword);
        await this.repo.deletePasswordResetTokensByUserID(user.id);
    };

    public findUserByPublicID = async (public_id: string) => {
        const user = await this.repo.selectUserByPublicID(public_id);
        if (!user) throw new UnauthorizedError(`User with public_id ${public_id} not found`);
        return user;
    };
}
