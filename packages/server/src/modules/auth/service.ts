import { eventBus } from "@syncellus/core/eventBus.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "@syncellus/errors/errors.js";
import type { AuthCredentials, Credentials, UserJWTPayload } from "@syncellus/types/index.js";
import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";
import type { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { nanoid } from "@syncellus/utils/nanoid.js";
import { uuidv7 } from "uuidv7";
import Jwt from "jsonwebtoken";
import { AppConfig } from "@syncellus/configs/config.js";
import { createHmac } from "crypto";
import type { MailService } from "../mailer/service.js";

export class AuthService {
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
        return { user };
    };

    public issueLoginToken = (user: Express.User) => {
        const config = AppConfig.getInstance();
        return Jwt.sign(user, config.JWT_TOKEN_SECRET, { expiresIn: "30m" });
    };

    public issuePasswordResetToken = async (email: string) => {
        const user = await this.repo.selectUserByEmail(email);
        if (!user) throw new NotFoundError(`User with email ${email} not found`);
        const payload = {
            sub: user.public_id,
            type: "password_reset"
        };
        const config = AppConfig.getInstance();
        const key = createHmac("sha256", config.CRYPTO_HMAC_KEY).update(user.password, "utf-8").digest();
        const token = Jwt.sign(payload, key, { expiresIn: "15m" });

        await this.mailService.sendPasswordReset(user.email, token);

        return token;
    };

    public performPasswordReset = async (token: string, newPassword: string) => {
        const { sub, type } = Jwt.decode(token) as { sub: string; type: string };
        if (type !== "password_reset" || !sub) throw new BadRequestError("Invalid password reset token!");

        const user = await this.repo.selectUserByPublicID(sub);

        if (!user) throw new NotFoundError("User not found!");

        const config = AppConfig.getInstance();
        const key = createHmac("sha256", config.CRYPTO_HMAC_KEY).update(user.password, "utf-8").digest();
        const tokenVerified = Jwt.verify(token, key);

        if (!tokenVerified) throw new UnauthorizedError("Unauthorized for password reset!");

        const passwordHash = await hashPassword(newPassword);

        await this.repo.updateUserPassword(sub, passwordHash);
    };

    public findUserById = async (id: string) => {
        const user = await this.repo.selectUserByID(id);
        if (!user) throw new UnauthorizedError(`User with id ${id} not found`);
        return { user };
    };

    public findUserByPublicID = async (public_id: string) => {
        const user = await this.repo.selectUserByPublicID(public_id);
        if (!user) throw new UnauthorizedError(`User with public_id ${public_id} not found`);
        return { user };
    };
}
