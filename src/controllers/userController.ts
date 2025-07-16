import { Request, Response, NextFunction } from "express";
import db from "../database/database.js";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, surname, email } = req.body;
        const stmt = db.prepare("INSERT INTO USERS (name, surname, email) VALUES (?, ?, ?) RETURNING *;");
        const stmtResult = stmt.run(name, surname, email);
        res.status(201).json(stmtResult);
    } catch (error) {
        next(error);
    }
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    const users = db.prepare('SELECT * FROM USERS').all();
    res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = db.prepare("SELECT * FROM USERS WHERE ID = ?").get(Number(id));
    if(!user) res.status(404).send({message: `User with ID ${id} not found!`});

    return res.json(user);
};