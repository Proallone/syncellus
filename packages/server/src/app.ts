import express, { Router } from "express";
import { errorHandler } from "@syncellus/middlewares/error.middleware.js";
import healthRoutes from "@syncellus/modules/health/routes.js";
import userRoutes from "@syncellus/modules/employees/routes.js";
import authRoutes from "@syncellus/modules/auth/routes.js";
import timesheetsRoutes from "@syncellus/modules/timesheets/routes.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { pinoHttp } from "pino-http";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "@syncellus/configs/cors.js";
import { limiter } from "@syncellus/core/limiter.js";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import passport from "passport";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { AuthService } from "@syncellus/modules/auth/service.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());

//TODO refactor
const db = DatabaseService.getInstance();
const authRepo = new AuthRepository(db);

const authService = new AuthService(authRepo);
configurePassport(authService);

app.use(limiter);
app.use(cors(corsConfig));
app.use(helmet());
const logger = LoggerService.getInstance();
app.use(pinoHttp(logger));

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/employees", userRoutes);
apiRouter.use("/timesheets", timesheetsRoutes);

app.use("/api/v1", apiRouter);

app.use(errorHandler);

export default app;
