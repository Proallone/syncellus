import { DatabaseService } from "@syncellus/hono/database/database.ts";
import { HealthRepository } from "@syncellus/hono/modules/health/repository.ts";
import { HealthService } from "@syncellus/hono/modules/health/service.ts";

export const createDependencies = () => {
  const db = DatabaseService.getInstance();

  const healthRepository = new HealthRepository(db);
  const healthService = new HealthService(healthRepository);

  return { db, healthRepository, healthService };
}
