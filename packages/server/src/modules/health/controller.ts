import type { Request, Response, NextFunction } from "express";
import { getApplicationStatus, getDatabaseVersion } from "./service.js";
import { logger } from "../../core/logger.js";

const getApplicationHealth = (req: Request, res: Response, next: NextFunction) => {
    const status = getApplicationStatus();
    res.status(200).send({
        message: status
    });
};

const getDatabaseHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const version = await getDatabaseVersion();
        return res.status(200).json(version);
    } catch (error) {
        logger.error("Database health check failed:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export { getApplicationHealth, getDatabaseHealth };
