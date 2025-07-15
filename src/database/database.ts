import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

const init = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  ) STRICT
`;

db.exec(init);

export default db;
