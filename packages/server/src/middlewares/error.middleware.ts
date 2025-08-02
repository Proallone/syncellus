import type { Request, Response, NextFunction } from "express";
import type { AppError } from "@syncellus/types/index.js";
import { logger } from "@syncellus/core/logger.js";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
};

export { errorHandler };
