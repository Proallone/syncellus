import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { AuthRequest, User } from "@syncellus/types/index.js";
import config from "@syncellus/configs/config.js";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send({ message: `Missing token!` });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwt_secret) as User;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: `Invalid token!` });
    }
};

export { authMiddleware };
