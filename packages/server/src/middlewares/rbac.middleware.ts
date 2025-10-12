import { AppConfig } from "@syncellus/configs/config.ts";
import { LoggerService } from "@syncellus/core/logger.ts";
import type { AuthRequest } from "@syncellus/types/index.ts";
import type { NextFunction, Response } from "express";

const config = AppConfig.getInstance();
const logger = LoggerService.getInstance();

export const requireRole = (required_role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const isDevMode = ["dev", "development", "test"].includes(config.NODE_ENV); //TODO this is not a good idea but for the time beeing...
        if (isDevMode) return next();

        const { user } = req;

        if (!user || !user.roles.includes(required_role)) {
            logger.warn(`Unsuccessful RBAC role attempt for ${user.public_id}`);
            return res.status(403).send({ message: `Forbidden!` });
        }
        return next();
    };
};

export const requireScope = (required_scope: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const isDevMode = ["dev", "development", "test"].includes(config.NODE_ENV); //TODO this is not a good idea but for the time beeing...
        if (isDevMode) return next();

        const { user } = req;

        if (!user || !user.scopes.includes(required_scope)) {
            logger.warn(`Unsuccessful RBAC scope attempt for ${user.public_id}`);
            return res.status(403).send({ message: `Forbidden!` });
        }
        return next();
    };
};
