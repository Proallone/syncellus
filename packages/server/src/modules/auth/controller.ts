import type { Request, Response, NextFunction } from "express";
import type { AuthCredentials } from "@syncellus/types/index.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { Logger } from "pino";
import Jwt from "jsonwebtoken";
import { AppConfig } from "@syncellus/configs/config.js";

const config = AppConfig.getInstance();
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly logger: Logger
    ) {}

    public register = async (req: Request, res: Response, next: NextFunction) => {
        const user: AuthCredentials = req.body;

        try {
            const newUser = await this.service.registerNewUser(user);
            this.logger.info(`User ${user.email} successfully registered on ${newUser.createdAt}`);
            return res.status(201).json(newUser);
        } catch (error) {
            this.logger.error(`Unsuccessful user registration for ${user.email}`);
            next(error);
        }
    };

    //TODO cleanup
    public login = (req: Request, res: Response) => {
        const user = req.user as { public_id: string; role: string };
        const accessToken = Jwt.sign(user, config.JWT_TOKEN_SECRET, { expiresIn: "30m" });

        return res.status(200).json({
            message: "Successful sign in!",
            accessToken
        });
    };
}
