import { Request, Response, NextFunction } from "express";
import db from "../database/database.js";
import { hashPassword } from "../utils/crypto.js";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, surname, email, password } = req.body;
        const stmt = db.prepare(
            "INSERT INTO USERS (name, surname, email, passwordHash) VALUES (?, ?, ?, ?) RETURNING name, surname, email, createdAt, modifiedAt;"
        );
        const stmtResult = stmt.get(
            name,
            surname,
            email,
            await hashPassword(password)
        );
        res.status(201).json(stmtResult);
    } catch (error) {
        next(error);
    }
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    const users = db
        .prepare(
            "SELECT name, surname, email, createdAt, modifiedAt FROM USERS"
        )
        .all();
    res.status(200).json(users);
};

export const getUserById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = db
        .prepare(
            "SELECT name, surname, email, createdAt, modifiedAt FROM USERS WHERE ID = ?"
        )
        .get(Number(id));
    if (!user)
        res.status(404).send({ message: `User with ID ${id} not found!` });

    return res.json(user);
};

export const patchUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { body } = req;
    let passwordHash: string | null = null;
    if (body.password) passwordHash = await hashPassword(body.password);
    try {
        const patched = db
            .prepare(
                "UPDATE USERS SET name = COALESCE(? , name), surname = COALESCE(?, surname), email = COALESCE(?, email), passwordHash = COALESCE(?, passwordHash) WHERE id = ? RETURNING name, surname, email, createdAt, modifiedAt;"
            )
            .get(
                body.name ?? null,
                body.surname ?? null,
                body.email ?? null,
                passwordHash ?? null,
                id
            );
        if (!patched)
            return res
                .status(404)
                .send({ message: `User with ID ${id} not found!` });
        return res
            .status(200)
            .send({ message: `User with ${id} updated!`, data: patched });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletion = db
            .prepare("DELETE FROM USERS WHERE ID = ? RETURNING *;")
            .get(Number(id));
        if (!deletion)
            return res
                .status(404)
                .send({ message: `User with ID ${id} not found!` });
        return res.status(200).send({ message: `User with ID ${id} deleted!` });
    } catch (error) {
        next(error);
    }
};
