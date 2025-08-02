import type { Request, Response, NextFunction } from "express";
import type { NewUser } from "@syncellus/types/database.js";
import type { AuthCredentials } from "@syncellus/types/index.js";
import { insertNewUser, verifyUserCredentials } from "@syncellus/modules/auth/service.js";
import { logger } from "@syncellus/core/logger.js";

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
        const { user, accessToken } = await verifyUserCredentials(credentials);

        return res.status(200).json({
            message: "Successfull sign in!",
            user,
            accessToken
        });
    } catch (error) {
        next(error);
    }
};

export { signUp, signIn };
