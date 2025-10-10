import config from "@syncellus/configs/limiter.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit(config);

export { limiter };
