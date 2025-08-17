import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { User } from "@syncellus/types/database.js";
import { LoggerService } from "@syncellus/core/logger.js";

export const configurePassport = (authService: AuthService) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (email, password, done) => {
                try {
                    const { user } = await authService.verifyUserCredentials({ email, password });
                    return done(null, user);
                } catch (error) {
                    //TODO cleanup
                    const logger = LoggerService.getInstance();
                    logger.error(error);
                    return done(null, false, { message: "Invalid credentials" });
                }
            }
        )
    );

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        done(null, { id });
    });
};
