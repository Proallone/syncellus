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

    const newUser = await insertNewUser(user);

    return res.status(201).json(newUser);
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const credentials: AuthCredentials = req.body;
    const match = await verifyUserCredentials(credentials);
    if (match)
        return res.status(200).send({
            message: "Sign in successfull!"
        });
    //todo issue a token or send session here...

    logger.debug(`Unsuccessfull login attempt by the user ${credentials.email}`);
    return res.status(401).send({
        message: "Incorrect email/password!"
    });
};

export { signUp, signIn };
