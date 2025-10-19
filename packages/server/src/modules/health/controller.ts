import { HttpStatus } from "@syncellus/core/http.ts";
import type { HealthService } from "@syncellus/modules/health/service.ts";
import { sendResponse } from "@syncellus/utils/responseBuilder.ts";
import type { Request, Response } from "express";

export class HealthController {
  constructor(private readonly service: HealthService) {}

  public getApplicationHealth = async (_req: Request, res: Response) => {
    const status = this.service.getApplicationStatus();

    return sendResponse(res, HttpStatus.OK, {
      message: "Service status",
      data: status,
    });
  };

  public getDatabaseHealth = async (_req: Request, res: Response) => {
    const version = await this.service.getDatabaseStatus();

    return sendResponse(res, HttpStatus.OK, {
      message: "Database service status",
      data: version,
    });
  };

  public getFullHealth = async (_req: Request, res: Response) => {
    const appStatus = this.service.getApplicationStatus();
    const dbStatus = await this.service.getDatabaseStatus();

    const allHealthy = [appStatus, dbStatus].every((s) =>
      s.status === "Healthy"
    );

    return sendResponse(
      res,
      allHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE,
      {
        message: "System health",
        data: {
          application: appStatus,
          database: dbStatus,
        },
      },
    );
  };
}
