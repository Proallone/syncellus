import corsConfig from "@syncellus/configs/cors.js";
import { container } from "@syncellus/container.js";
import { limiter } from "@syncellus/core/limiter.js";
import { errorHandler } from "@syncellus/middlewares/error.middleware.js";
import accountsRoutes from "@syncellus/modules/accounts/routes.js";
import { configurePassport } from "@syncellus/modules/auth/passport.js";
import authRoutes from "@syncellus/modules/auth/routes.js";
import healthRoutes from "@syncellus/modules/health/routes.js";
import workspacesRoutes from "@syncellus/modules/workspaces/routes.js";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import passport from "passport";
import { pinoHttp } from "pino-http";

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

app.use("/api/v1", apiRouter);

app.use(errorHandler);

export default app;
