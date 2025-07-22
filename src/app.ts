import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import healthRoutes from "./modules/health/routes.js";
import userRoutes from "./modules/employee/routes.js";
import authRoutes from "./modules/auth/routes.js";
import timesheetsRoutes from "./modules/timesheets/routes.js";
import { logger } from "./utils/logger.js";
import { pinoHttp } from "pino-http";

const app = express();
app.use(express.json());

app.use(pinoHttp(logger));

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/employees", userRoutes);
app.use("/timesheets", timesheetsRoutes);

app.use(errorHandler);

export default app;
