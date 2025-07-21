import { sql } from "kysely";
import { db } from "../../database/database.js";

const getDatabaseHealthDb = async () => {
    const { rows: version } =
        await sql<string>`SELECT sqlite_version() as sqlite_version;`.execute(
            db
        );
    return version;
};

export { getDatabaseHealthDb };
