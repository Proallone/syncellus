import Jwt from "jsonwebtoken";
import { eventBus } from "@syncellus/core/eventBus.js";
import { HttpError } from "@syncellus/errors/HttpError.js";
import type { AuthCredentials, Credentials, User } from "@syncellus/types/index.js";
import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";
import type { AuthRepository } from "@syncellus/modules/auth/repository.js";
import config from "@syncellus/configs/config.js";
import { customAlphabet } from "nanoid";
export class AuthService {
    constructor(private readonly repo: AuthRepository) {}

    public insertNewUser = async (user: AuthCredentials) => {
        const exists = await this.repo.selectUserByEmailFromDb(user.email);

        if (exists) return undefined;
        const nanoid = customAlphabet("1234567890abcdef", 10); //TODO move to helper class?

        const newUser = await this.repo.insertNewUserToDb({
            ...user,
            publicID: nanoid(),
            password: await hashPassword(user.password)
        });

        eventBus.emit("user.created", newUser); //TODO this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

        return newUser;
    };

    public verifyUserCredentials = async (credentials: Credentials) => {
        const { email, password } = credentials;
        const userFromDb = await this.repo.selectUserByEmailFromDb(email);

        if (!userFromDb) throw new HttpError(401, "Invalid credentials");

        const match = await compareHash(password, userFromDb.password);

        if (!match) throw new HttpError(401, "Invalid credentials");

        const user: User = { id: userFromDb.id, role: userFromDb.role };
        const accessToken = Jwt.sign(user, config.jwt_secret, { expiresIn: "30m" });
        // TODO issue a refresh token?

        return { accessToken };
    };
}
