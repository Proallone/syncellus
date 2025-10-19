import { DatabaseService } from "@syncellus/database/database.ts";
import { TimesheetsController } from "@syncellus/modules/workspaces/timesheets/controller.ts";
import { TimesheetsRepository } from "@syncellus/modules/workspaces/timesheets/repository.ts";
import { TimesheetsService } from "@syncellus/modules/workspaces/timesheets/service.ts";

export function buildTimesheetsModule() {
  const db = DatabaseService.getInstance();

  const repo = new TimesheetsRepository(db);
  const service = new TimesheetsService(repo);
  const controller = new TimesheetsController(service);

  return controller;
}
