import app from "@syncellus/app.js";
import config from "@syncellus/configs/config.js";
import { db } from "@syncellus/database/database.js";
import { logger } from "@syncellus/core/logger.js";

const server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.nodeEnv} environment`);
});

const shutdown = () => {
    logger.info("\nShutting down...");
    server.close(() => {
        db.destroy();
        logger.info("Server closed. Database closed. Cleanup complete.");
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
