import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetRepository } from "@syncellus/modules/workspaces/timesheets/repository.js";
import { TimesheetService } from "@syncellus/modules/workspaces/timesheets/service.js";
import { TimesheetsController } from "@syncellus/modules/workspaces/timesheets/controller.js";

export function buildTimesheetsModule() {
    const db = DatabaseService.getInstance();

    const repo = new TimesheetRepository(db);
    const service = new TimesheetService(repo);
    const controller = new TimesheetsController(service);

    return controller;
}
