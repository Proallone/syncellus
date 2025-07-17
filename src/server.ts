import app from "./app.js";
import config from "./config/config.js";
import db from "./database/database.js";

console.log(db);

app.listen(config.port, () => {
    console.log(
        `Server running on port ${config.port} in ${config.nodeEnv} environment`
    );
});
