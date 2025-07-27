import type { CorsOptions } from "cors";

//todo this is a placeholder for development
const corsConfig: CorsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};

export default corsConfig;
