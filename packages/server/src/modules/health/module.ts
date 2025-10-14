import { DatabaseService } from "@syncellus/database/database.ts";
import { HealthController } from "@syncellus/modules/health/controller.ts";
import { HealthRepository } from "@syncellus/modules/health/repository.ts";
import { HealthService } from "@syncellus/modules/health/service.ts";

export function buildHealthModule() {
  const db = DatabaseService.getInstance();

  const repo = new HealthRepository(db);
  const service = new HealthService(repo);
  const controller = new HealthController(service);

  return controller;
}
