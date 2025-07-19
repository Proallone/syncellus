import db from "../database/database.js";
import { hashPassword } from "../utils/crypto.js";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

const createUserInDb = async (user: User) => {
    const query = db.prepare(
        "INSERT INTO USERS (name, surname, email, passwordHash) VALUES (?, ?, ?, ?) RETURNING name, surname, email, createdAt, modifiedAt;"
    );
    return query.get(
        user.name,
        user.surname,
        user.email,
        await hashPassword(user.password)
    );
};

const getAllUsers = () => {
    const query = db.prepare(
        "SELECT name, surname, email, createdAt, modifiedAt FROM USERS"
    );
    return query.all();
};

const getUserById = (id: string) => {
    const query = db.prepare(
        "SELECT name, surname, email, createdAt, modifiedAt FROM USERS WHERE ID = ?"
    );
    return query.get(id);
};

const patchUserInDb = async (user: User) => {
    let passwordHash: string | null = null;
    if (user.password) passwordHash = await hashPassword(user.password);
    const query = db.prepare(
        "UPDATE USERS SET name = COALESCE(? , name), surname = COALESCE(?, surname), email = COALESCE(?, email), passwordHash = COALESCE(?, passwordHash) WHERE id = ? RETURNING name, surname, email, createdAt, modifiedAt;"
    );
    return query.get(
        user.name ?? null,
        user.surname ?? null,
        user.email ?? null,
        passwordHash ?? null,
        user.id
    );
};

const deleteUserInDb = (id: string) => {
    const query = db.prepare(
        "DELETE FROM USERS WHERE ID = ? RETURNING name, surname, email, createdAt, modifiedAt;"
    );
    return query.get(id);
};

export {
    createUserInDb,
    getAllUsers,
    getUserById,
    patchUserInDb,
    deleteUserInDb
};
