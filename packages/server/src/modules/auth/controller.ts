import type { Request, Response, NextFunction } from "express";
import type { AuthCredentials } from "@syncellus/types/index.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { Logger } from "pino";

export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly logger: Logger
    ) {}

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const user: AuthCredentials = {
            ...req.body
        };

        this.logger.debug(`User ${user.email} signs up`);
        try {
            const newUser = await this.service.insertNewUser(user);
            if (!newUser) {
                return res.status(409).send({ message: `User with email ${user.email} already exists!` });
            }
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };

    public signIn = async (req: Request, res: Response, next: NextFunction) => {
        const credentials: AuthCredentials = req.body;
        try {
            const { accessToken } = await this.service.verifyUserCredentials(credentials);

            return res.status(200).json({
                message: "Successfull sign in!",
                accessToken
            });
        } catch (error) {
            next(error);
        }
    };
}
