import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@syncellus/types/index.js";
import { LoggerService } from "@syncellus/core/logger.js";
import config from "@syncellus/configs/config.js";

const logger = LoggerService.getInstance();

const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const isDevMode = ["dev", "development", "test"].includes(config.NODE_ENV); //TODO this is not a good idea but for the time beeing...
        if (isDevMode) return next();

        const { user } = req;

        if (!user || !roles.includes(user.role)) {
            logger.warn(`Unsuccessful RBAC attempt for ${req.ip}. Role ${user.role}, required roles ${roles}`);
            return res.status(403).send({ message: `Forbidden!` });
        }
        return next();
    };
};

export { requireRole };
