import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import type { User } from "@syncellus/types/database.js";
import { LoggerService } from "@syncellus/core/logger.js";
import config from "@syncellus/configs/config.js";

//TODO cleanup
const logger = LoggerService.getInstance();

export const configurePassport = (authService: AuthService, passportInstance = passport) => {
    passportInstance.use(
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
                    logger.error(error);
                    return done(null, false, { message: "Invalid credentials" });
                }
            }
        )
    );

    passportInstance.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.jwt_secret
            },
            async (jwtPayload, done) => {
                try {
                    const { user } = await authService.findUserById(jwtPayload.id);
                    logger.info(user);
                    done(null, user);
                } catch (error) {
                    logger.error(error);
                    return done(error, false, { message: "Invalid token" });
                }
            }
        )
    );

    passportInstance.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passportInstance.deserializeUser(async (id: string, done) => {
        done(null, { id });
    });
};
