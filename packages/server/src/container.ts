import { LoggerService } from "@syncellus/core/logger.js";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.js";
import { MailService } from "@syncellus/modules/mailer/service.js";
import passport from "passport";
import { DatabaseService } from "./database/database.js";

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
    passport
};
