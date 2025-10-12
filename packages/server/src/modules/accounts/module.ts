import { eventBus } from "@syncellus/core/eventBus.ts";
import { LoggerService } from "@syncellus/core/logger.ts";
import { DatabaseService } from "@syncellus/database/database.ts";
import { AccountsController } from "@syncellus/modules/accounts/controller.ts";
import { AccountsRepository } from "@syncellus/modules/accounts/repository.ts";
import { AccountsService } from "@syncellus/modules/accounts/service.ts";
import { UserCreatedHandler } from "./events.ts";

export function buildAccountsModule() {
    const db = DatabaseService.getInstance();

    const repo = new AccountsRepository(db);
    const service = new AccountsService(repo);
    const controller = new AccountsController(service);

    const logger = LoggerService.getInstance();
    new UserCreatedHandler(eventBus, repo, logger).register();

    return { controller };
}
