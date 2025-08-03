import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { AuthRequest, User } from "@syncellus/types/index.js";
import config from "@syncellus/configs/config.js";
import { logger } from "@syncellus/core/logger.js";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.authorization;

    const isDevMode = ["dev", "development", "test"].includes(config.nodeEnv); //TODO this is not a good idea but for the time beeing...
    if (isDevMode) return next();

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send({ message: `Missing token!` });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwt_secret) as User;
        req.user = decoded;
        return next();
    } catch (error) {
        logger.warn(`Unsuccessful auth from ${req.ip}`);
        return res.status(401).send({ message: `Invalid token!` });
    }
};

export { authMiddleware };
