PRAGMA foreign_keys = ON;

CREATE TABLE
  IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime ('now')),
    modifiedAt TEXT DEFAULT (datetime ('now'))
  ) STRICT;

CREATE INDEX IF NOT EXISTS users_id ON users (id);
CREATE INDEX IF NOT EXISTS users_email on users (email);

CREATE TRIGGER IF NOT EXISTS update_users_modifiedAt BEFORE
UPDATE ON users FOR EACH ROW BEGIN
UPDATE users
SET
  modifiedAT = datetime ('now')
WHERE
  id = OLD.id;

END;

CREATE TRIGGER IF NOT EXISTS prevent_users_createdAt_modification BEFORE
UPDATE ON users FOR EACH ROW WHEN NEW.createdAt != OLD.createdAt BEGIN
SELECT
  RAISE (ABORT, 'createdAt connot be modified');

END;

CREATE TABLE
  IF NOT EXISTS timesheets (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER REFERENCES users (id),
    date TEXT NOT NULL,
    start_hour TEXT NOT NULL,
    end_hour TEXT NOT NULL CHECK ( end_hour > start_hour),
    hours_worked TEXT AS (timediff(time(end_hour), time(start_hour))),
    approved INTEGER DEFAULT FALSE
  ) STRICT;

CREATE INDEX IF NOT EXISTS timesheets_id ON timesheets (id);