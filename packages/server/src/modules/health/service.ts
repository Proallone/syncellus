import type { HealthRepository } from "@syncellus/modules/health/repository.js";
import type { DatabaseHealthResponse, IHealthService, ServiceHealthResponse } from "@syncellus/modules/health/types.js";

export class HealthService implements IHealthService {
    constructor(private readonly repo: HealthRepository) {}

    public getApplicationStatus = (): ServiceHealthResponse => {
        return { status: "Healthy" };
    };

    public getDatabaseStatus = async (): Promise<DatabaseHealthResponse> => {
        const version = await this.repo.getDatabaseVersionFromDb();
        return {
            status: "Healthy",
            sqlite_version: version.sqlite_version
        };
    };
}
