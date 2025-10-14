import { LoggerService } from "@syncellus/core/logger.ts";
import { configurePassport } from "@syncellus/modules/auth/passport.ts";
import { AuthRepository } from "@syncellus/modules/auth/repository.ts";
import { AuthService } from "@syncellus/modules/auth/service.ts";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.ts";
import { MailService } from "@syncellus/modules/mailer/service.ts";
import passport from "passport";
import { DatabaseService } from "./database/database.ts";

const db = DatabaseService.getInstance();
const logger = LoggerService.getInstance();

const authRepo = new AuthRepository(db);
const mailer = new NodemailerProvider();
const mailService = new MailService(mailer);

const authService = new AuthService(authRepo, mailService);

configurePassport(authService);

export const container = {
  db,
  logger,
  authService,
  passport,
};
