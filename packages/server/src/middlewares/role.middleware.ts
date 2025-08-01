import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";

const requireRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).send({ message: `Forbidden!` });
        }
        next();
    };
};

export { requireRole };
