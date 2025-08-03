import Jwt from "jsonwebtoken";
import { eventBus } from "@syncellus/core/eventEmitter.js";
import { HttpError } from "@syncellus/errors/HttpError.js";
import type { NewUser } from "@syncellus/types/database.js";
import type { Credentials, User } from "@syncellus/types/index.js";
import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";
import { insertNewUserToDb, selectUserByEmailFromDb } from "@syncellus/modules/auth/repository.js";
import config from "@syncellus/configs/config.js";

const insertNewUser = async (user: NewUser) => {
    const exists = await selectUserByEmailFromDb(user.email);

    if (exists) return undefined;

    const newUser = await insertNewUserToDb({
        ...user,
        password: await hashPassword(user.password)
    });

    eventBus.emit("user.created", newUser); //TODO this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

    return newUser;
};

const verifyUserCredentials = async (credentials: Credentials) => {
    const { email, password } = credentials;
    const userFromDb = await selectUserByEmailFromDb(email);

    if (!userFromDb) throw new HttpError(401, "Invalid credentials");

    const match = await compareHash(password, userFromDb.password);

    if (!match) throw new HttpError(401, "Invalid credentials");

    const user: User = { id: userFromDb.id, role: userFromDb.role };
    const accessToken = Jwt.sign(user, config.jwt_secret, { expiresIn: "30m" });

    return { user, accessToken };
};

export { insertNewUser, verifyUserCredentials };
