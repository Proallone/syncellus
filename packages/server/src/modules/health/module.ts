import { DatabaseService } from "@syncellus/database/database.js";
import { HealthRepository } from "@syncellus/modules/health/repository.js";
import { HealthService } from "@syncellus/modules/health/service.js";
import { HealthController } from "@syncellus/modules/health/controller.js";

export function buildHealthModule() {
    const db = DatabaseService.getInstance();

    const repo = new HealthRepository(db);
    const service = new HealthService(repo);
    const controller = new HealthController(service);

    return controller;
}
