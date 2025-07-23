import rateLimit from "express-rate-limit";
import config from "../configs/limiter.js";

const limiter = rateLimit(config);

export { limiter };
