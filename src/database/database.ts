import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

const init = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now')),
    modifiedAt TEXT DEFAULT (datetime('now'))
  ) STRICT;

  CREATE TRIGGER IF NOT EXISTS update_users_modifiedAt
  BEFORE UPDATE ON users
  FOR EACH ROW
  BEGIN
    UPDATE users
    SET modifiedAT = datetime('now')
    WHERE id = OLD.id;
  END;

  CREATE TRIGGER IF NOT EXISTS prevent_users_createdAt_modification
  BEFORE UPDATE ON users
  FOR EACH ROW
  WHEN NEW.createdAt != OLD.createdAt
  BEGIN
    SELECT RAISE(ABORT, 'createdAt connot be modified');
  END;
`;

db.exec(init);

export default db;
