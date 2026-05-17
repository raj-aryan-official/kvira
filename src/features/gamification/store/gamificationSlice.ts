import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tag {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  xpReward?: number;
}

export interface Milestone {
  id: string;
  name: string;
  reward: number;
  completedAt: string;
}

interface GamificationState {
  xpTotal: number;
  xpThisWeek: number;
  level: number;
  levelName: string;
  streakCurrent: number;
  streakLongest: number;
  streakLastActiveDate: string | null;
  streakShields: number;
  coinsBalance: number;
  earnedTags: Tag[];
  completedMilestones: Milestone[];
  pendingAchievementQueue: Tag[];
}

const initialState: GamificationState = {
  xpTotal: 0,
  xpThisWeek: 0,
  level: 1,
  levelName: 'Beginner',
  streakCurrent: 0,
  streakLongest: 0,
  streakLastActiveDate: null,
  streakShields: 0,
  coinsBalance: 0,
  earnedTags: [],
  completedMilestones: [],
  pendingAchievementQueue: [],
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    addXP: (state, action: PayloadAction<number>) => {
      state.xpTotal += action.payload;
      state.xpThisWeek += action.payload;
      // Note: Level calculation logic should ideally be here or handled in an epic/thunk
    },
    updateLevel: (state, action: PayloadAction<{ level: number; levelName: string }>) => {
      state.level = action.payload.level;
      state.levelName = action.payload.levelName;
    },
    incrementStreak: (state, action: PayloadAction<string>) => {
      state.streakCurrent += 1;
      if (state.streakCurrent > state.streakLongest) {
        state.streakLongest = state.streakCurrent;
      }
      state.streakLastActiveDate = action.payload;
    },
    resetStreak: (state) => {
      state.streakCurrent = 0;
    },
    useStreakShield: (state, action: PayloadAction<string>) => {
      if (state.streakShields > 0) {
        state.streakShields -= 1;
        state.streakLastActiveDate = action.payload;
      }
    },
    addCoins: (state, action: PayloadAction<number>) => {
      state.coinsBalance += action.payload;
    },
    spendCoins: (state, action: PayloadAction<number>) => {
      state.coinsBalance = Math.max(0, state.coinsBalance - action.payload);
    },
    addEarnedTag: (state, action: PayloadAction<Tag>) => {
      state.earnedTags.push(action.payload);
    },
    queueAchievement: (state, action: PayloadAction<Tag>) => {
      state.pendingAchievementQueue.push(action.payload);
    },
    popAchievementQueue: (state) => {
      state.pendingAchievementQueue.shift();
    },
  },
});

export const {
  addXP,
  updateLevel,
  incrementStreak,
  resetStreak,
  useStreakShield,
  addCoins,
  spendCoins,
  addEarnedTag,
  queueAchievement,
  popAchievementQueue,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
