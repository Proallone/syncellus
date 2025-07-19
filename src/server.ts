import app from "./app.js";
import config from "./config/config.js";
import db from "./database/database.js";

const server = app.listen(config.port, () => {
    console.log(
        `Server running on port ${config.port} in ${config.nodeEnv} environment`
    );
});

const shutdown = () => {
  console.log("\nShutting down...");
  server.close(() => {
    db.close();
    console.log("Server closed. Database closed. Cleanup complete.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);