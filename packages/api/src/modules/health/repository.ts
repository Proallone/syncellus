import { sql } from "kysely";
import { db } from "../../database/database.js";
import { DbHealthResponse } from "../../types/index.js";

const getDatabaseVersionFromDb = async (): Promise<DbHealthResponse> => {
    const { rows: version } = await sql<DbHealthResponse>`SELECT sqlite_version() as sqlite_version;`.execute(db);
    return version[0];
};

export { getDatabaseVersionFromDb };
