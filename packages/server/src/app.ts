import express, { Router } from "express";
import { errorHandler } from "@syncellus/middlewares/error.middleware.js";
import healthRoutes from "@syncellus/modules/health/routes.js";
import userRoutes from "@syncellus/modules/employees/routes.js";
import authRoutes from "@syncellus/modules/auth/routes.js";
import timesheetsRoutes from "@syncellus/modules/timesheets/routes.js";
import { logger } from "@syncellus/core/logger.js";
import { pinoHttp } from "pino-http";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "@syncellus/configs/cors.js";
import { limiter } from "@syncellus/core/limiter.js";

import "./modules/employees/events.js";

const app = express();

app.use(limiter);
app.use(cors(corsConfig));
app.use(helmet());
app.use(pinoHttp(logger));
app.use(express.json());

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/employees", userRoutes);
apiRouter.use("/timesheets", timesheetsRoutes);

app.use("/api/v1", apiRouter);

app.use(errorHandler);

export default app;
