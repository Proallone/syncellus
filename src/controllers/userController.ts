import { Request, Response, NextFunction } from "express";
import { users, User } from "../models/user.js";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newUser: User = { id: Date.now(), name };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(users);
};
