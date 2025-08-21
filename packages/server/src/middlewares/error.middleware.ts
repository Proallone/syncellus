import type { Request, Response, NextFunction } from "express";
import type { AppError } from "@syncellus/types/index.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { HttpError } from "@syncellus/errors/Errors.js";

const logger = LoggerService.getInstance();

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

    return res.status(statusCode).json({
        error: {
            message,
            details: process.env.NODE_ENV === "development" ? err.stack : undefined
        }
    });
};

export { errorHandler };
