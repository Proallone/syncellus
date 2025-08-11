import type { Request, Response } from "express";
import type { AppError } from "@syncellus/types/index.js";
import { LoggerService } from "@syncellus/core/logger.js";

const logger = LoggerService.getInstance();

const errorHandler = (err: AppError, _req: Request, res: Response) => {
    logger.warn(err);
    return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
};

export { errorHandler };
