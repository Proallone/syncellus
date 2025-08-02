import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@syncellus/types/index.js";
import { logger } from "@syncellus/core/logger.js";

const requireRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== role) {
            logger.warn(`Unsuccessful RBAC attempt for ${req.ip}`);
            return res.status(403).send({ message: `Forbidden!` });
        }
        next();
    };
};

export { requireRole };
