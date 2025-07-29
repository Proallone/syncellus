import { eventBus } from "../../core/eventEmitter.js";
import type { NewUser } from "../../types/database.js";
import { compareHash, hashPassword } from "../../utils/crypto.js";
import { insertNewUserToDb, selectUserByEmailFromDb } from "./repository.js";

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

interface Credentials {
    email: string;
    password: string;
}

const verifyUserCredentials = async (credentials: Credentials) => {
    const { email, password } = credentials;
    const userFromDb = await selectUserByEmailFromDb(email);

    return await compareHash(password, userFromDb?.password!);
};

export { insertNewUser, verifyUserCredentials };
