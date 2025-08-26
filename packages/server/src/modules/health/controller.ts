import type { Request, Response, NextFunction } from "express";
import type { HealthService } from "@syncellus/modules/health/service.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";

export class HealthController {
    constructor(private readonly service: HealthService) {}

    public getApplicationHealth = (_req: Request, res: Response) => {
        const status = this.service.getApplicationStatus();
        return sendResponse(res, 200, { message: "Service status", data: status });
    };

    public getDatabaseHealth = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const version = await this.service.getDatabaseStatus();
            return sendResponse(res, 200, { message: "Database service status", data: version });
        } catch (error) {
            next(error);
        }
    };
}
