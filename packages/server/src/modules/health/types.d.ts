import type { DbHealthResponse } from "@syncellus/types/index.js";

export type HealthStatus = "Healthy" | "Unhealthy" | "Degraded";

export type ServiceHealthResponse = {
    status: HealthStatus;
    details?: Record<string, unknown>;
};

export type DatabaseHealthResponse = {
    sqlite_version: string;
} & ServiceHealthResponse;

export interface IHealthService {
    getApplicationStatus(): ServiceHealthResponse;
    getDatabaseStatus(): Promise<DatabaseHealthResponse>;
}

export interface IHealthRepository {
    getDatabaseVersionFromDb(): Promise<DbHealthResponse>;
    getDatabaseHealth(): Promise<boolean>;
}
