import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  class: string;
  hasActiveStreak: boolean;
  isSelf?: boolean;
}

interface LeaderboardState {
  period: 'This Week' | 'This Month';
  schoolList: LeaderboardUser[];
  stateList: LeaderboardUser[];
  nationalList: LeaderboardUser[];
  friendsList: LeaderboardUser[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  period: 'This Week',
  schoolList: [],
  stateList: [],
  nationalList: [],
  friendsList: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<'This Week' | 'This Month'>) => {
      state.period = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSchoolList: (state, action: PayloadAction<LeaderboardUser[]>) => {
      state.schoolList = action.payload;
    },
    setStateList: (state, action: PayloadAction<LeaderboardUser[]>) => {
      state.stateList = action.payload;
    },
    setNationalList: (state, action: PayloadAction<LeaderboardUser[]>) => {
      state.nationalList = action.payload;
    },
    setFriendsList: (state, action: PayloadAction<LeaderboardUser[]>) => {
      state.friendsList = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
});

export const {
  setPeriod,
  setLoading,
  setSchoolList,
  setStateList,
  setNationalList,
  setFriendsList,
  setError
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
