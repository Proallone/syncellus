export type ServiceHealthResponse = {
    status: "Healthy" | "Unhealthy";
};

export type DatabaseHealthResponse = {
    sqlite_version: string;
} & ServiceHealthResponse;

interface IHealthService {
    getApplicationStatus(): ServiceHealthResponse;
    getDatabaseStatus(): Promise<DatabaseHealthResponse>;
}
