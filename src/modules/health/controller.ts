import type { Request, Response, NextFunction } from "express";
import { getDatabaseHealthDb } from "./model.js";

const getApplicationHealth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).send({ message: "Healthy!" });
};

const getDatabaseHealth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const version = await getDatabaseHealthDb();
    return res.status(200).json(version);
};

export { getApplicationHealth, getDatabaseHealth };
