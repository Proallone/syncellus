import passport from "passport";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import { DatabaseService } from "./database/database.js";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { NodemailerMailer } from "@syncellus/modules/mailer/providers/NodemailerMailer.js";
import { MailService } from "@syncellus/modules/mailer/service.js";

const db = DatabaseService.getInstance();
const logger = LoggerService.getInstance();

const authRepo = new AuthRepository(db);
const mailer = new NodemailerMailer();
const mailService = new MailService(mailer);

const authService = new AuthService(authRepo, mailService);

configurePassport(authService);

export const container = {
    db,
    logger,
    authService,
    passport
};
