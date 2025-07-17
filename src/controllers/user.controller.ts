import { Request, Response, NextFunction } from "express";
import {
    createUserInDb,
    getAllUsers,
    getUserById,
    User,
    patchUserInDb,
    deleteUserInDb
} from "../models/user.model.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = { ...req.body };
        const newUser = await createUserInDb(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    const users = getAllUsers();
    res.status(200).json(users);
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = getUserById(id);
    if (!user)
        res.status(404).send({ message: `User with ID ${id} not found!` });

    return res.json(user);
};

const patchUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const data: User = { id, ...body };
        const patched = await patchUserInDb(data);
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

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletion = deleteUserInDb(id);
        if (!deletion)
            return res
                .status(404)
                .send({ message: `User with ID ${id} not found!` });
        return res.status(200).send({ message: `User with ID ${id} deleted!` });
    } catch (error) {
        next(error);
    }
};

export { createUser, getUsers, getUser, patchUser, deleteUser };
