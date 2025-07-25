import { describe, it, expect, vi } from 'vitest';
import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { getDatabaseVersionFromDb } from "../../src/modules/health/repository.js";
import { Database as DB } from '../../src/types/database.js';

vi.mock('../../../src/database/database', () => {
  const inMemoryDb = new Database(':memory:');
  return {
    db: new Kysely<DB>({
      dialect: new SqliteDialect({
        database: inMemoryDb,
      }),
    }),
  };
});

describe('Health Repository', () => {

  it('should return the SQLite database version', async () => {
    // Arrange

    // Act
    const result = await getDatabaseVersionFromDb();

    // Assert
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('sqlite_version');
    expect(typeof result.sqlite_version).toBe('string');
    expect(result.sqlite_version.length).toBeGreaterThan(0);
  });
});
