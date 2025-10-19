import corsConfig from "@syncellus/configs/cors.ts";
import { container } from "@syncellus/container.ts";
import { limiter } from "@syncellus/core/limiter.ts";
import { errorHandler } from "@syncellus/middlewares/error.middleware.ts";
import accountsRoutes from "@syncellus/modules/accounts/routes.ts";
import { configurePassport } from "@syncellus/modules/auth/passport.ts";
import authRoutes from "@syncellus/modules/auth/routes.ts";
import healthRoutes from "@syncellus/modules/health/routes.ts";
import workspacesRoutes from "@syncellus/modules/workspaces/routes.ts";
import cors from "cors";
import express, { Router, type Express } from "express";
import helmet from "helmet";
import passport from "passport";
import { pinoHttp } from "pino-http";

const app: Express = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "100kb", extended: true }));
app.use(passport.initialize());

configurePassport(container.authService);

app.use(limiter);
app.use(cors(corsConfig));
app.use(helmet());
app.use(pinoHttp(container.logger));

const apiRouter: Router = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/accounts", accountsRoutes);
apiRouter.use("/workspaces", workspacesRoutes);

app.use("/api/v1", apiRouter);

app.use(errorHandler);

export default app;
