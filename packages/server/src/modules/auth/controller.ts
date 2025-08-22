import type { Response, NextFunction } from "express";
import type { AuthRequestBody, ForgotPasswordRequestBody, ResetPasswordRequestBody } from "@syncellus/types/index.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { Logger } from "pino";
import Jwt from "jsonwebtoken";
import { AppConfig } from "@syncellus/configs/config.js";
import { TypedRequest } from "@syncellus/types/express.js";

const config = AppConfig.getInstance();
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly logger: Logger
    ) {}

    public register = async (req: TypedRequest<AuthRequestBody>, res: Response, next: NextFunction) => {
        const user = req.body;

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
    public login = (req: TypedRequest<AuthRequestBody>, res: Response) => {
        const user = req.user as { public_id: string; role: string };
        const accessToken = Jwt.sign(user, config.JWT_TOKEN_SECRET, { expiresIn: "30m" });

        return res.status(200).json({
            message: "Successful sign in!",
            accessToken
        });
    };

    public forgotPassword = async (req: TypedRequest<ForgotPasswordRequestBody>, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            this.logger.info(`Password forgot for ${email} called`);
            const token = await this.service.issuePasswordResetToken(email);
            return res.status(200).json({
                message: "Password reset",
                token
            });
        } catch (error) {
            next(error);
        }
    };

    public resetPassword = async (req: TypedRequest<ResetPasswordRequestBody>, res: Response, _next: NextFunction) => {
        const { email, token } = req.body;
        this.logger.info(`Password reset for ${email} called, token ${token}`);
        return res.status(200).json({ message: "test" });
    };
}
