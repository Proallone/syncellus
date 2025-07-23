import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import healthRoutes from "./modules/health/routes.js";
import userRoutes from "./modules/employees/routes.js";
import authRoutes from "./modules/auth/routes.js";
import timesheetsRoutes from "./modules/timesheets/routes.js";
import { logger } from "./core/logger.js";
import { pinoHttp } from "pino-http";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "./configs/cors.js";
import { limiter } from "./core/limiter.js";

const app = express();

app.use(limiter);
app.use(cors(corsConfig));
app.use(helmet());
app.use(pinoHttp(logger));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/employees", userRoutes);
app.use("/timesheets", timesheetsRoutes);

app.use(errorHandler);

export default app;
