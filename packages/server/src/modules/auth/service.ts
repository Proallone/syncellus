import Jwt from "jsonwebtoken";
import { eventBus } from "../../core/eventEmitter.js";
import { HttpError } from "../../errors/HttpError.js";
import type { NewUser } from "../../types/database.js";
import type { Credentials, User } from "../../types/index.js";
import { compareHash, hashPassword } from "../../utils/crypto.js";
import { insertNewUserToDb, selectUserByEmailFromDb } from "./repository.js";
import config from "../../configs/config.js";
const insertNewUser = async (user: NewUser) => {
    const exists = await selectUserByEmailFromDb(user.email);

    if (exists) return undefined;

    const newUser = await insertNewUserToDb({
        ...user,
        password: await hashPassword(user.password)
    });

    eventBus.emit("user.created", newUser); //todo this might not be the best idea to use event for this in case of failure it would not insert employee for a user...

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
