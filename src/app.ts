import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use(morgan("common"));

app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
