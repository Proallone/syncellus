import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { AuthRequest, User } from "../types/index.js";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies["access_token"];
    if (!token) return res.status(401).send({ message: `Unauthorized!` });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: `Invalid token!` });
    }
};

export { authMiddleware };
