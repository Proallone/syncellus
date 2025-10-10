import app from "@syncellus/app.js";
import { AppConfig } from "@syncellus/configs/config.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { DatabaseService } from "@syncellus/database/database.js";

const config = AppConfig.getInstance();

const logger = LoggerService.getInstance();

const server = app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT} in ${config.NODE_ENV} environment`);
});

const shutdown = () => {
    logger.info("\nShutting down...");
    server.close(() => {
        const db = DatabaseService.getInstance();
        db.destroy();
        logger.info("Server closed. Database closed. Cleanup complete.");
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
