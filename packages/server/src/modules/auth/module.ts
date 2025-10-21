import { LoggerService } from "@syncellus/core/logger.ts";
import { DatabaseService } from "@syncellus/database/database.ts";
import { AuthController } from "@syncellus/modules/auth/controller.ts";
import { AuthService } from "@syncellus/modules/auth/service.ts";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.ts";
import { MailService } from "@syncellus/modules/mailer/service.ts";
import { AuthRepository } from "@syncellus/modules/auth/repository.ts";

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
