import type { Request, Response, NextFunction } from "express";
import {
    createNewEmployee,
    getAllEmployees,
    getEmployeeById,
    patchEmployeeInDb,
    deleteEmployeeInDb
} from "./model.js";
import type { EmployeeUpdate, NewEmployee } from "../../types/database.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: NewEmployee = { ...req.body };
        const newUser = await createNewEmployee(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllEmployees();
    return res.status(200).json(users);
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await getEmployeeById(Number(id));
    if (!user)
        res.status(404).send({ message: `User with ID ${id} not found!` });

    return res.json(user);
};

const patchUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const data: EmployeeUpdate = { id, ...body };
        const patched = await patchEmployeeInDb(data);
        if (!patched)
            return res
                .status(404)
                .send({ message: `User with ID ${id} not found!` });
        return res.status(200).send(patched);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const deletion = await deleteEmployeeInDb(Number(id));
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
