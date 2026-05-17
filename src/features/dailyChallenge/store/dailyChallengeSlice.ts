import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChallengeLeader {
  id: string;
  name: string;
  avatar: string;
  score: number;
}

interface DailyChallengeState {
  subject: string;
  topic: string;
  questionCount: number;
  rewardXP: number;
  leaders: ChallengeLeader[];
  bestScore: number | null;
  hasCompletedToday: boolean;
  timeLeftSeconds: number;
}

const initialState: DailyChallengeState = {
  subject: 'Science',
  topic: 'Chemical Reactions',
  questionCount: 15,
  rewardXP: 500,
  leaders: [
    { id: '1', name: 'Aarav', avatar: 'https://i.pravatar.cc/150?img=12', score: 100 },
    { id: '2', name: 'Neha', avatar: 'https://i.pravatar.cc/150?img=13', score: 93 },
    { id: '3', name: 'Rohan', avatar: 'https://i.pravatar.cc/150?img=14', score: 86 },
  ],
  bestScore: 80,
  hasCompletedToday: false,
  timeLeftSeconds: 3600 * 5, // 5 hours
};

const dailyChallengeSlice = createSlice({
  name: 'dailyChallenge',
  initialState,
  reducers: {
    decrementTimeLeft: (state) => {
      if (state.timeLeftSeconds > 0) {
        state.timeLeftSeconds -= 1;
      }
    },
    completeChallenge: (state, action: PayloadAction<{ score: number }>) => {
      state.hasCompletedToday = true;
      if (state.bestScore === null || action.payload.score > state.bestScore) {
        state.bestScore = action.payload.score;
      }
    }
  },
});

export const { decrementTimeLeft, completeChallenge } = dailyChallengeSlice.actions;
export default dailyChallengeSlice.reducer;
