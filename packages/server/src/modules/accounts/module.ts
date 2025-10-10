import { eventBus } from "@syncellus/core/eventBus.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { AccountsController } from "@syncellus/modules/accounts/controller.js";
import { AccountsRepository } from "@syncellus/modules/accounts/repository.js";
import { AccountsService } from "@syncellus/modules/accounts/service.js";
import { UserCreatedHandler } from "./events.js";

export function buildAccountsModule() {
    const db = DatabaseService.getInstance();

    const repo = new AccountsRepository(db);
    const service = new AccountsService(repo);
    const controller = new AccountsController(service);

    const logger = LoggerService.getInstance();
    new UserCreatedHandler(eventBus, repo, logger).register();

    return { controller };
}
