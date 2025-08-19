import type { Request, Response, NextFunction } from "express";
import type { AuthCredentials } from "@syncellus/types/index.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { Logger } from "pino";
import Jwt from "jsonwebtoken";
import config from "@syncellus/configs/config.js";
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

    //TODO cleanup
    public signIn = (req: Request, res: Response) => {
        const user = req.user as { public_id: string; role: string };
        const accessToken = Jwt.sign(user, config.JWT_TOKEN_SECRET, { expiresIn: "30m" });

        return res.status(200).json({
            message: "Successful sign in!",
            accessToken
        });
    };
}
