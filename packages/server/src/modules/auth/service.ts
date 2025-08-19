import { eventBus } from "@syncellus/core/eventBus.js";
import { UnauthorizedError } from "@syncellus/errors/Errors.js";
import type { AuthCredentials, Credentials, UserJWTPayload } from "@syncellus/types/index.js";
import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";
import type { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { customAlphabet } from "nanoid";
import { uuidv7 } from "uuidv7";

export class AuthService {
    constructor(private readonly repo: AuthRepository) {}

    public insertNewUser = async (user: AuthCredentials) => {
        const exists = await this.repo.selectUserByEmailFromDb(user.email);

        if (exists) return undefined;
        const nanoid = customAlphabet("1234567890abcdef", 10); //TODO move to helper class?
        const passwordHash = await hashPassword(user.password);

        const newUser = await this.repo.insertNewUserToDb({
            id: uuidv7(),
            public_id: nanoid(),
            ...user,
            password: passwordHash //? password after spread operator so we overwrite original value
        });

        eventBus.emit("user.created", newUser); //TODO this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

        return newUser;
    };

    public verifyUserCredentials = async (credentials: Credentials) => {
        const { email, password } = credentials;
        const userFromDb = await this.repo.selectUserByEmailFromDb(email);

        if (!userFromDb) throw new UnauthorizedError("DASDAS");

        const match = await compareHash(password, userFromDb.password);

        if (!match) throw new UnauthorizedError("DSDA");

        const user: UserJWTPayload = { public_id: userFromDb.public_id, role: userFromDb.role };

        return { user };
    };

    public findUserById = async (id: string) => {
        const user = await this.repo.selectUserByIdFromDb(id);
        if (!user) throw new UnauthorizedError(`User with id ${id} not found`);
        return { user };
    };

    public findUserByPublicID = async (public_id: string) => {
        const user = await this.repo.selectUserByPublicIDfromDb(public_id);
        if (!user) throw new UnauthorizedError(`User with public_id ${public_id} not found`);
        return { user };
    };
}
