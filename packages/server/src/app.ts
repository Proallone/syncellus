import express, { Router } from "express";
import { errorHandler } from "@syncellus/middlewares/error.middleware.js";
import { pinoHttp } from "pino-http";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "@syncellus/configs/cors.js";
import { limiter } from "@syncellus/core/limiter.js";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import passport from "passport";
import { container } from "@syncellus/container.js";
import healthRoutes from "@syncellus/modules/health/routes.js";
import accountsRoutes from "@syncellus/modules/accounts/routes.js";
import authRoutes from "@syncellus/modules/auth/routes.js";
import workspacesRoutes from "@syncellus/modules/workspaces/routes.js";
import timesheetsRoutes from "@syncellus/modules/timesheets/routes.js";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "100kb", extended: true }));
app.use(passport.initialize());

configurePassport(container.authService);

app.use(limiter);
app.use(cors(corsConfig));
app.use(helmet());
app.use(pinoHttp(container.logger));

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/accounts", accountsRoutes);
apiRouter.use("/workspaces", workspacesRoutes);
apiRouter.use("/timesheets", timesheetsRoutes);

app.use("/api/v1", apiRouter);

app.use(errorHandler);

export default app;
