import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Hello World, it's Sunday!`);
});

app.use(errorHandler);

export default app;
