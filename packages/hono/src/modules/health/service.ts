import { HealthRepository } from "@syncellus/hono/modules/health/repository.ts";

export class HealthService {
    constructor(private readonly repo: HealthRepository) { }

    public getApplicationStatus = async () => {
        return await { status: "Healthy" };
    };

    public getDatabaseStatus = async () => {
        const version = await this.repo.getDatabaseVersionFromDb();

        return {
            status: "Healthy",
            postgres_version: version.postgres_version,
        };
    };
}
