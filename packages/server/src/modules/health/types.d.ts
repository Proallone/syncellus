export type HealthStatus = "Healthy" | "Unhealthy" | "Degraded";

export type ServiceHealthResponse = {
    status: HealthStatus;
    details?: Record<string, unknown>;
};

export type DatabaseHealthResponse = {
    sqlite_version: string;
} & ServiceHealthResponse;

interface IHealthService {
    getApplicationStatus(): ServiceHealthResponse;
    getDatabaseStatus(): Promise<DatabaseHealthResponse>;
}
