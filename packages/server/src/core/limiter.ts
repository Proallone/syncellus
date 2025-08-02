import rateLimit from "express-rate-limit";
import config from "@syncellus/configs/limiter.js";

const limiter = rateLimit(config);

export { limiter };
