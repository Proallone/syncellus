import type { Request, Response, NextFunction } from "express";
import { getApplicationStatus, getDatabaseVersion } from "./service.js";

const getApplicationHealth = (req: Request, res: Response, next: NextFunction) => {
    const status = getApplicationStatus();
    res.status(200).send({
        message: status
    });
};

const getDatabaseHealth = async (req: Request, res: Response, next: NextFunction) => {
    const version = await getDatabaseVersion();
    return res.status(200).json(version);
};

export { getApplicationHealth, getDatabaseHealth };
