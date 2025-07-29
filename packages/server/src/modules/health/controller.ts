import type { Request, Response, NextFunction } from "express";
import { getApplicationStatus, getDatabaseVersion } from "./service.js";

const getApplicationHealth = (_req: Request, res: Response, _next: NextFunction) => {
    const appStatus = getApplicationStatus();
    return res.status(200).send({
        message: appStatus
    });
};

const getDatabaseHealth = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const version = await getDatabaseVersion();
        return res.status(200).json(version);
    } catch (error) {
        next(error);
    }
};

export { getApplicationHealth, getDatabaseHealth };
