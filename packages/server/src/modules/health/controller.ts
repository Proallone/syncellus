import type { Request, Response, NextFunction } from "express";
import type { HealthService } from "@syncellus/modules/health/service.js";

export class HealthController {
    constructor(private readonly service: HealthService) {}

    public getApplicationHealth = (_req: Request, res: Response) => {
        const status = this.service.getApplicationStatus();
        return res.status(200).send({
            ...status
        });
    };

    public getDatabaseHealth = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const version = await this.service.getDatabaseStatus();
            return res.status(200).json(version);
        } catch (error) {
            next(error);
        }
    };
}
