import type { HealthRepository } from "@syncellus/modules/health/repository.ts";
import type { DatabaseHealthResponse, IHealthService, ServiceHealthResponse } from "@syncellus/modules/health/types.d.ts";

export class HealthService implements IHealthService {
    constructor(private readonly repo: HealthRepository) {}

    public getApplicationStatus = (): ServiceHealthResponse => {
        return { status: "Healthy" };
    };

    public getDatabaseStatus = async (): Promise<DatabaseHealthResponse> => {
        const version = await this.repo.getDatabaseVersionFromDb();
        return {
            status: "Healthy",
            postgres_version: version.postgres_version
        };
    };
}
