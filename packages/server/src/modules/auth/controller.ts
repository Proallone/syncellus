import type { Request, Response, NextFunction } from "express";
import type { NewUser } from "../../types/database.js";
import type { AuthCredentials } from "../../types/index.js";

import { insertNewUser, verifyUserCredentials } from "./service.js";
import { logger } from "../../core/logger.js";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const user: NewUser = {
        ...req.body
    };

    logger.debug(`User ${user.email} signs up`);
    try {
        const newUser = await insertNewUser(user);
        if (!newUser) {
            return res.status(409).send({ message: `User with email ${user.email} already exists!` });
        }
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const credentials: AuthCredentials = req.body;
    try {
        const match = await verifyUserCredentials(credentials);
        if (match) {
            return res.status(200).send({
                message: "Sign in successfull!"
            });
        }

        //todo issue a token or send session here...
        logger.debug(`Unsuccessfull login attempt by the user ${credentials.email}`);

        return res.status(401).send({
            message: "Incorrect email/password!"
        });
    } catch (error) {
        next(error);
    }
};

export { signUp, signIn };
