import type { Request, Response } from "express";
import type { AuthRequestBody, ForgotPasswordRequestBody, ResetPasswordRequestBody } from "@syncellus/types/index.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { Logger } from "pino";
import type { TypedRequest } from "@syncellus/types/express.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { UserInformationResponse } from "@syncellus/modules/auth/schemas/response.js";

export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly logger: Logger
    ) {}

    public register = async (req: TypedRequest<AuthRequestBody>, res: Response) => {
        const registerData = req.body;
        const newUser = await this.service.registerNewUser(registerData);
        this.logger.info({ email: registerData.email }, "User registration attempt");

        return sendResponse(res, HttpStatus.CREATED, { message: "Registration successful", data: newUser, schema: UserInformationResponse });
    };

    public login = async (req: TypedRequest<AuthRequestBody>, res: Response) => {
        const { user } = req;
        const accessToken = await this.service.issueLoginToken(user);

        return sendResponse(res, HttpStatus.OK, { message: "Login successful", data: { accessToken } });
    };

    public forgotPassword = async (req: TypedRequest<ForgotPasswordRequestBody>, res: Response) => {
        const { email } = req.body;
        this.logger.info({ email: email }, "User login attempt");
        const token = await this.service.issuePasswordResetToken(email);

        return sendResponse(res, HttpStatus.OK, { message: "Password reset process started successfully", data: { token } });
    };

    public resetPassword = async (req: TypedRequest<ResetPasswordRequestBody>, res: Response) => {
        const { token, newPassword } = req.body;
        this.logger.info("User password reset attempt");
        await this.service.performPasswordReset(token, newPassword);

        return sendResponse(res, HttpStatus.OK, { message: "Password reset successfully" });
    };

    public getMeInformation = async (req: Request, res: Response) => {
        const { user } = req;
        const data = await this.service.findUserByPublicID(user.public_id);
        return sendResponse(res, HttpStatus.OK, { message: "This account information", data: data, schema: UserInformationResponse });
    };
}
