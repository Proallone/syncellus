import app from "@syncellus/app.ts";
import { AppConfig } from "@syncellus/configs/config.ts";
import { LoggerService } from "@syncellus/core/logger.ts";
import { DatabaseService } from "@syncellus/database/database.ts";

const config = AppConfig.getInstance();

const logger = LoggerService.getInstance();

const server = app.listen(config.PORT, () => {
  logger.info(
    `Server running on port ${config.PORT} in ${config.NODE_ENV} environment`,
  );
});

const shutdown = () => {
  logger.info("\nShutting down...");
  server.close(() => {
    const db = DatabaseService.getInstance();
    db.destroy();
    logger.info("Server closed. Database closed. Cleanup complete.");
    Deno.exit(0);
  });
};

Deno.addSignalListener("SIGINT", shutdown);
Deno.addSignalListener("SIGTERM", shutdown);
