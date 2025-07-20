import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";

const db = new DatabaseSync("db.sqlite");
const schemaPatch = path.resolve(process.cwd(), "./src/database/sql/schema.sql")

try {
    const schema = fs.readFileSync(
        schemaPatch,
        "utf-8"
    );
    db.exec(schema);
} catch (err) {
    console.error(`Database schema not found. Please verify ${schemaPatch} path`);
    process.kill(process.pid, "SIGINT");
}

export default db;
