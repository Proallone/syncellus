import { EventHandler } from "@syncellus/core/eventHandler.js";
import { AppEvents } from "@syncellus/core/eventBus.js";
import { EmployeeRepository } from "@syncellus/modules/employees/repository.js";
import { EventBus } from "@syncellus/core/eventBus.js";
import type { Logger } from "pino";

export class UserCreatedHandler extends EventHandler<"user.created"> {
    constructor(
        eventBus: EventBus,
        private readonly repo: EmployeeRepository,
        private readonly logger: Logger
    ) {
        super(eventBus);
    }

    eventName(): "user.created" {
        return "user.created";
    }

    async handle(user: AppEvents["user.created"]): Promise<void> {
        this.logger.info(`event user.created called with body: ${JSON.stringify(user)}`);
        await this.repo.insertNewEmployeeToDb({ user_id: user.id });
    }
}
