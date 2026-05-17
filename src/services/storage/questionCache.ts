import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

const getDb = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('kvira_questions.db');
  }
  return db;
};

export const initQuestionCache = async (): Promise<void> => {
  const database = await getDb();
  await database.execAsync(
    'CREATE TABLE IF NOT EXISTS questions (id TEXT PRIMARY KEY, payload TEXT NOT NULL);',
  );
};

export const cacheQuestion = async (id: string, payload: unknown): Promise<void> => {
  const database = await getDb();
  await database.runAsync('INSERT OR REPLACE INTO questions (id, payload) VALUES (?, ?);', [
    id,
    JSON.stringify(payload),
  ]);
};

export const getCachedQuestion = async (id: string): Promise<unknown | null> => {
  const database = await getDb();
  const row = await database.getFirstAsync<{ payload: string }>(
    'SELECT payload FROM questions WHERE id = ?;',
    [id],
  );
  return row ? JSON.parse(row.payload) : null;
};

export default { initQuestionCache, cacheQuestion, getCachedQuestion };
