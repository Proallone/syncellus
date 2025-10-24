export type HealthStatus = "Healthy" | "Unhealthy" | "Degraded";

export type ServiceHealthResponse = {
  status: HealthStatus;
  details?: Record<string, unknown>;
};

export type DatabaseHealthResponse = {
  postgres_version: string;
} & ServiceHealthResponse;

export interface IHealthService {
  getApplicationStatus(): ServiceHealthResponse;
  getDatabaseStatus(): Promise<DatabaseHealthResponse>;
}

export interface IHealthRepository {
  getDatabaseVersionFromDb(): Promise<DatabaseHealthResponse>;
  getDatabaseHealth(): Promise<boolean>;
}
