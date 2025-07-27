import { eventBus } from "../../core/eventEmitter.js";
import { logger } from "../../core/logger.js";
import { NewEmployee, User } from "../../types/database.js";
import { insertNewEmployeeToDb } from "./repository.js";

eventBus.on('user.created', async (user: User) => {
    logger.info(`event user.created called with body: ${JSON.stringify(user)}`);

    const employee: NewEmployee = {
        user_id: user.id,
    };

    await insertNewEmployeeToDb(employee);
})