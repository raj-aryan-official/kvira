import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BattleOpponent {
  id: string;
  name: string;
  avatar: string;
}

export interface ActiveBattle {
  id: string;
  opponent: BattleOpponent;
  subject: string;
  topic: string;
  questionCount: number;
  myScore: number;
  opponentScore: number;
  status: 'waiting' | 'active' | 'completed';
  timeRemaining?: number;
  powerUpsAvailable: string[];
}

export interface BattleHistoryItem {
  id: string;
  opponentName: string;
  subject: string;
  score: string;
  won: boolean;
  date: string;
  tagsEarned: string[];
}

interface BattleStats {
  wins: number;
  losses: number;
  winRate: number;
  currentBattleStreak: number;
}

interface PendingChallenge {
  id: string;
  challengerName: string;
  subject: string;
  topic: string;
  questionCount: number;
}

interface BattleState {
  activeBattle: ActiveBattle | null;
  battleHistory: BattleHistoryItem[];
  battleStats: BattleStats;
  pendingChallenges: PendingChallenge[];
}

const initialState: BattleState = {
  activeBattle: null,
  battleHistory: [
    { id: 'h1', opponentName: 'Neha', subject: 'Mathematics', score: '18 - 15', won: true, date: '2023-05-16', tagsEarned: ['Battle Champion'] },
    { id: 'h2', opponentName: 'Aarav', subject: 'Science', score: '12 - 14', won: false, date: '2023-05-15', tagsEarned: [] },
  ],
  battleStats: {
    wins: 15,
    losses: 5,
    winRate: 75,
    currentBattleStreak: 3,
  },
  pendingChallenges: [
    { id: 'c1', challengerName: 'Rohan', subject: 'English', topic: 'Grammar', questionCount: 10 },
  ],
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setActiveBattle: (state, action: PayloadAction<ActiveBattle | null>) => {
      state.activeBattle = action.payload;
    },
    updateScores: (state, action: PayloadAction<{ myScore: number; opponentScore: number }>) => {
      if (state.activeBattle) {
        state.activeBattle.myScore = action.payload.myScore;
        state.activeBattle.opponentScore = action.payload.opponentScore;
      }
    },
    usePowerUp: (state, action: PayloadAction<string>) => {
      if (state.activeBattle) {
        state.activeBattle.powerUpsAvailable = state.activeBattle.powerUpsAvailable.filter(p => p !== action.payload);
      }
    },
    removePendingChallenge: (state, action: PayloadAction<string>) => {
      state.pendingChallenges = state.pendingChallenges.filter(c => c.id !== action.payload);
    },
    finishBattle: (state, action: PayloadAction<BattleHistoryItem>) => {
      state.activeBattle = null;
      state.battleHistory.unshift(action.payload);
      if (action.payload.won) {
        state.battleStats.wins += 1;
        state.battleStats.currentBattleStreak += 1;
      } else {
        state.battleStats.losses += 1;
        state.battleStats.currentBattleStreak = 0;
      }
      state.battleStats.winRate = (state.battleStats.wins / (state.battleStats.wins + state.battleStats.losses)) * 100;
    }
  },
});

export const { setActiveBattle, updateScores, usePowerUp, removePendingChallenge, finishBattle } = battleSlice.actions;
export default battleSlice.reducer;
