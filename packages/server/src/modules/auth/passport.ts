import { AppConfig } from "@syncellus/configs/config.js";
import { LoggerService } from "@syncellus/core/logger.js";
import type { AuthService } from "@syncellus/modules/auth/service.js";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

//TODO cleanup
const logger = LoggerService.getInstance();
const config = AppConfig.getInstance();

export const configurePassport = (authService: AuthService, passportInstance = passport) => {
    passportInstance.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (email, password, done) => {
                try {
                    const user = await authService.verifyUserCredentials({ email, password });
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
                secretOrKey: config.JWT_TOKEN_SECRET
            },
            async (jwtPayload, done) => {
                try {
                    const user = await authService.findUserByPublicID(jwtPayload.sub);
                    done(null, user);
                } catch (error) {
                    logger.error(error);
                    return done(error, false, { message: "Invalid token" });
                }
            }
        )
    );
};
