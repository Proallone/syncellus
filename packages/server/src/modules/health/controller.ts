import type { Request, Response } from "express";
import type { HealthService } from "@syncellus/modules/health/service.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";

export class HealthController {
    constructor(private readonly service: HealthService) {}

    public getApplicationHealth = (_req: Request, res: Response) => {
        const status = this.service.getApplicationStatus();

        return sendResponse(res, HttpStatus.OK, { message: "Service status", data: status });
    };

    public getDatabaseHealth = async (_req: Request, res: Response) => {
        const version = await this.service.getDatabaseStatus();

        return sendResponse(res, HttpStatus.OK, { message: "Database service status", data: version });
    };
}
