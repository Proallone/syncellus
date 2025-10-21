
export class HealthService {
    constructor() { }

    public static getApplicationStatus = async () => {
        return await { status: "Healthy" };
    };

    public static getDatabaseStatus = async () => {
        return await {
            status: "Healthy",
            postgres_version: "TBD",
        };
    };
}
