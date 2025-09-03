import { eventBus } from "@syncellus/core/eventBus.js";
import { ConflictError, NotFoundError, UnauthorizedError } from "@syncellus/errors/errors.js";
import type { AuthCredentials, Credentials, UserJWTPayload } from "@syncellus/types/index.js";
import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";
import type { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { nanoid } from "@syncellus/utils/nanoid.js";
import { uuidv7 } from "uuidv7";
import Jwt from "jsonwebtoken";
import { AppConfig } from "@syncellus/configs/config.js";
import { createHash, randomBytes } from "crypto";
import type { MailService } from "@syncellus/modules/mailer/service.js";
import type { IAuthService } from "@syncellus/modules/auth/types.js";

export class AuthService implements IAuthService {
    constructor(
        private readonly repo: AuthRepository,
        private readonly mailService: MailService
    ) {}

    public registerNewUser = async (user: AuthCredentials) => {
        const userExists = await this.repo.selectUserByEmail(user.email);
        if (userExists) {
            throw new ConflictError(`User ${user.email} already exists!`);
        }

        const newUser = await this.repo.insertNewUser({
            id: uuidv7(),
            public_id: nanoid(),
            email: user.email,
            password: await hashPassword(user.password)
        });

        eventBus.emit("user.created", newUser); //TODO this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

        await this.mailService.sendWelcome(user.email, newUser.email);

        return newUser;
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
        return Jwt.sign(payload, config.JWT_TOKEN_SECRET, { expiresIn: "30m" });
    };

    public issuePasswordResetToken = async (email: string) => {
        const user = await this.repo.selectUserByEmail(email);

        if (!user) throw new NotFoundError(`User with email ${email} not found`);

        const resetToken = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(resetToken).digest("hex");

        await this.repo.insertPasswordResetToken({ id: uuidv7(), user_id: user.id, token_hash: tokenHash });

        const resetLink = `http://localhost:5137/reset-password?token=${resetToken}`; //TODO fix
        await this.mailService.sendPasswordReset(user.email, resetLink);

        return resetLink;
    };

    public performPasswordReset = async (token: string, newPassword: string) => {
        const tokenHash = createHash("sha256").update(token).digest("hex");

        const tokenRecord = await this.repo.selectPasswordResetTokenByHash(tokenHash);
        if (!tokenRecord) {
            //TODO add handling for expired tokens
            throw new NotFoundError("Invalid password reset token");
        }
        const expires_at = new Date(tokenRecord.expires_at.replace(" ", "T") + "Z").toISOString();

        if (expires_at < new Date().toISOString()) {
            //TODO add handling for expired tokens
            await this.repo.deletePasswordResetTokenByID(tokenRecord.id); //TODO what if fails?
            throw new NotFoundError("Expired password reset token");
        }

        const user = await this.repo.selectUserByID(tokenRecord.user_id);
        if (!user) {
            throw new NotFoundError("User not found for this reset token");
        }

        const hashedPassword = await hashPassword(newPassword);

        await this.repo.updateUserPassword(user.id, hashedPassword); //TODO what if fails?
        await this.repo.deletePasswordResetTokenByID(tokenRecord.id); //TODO what if fails? maybe add delete all user tokens?
    };

    public findUserById = async (id: string) => {
        const user = await this.repo.selectUserByID(id);
        if (!user) throw new UnauthorizedError(`User with id ${id} not found`);
        return user;
    };

    public findUserByPublicID = async (public_id: string) => {
        const user = await this.repo.selectUserByPublicID(public_id);
        if (!user) throw new UnauthorizedError(`User with public_id ${public_id} not found`);
        return user;
    };
}
