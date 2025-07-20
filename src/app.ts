import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./modules/employee/routes.js";
import authRoutes from "./modules/auth/routes.js";
import timesheetsRoutes from "./modules/timesheets/routes.js";

const app = express();
app.use(express.json());

app.use(morgan("common"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/timesheets", timesheetsRoutes);

app.use(errorHandler);

export default app;
