import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./modules/employee/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();
app.use(express.json());

app.use(morgan("common"));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
