import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AccountsController } from "@syncellus/modules/accounts/controller.js";
import { AccountsPostSchema, AccountsPatchSchema, AccountsGetSchema } from "@syncellus/modules/accounts/schema.js";
import { TimesheetPostSchema } from "@syncellus/modules/timesheets/schema.js";
import { AccountsRepository } from "@syncellus/modules/accounts/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { AccountsService } from "@syncellus/modules/accounts/service.js";
import { eventBus } from "@syncellus/core/eventBus.js";
import { UserCreatedHandler } from "./events.js";
import { TimesheetService } from "../timesheets/service.js";
import { TimesheetRepository } from "../timesheets/repository.js";
import { LoggerService } from "@syncellus/core/logger.js";
import passport from "passport";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new AccountsRepository(db);
const service = new AccountsService(repo);

const timesheetRepo = new TimesheetRepository(db);
const timesheetService = new TimesheetService(timesheetRepo);

const controller = new AccountsController(service, timesheetService);
const logger = LoggerService.getInstance();
new UserCreatedHandler(eventBus, repo, logger).register();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", validate(AccountsPostSchema), controller.createAccount);
router.get("/", validate(AccountsGetSchema), controller.getAccounts);
router.get("/:id", controller.getOneAccount);
router.patch("/:id", validate(AccountsPatchSchema), controller.updateAccount);
router.delete("/:id", controller.deleteAccount);

router.get("/:employeeId/timesheets", controller.getTimesheetsByAccount);
router.post("/:employeeId/timesheets", validate(TimesheetPostSchema), controller.createTimesheetForAccount);

export default router;
