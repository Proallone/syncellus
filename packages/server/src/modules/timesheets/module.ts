import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetRepository } from "@syncellus/modules/timesheets/repository.js";
import { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { TimesheetController } from "@syncellus/modules/timesheets/controller.js";

export function buildTimesheetsModule() {
    const db = DatabaseService.getInstance();

    const repo = new TimesheetRepository(db);
    const service = new TimesheetService(repo);
    const controller = new TimesheetController(service);

    return { controller };
}
