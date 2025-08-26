import type { Request, Response } from "express";
import type { HealthService } from "@syncellus/modules/health/service.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { handlerWrapper } from "@syncellus/utils/handlerWrapper.js";

export class HealthController {
    constructor(private readonly service: HealthService) {}

    public getApplicationHealth = handlerWrapper((_req: Request, res: Response) => {
        const status = this.service.getApplicationStatus();

        return sendResponse(res, HttpStatus.OK, { message: "Service status", data: status });
    });

    public getDatabaseHealth = handlerWrapper(async (_req: Request, res: Response) => {
        const version = await this.service.getDatabaseStatus();

        return sendResponse(res, HttpStatus.OK, { message: "Database service status", data: version });
    });
}
