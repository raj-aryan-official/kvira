// Mocking expo-sqlite for caching questions locally
export const questionCache = {
  initDB: async () => {
    // const db = await SQLite.openDatabaseAsync('eduquest.db');
    // await db.execAsync(`
    //   CREATE TABLE IF NOT EXISTS questions (
    //     id TEXT PRIMARY KEY,
    //     topicId TEXT,
    //     text TEXT,
    //     options TEXT,
    //     correctOptionId TEXT,
    //     explanation TEXT
    //   );
    // `);
    console.log("DB initialized");
  },

  cacheQuestions: async (questions: any[]) => {
    // Insert questions into SQLite
    console.log(`Cached ${questions.length} questions offline`);
  },

  getQuestionsByTopic: async (topicId: string) => {
    // Fetch from SQLite
    return [];
  },

  storePendingResult: async (result: any) => {
    // AsyncStorage.setItem('pending_results', JSON.stringify(results))
    console.log("Stored pending result for sync later");
  },

  syncPendingResults: async () => {
    // Fetch pending results from AsyncStorage, push to API, mark as synced
    console.log("Synced pending results");
  }
};
