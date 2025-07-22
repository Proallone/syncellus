import { NewUser } from "../../types/database.js";
import { compareHash, hashPassword } from "../../utils/crypto.js";
import { insertNewUserToDb, selectUserByEmailFromDb } from "./repository.js";

const insertNewUser = async (user: NewUser) => {
    return await insertNewUserToDb({
        ...user,
        password: await hashPassword(user.password)
    });
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
