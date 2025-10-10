import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetsController } from "@syncellus/modules/workspaces/timesheets/controller.js";
import { TimesheetsRepository } from "@syncellus/modules/workspaces/timesheets/repository.js";
import { TimesheetsService } from "@syncellus/modules/workspaces/timesheets/service.js";

export function buildTimesheetsModule() {
    const db = DatabaseService.getInstance();

    const repo = new TimesheetsRepository(db);
    const service = new TimesheetsService(repo);
    const controller = new TimesheetsController(service);

    return controller;
}
