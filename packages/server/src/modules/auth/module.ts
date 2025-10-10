import { LoggerService } from "@syncellus/core/logger.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { AuthController } from "@syncellus/modules/auth/controller.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.js";
import { MailService } from "@syncellus/modules/mailer/service.js";
import { AuthRepository } from "./repository.js";

export function buildAuthModule() {
    const db = DatabaseService.getInstance();
    const logger = LoggerService.getInstance();

    const repo = new AuthRepository(db);
    const mailProvider = new NodemailerProvider();
    const mailService = new MailService(mailProvider);

    const service = new AuthService(repo, mailService);
    const controller = new AuthController(service, logger);

    return controller;
}
