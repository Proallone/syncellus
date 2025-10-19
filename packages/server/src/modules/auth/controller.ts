import { HttpStatus } from "@syncellus/core/http.ts";
import { UserInformationResponse } from "@syncellus/modules/auth/schemas/response.ts";
import type { AuthService } from "@syncellus/modules/auth/service.ts";
import type { TypedRequest } from "@syncellus/types/express.ts";
import type {
  AuthRequestBody,
  ForgotPasswordRequestBody,
  ResetPasswordRequestBody,
  VerifyEmailRequestBody,
} from "@syncellus/types/index.ts";
import { sendResponse } from "@syncellus/utils/responseBuilder.ts";
import type { Request, Response } from "express";
import type { Logger } from "pino";

export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly logger: Logger,
  ) {}

  public register = async (
    req: TypedRequest<AuthRequestBody>,
    res: Response,
  ) => {
    const { email, password } = req.body;
    const newUser = await this.service.registerNewUser({ email, password });
    this.logger.info({ email, action: "register" }, "Registration attempt");

    return sendResponse(res, HttpStatus.CREATED, {
      message: "Registration successful",
      data: newUser,
      schema: UserInformationResponse,
    });
  };

  public verifyEmail = async (
    req: TypedRequest<VerifyEmailRequestBody>,
    res: Response,
  ) => {
    const { token } = req.body;
    this.logger.info({ action: "verify-email" }, "Verification attempt");
    this.service.verifyAccountEmail(token);

    return sendResponse(res, HttpStatus.OK, {
      message: "Email verified successfully",
    });
  };

  public login = async (req: TypedRequest<AuthRequestBody>, res: Response) => {
    const { user } = req;
    this.logger.info({ public_id: user.public_id }, "User login attempt");
    const accessToken = await this.service.issueLoginToken(user);

    return sendResponse(res, HttpStatus.OK, {
      message: "Login successful",
      data: { accessToken },
    });
  };

  public forgotPassword = async (
    req: TypedRequest<ForgotPasswordRequestBody>,
    res: Response,
  ) => {
    const { email } = req.body;
    this.logger.info(
      { email, action: "forgot-password" },
      "Password reset requested",
    );
    await this.service.issuePasswordResetToken(email);

    return sendResponse(res, HttpStatus.OK, {
      message:
        `Password reset process started successfully - mail with details sent to ${email}`,
    });
  };

  public resetPassword = async (
    req: TypedRequest<ResetPasswordRequestBody>,
    res: Response,
  ) => {
    const { token, newPassword } = req.body;
    this.logger.info({ action: "reset-password" }, "Password reset attempt");
    await this.service.performPasswordReset(token, newPassword);

    return sendResponse(res, HttpStatus.OK, {
      message: "Password reset successfully",
    });
  };

  public getProfile = async (req: Request, res: Response) => {
    const { user } = req;
    this.logger.info(
      { userId: user.public_id, action: "get-profile" },
      "Profile requested",
    );

    const profile = await this.service.findUserByPublicID(user.public_id);
    return sendResponse(res, HttpStatus.OK, {
      message: "This account information",
      data: profile,
      schema: UserInformationResponse,
    });
  };
}
