import { DatabaseService } from "@syncellus/database/database.js";
import { AccountsRepository } from "@syncellus/modules/accounts/repository.js";
import { AccountsService } from "@syncellus/modules/accounts/service.js";
import { AccountsController } from "@syncellus/modules/accounts/controller.js";
import { TimesheetService } from "@syncellus/modules/workspaces/timesheets/service.js";
import { TimesheetRepository } from "@syncellus/modules/workspaces/timesheets/repository.js";
import { eventBus } from "@syncellus/core/eventBus.js";
import { UserCreatedHandler } from "./events.js";
import { LoggerService } from "@syncellus/core/logger.js";

export function buildAccountsModule() {
    const db = DatabaseService.getInstance();

    const repo = new AccountsRepository(db);
    const service = new AccountsService(repo);
    const timesheetsRepo = new TimesheetRepository(db);
    const timesheetsService = new TimesheetService(timesheetsRepo);

    const controller = new AccountsController(service, timesheetsService);

    const logger = LoggerService.getInstance();
    new UserCreatedHandler(eventBus, repo, logger).register();

    return { controller };
}
