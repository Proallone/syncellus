import type { Request, Response, NextFunction } from "express";
import type { AppError } from "@syncellus/types/index.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { HttpError } from "@syncellus/errors/http.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { AppConfig } from "@syncellus/configs/config.js";

const logger = LoggerService.getInstance();
const config = AppConfig.getInstance();

const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: {
                message: err.message
            }
        });
    }

    const statusCode = 500;
    const message = err.message ? err.message : "An unexpected error occurred.";
    const details = config.NODE_ENV === "development" ? err.stack : undefined;

    return sendResponse(res, statusCode, { success: false, message: message, data: { details } });
};

export { errorHandler };
