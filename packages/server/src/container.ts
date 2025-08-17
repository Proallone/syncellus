import passport from "passport";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import { DatabaseService } from "./database/database.js";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { LoggerService } from "@syncellus/core/logger.js";

const db = DatabaseService.getInstance();
const logger = LoggerService.getInstance();

const authRepo = new AuthRepository(db);
const authService = new AuthService(authRepo);

configurePassport(authService);

export const container = {
    db,
    logger,
    authService,
    passport
};
