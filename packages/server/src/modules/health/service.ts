import { HealthRepository } from "@syncellus/modules/health/repository.js";
import { DatabaseHealth, ServiceHealth } from "./types.js";

export class HealthService {
    constructor(private readonly repo: HealthRepository) {}

    public getApplicationStatus = (): ServiceHealth => {
        return { status: "Healthy" };
    };

    public getDatabaseStatus = async (): Promise<DatabaseHealth> => {
        const version = await this.repo.getDatabaseVersionFromDb();
        return {
            status: "Healthy",
            sqlite_version: version.sqlite_version
        };
    };
}
