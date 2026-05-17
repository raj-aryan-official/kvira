import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DailyChallengeStatus = 'active' | 'completed' | 'missed';

export type HomeState = {
  greetingName: string;
  unreadNotifications: number;
  streak: number;
  dailyChallenge: {
    status: DailyChallengeStatus;
    subjectName: string;
    questionCount: number;
    rewardXp: number;
    score?: number;
    endsAt: string;
  };
  level: number;
  xp: number;
  xpToNext: number;
  continueSubjects: Array<{
    id: string;
    name: string;
    icon: string;
    questionsThisWeek: number;
    progress: number;
  }>;
  weeklyActivity: number[];
  schoolTrending: Array<{ rank: number; name: string; xp: number; avatarInitials: string }>;
  myRank: { rank: number; xp: number } | null;
  schoolLinked: boolean;
  isLoading: boolean;
};

const initialState: HomeState = {
  greetingName: 'Student',
  unreadNotifications: 0,
  streak: 0,
  dailyChallenge: {
    status: 'active',
    subjectName: 'Mathematics',
    questionCount: 10,
    rewardXp: 50,
    endsAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
  },
  level: 1,
  xp: 120,
  xpToNext: 200,
  continueSubjects: [],
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  schoolTrending: [],
  myRank: null,
  schoolLinked: false,
  isLoading: true,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeData: (state, action: PayloadAction<Partial<HomeState>>) => ({
      ...state,
      ...action.payload,
      isLoading: false,
    }),
    setHomeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setHomeData, setHomeLoading } = homeSlice.actions;
export default homeSlice.reducer;
