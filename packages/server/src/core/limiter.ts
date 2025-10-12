import config from "@syncellus/configs/limiter.ts";
import rateLimit from "express-rate-limit";

const limiter = rateLimit(config);

export { limiter };
