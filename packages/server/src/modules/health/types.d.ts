export type ServiceHealth = {
    status: "Healthy" | "Unhealthy";
};

export type DatabaseHealth = {
    sqlite_version: string;
} & ServiceHealth;
