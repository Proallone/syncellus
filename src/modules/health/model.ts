import db from "../../database/database.js";

const getDatabaseHealthDb = async () => {
    const query = db.prepare("select sqlite_version();");
    return query.get();
};

export { getDatabaseHealthDb };
