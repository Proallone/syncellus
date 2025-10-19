import type { Options } from "express-rate-limit";

const config: Partial<Options> = {
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 1 minute).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc.
};

export default config;
