import { eventBus } from "@syncellus/core/eventEmitter.js";
import { logger } from "@syncellus/core/logger.js";
import { NewEmployee, User } from "@syncellus/types/database.js";
import { insertNewEmployeeToDb } from "@syncellus/modules/employees/repository.js";

eventBus.on("user.created", async (user: User) => {
    logger.info(`event user.created called with body: ${JSON.stringify(user)}`);

    const employee: NewEmployee = {
        user_id: user.id
    };

    await insertNewEmployeeToDb(employee);
});
