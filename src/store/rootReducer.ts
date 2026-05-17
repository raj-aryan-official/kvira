import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from '../features/auth/store/authSlice';
import onboardingReducer from '../features/onboarding/store/onboardingSlice';
import homeReducer from '../features/home/store/homeSlice';
import practiceReducer from '../features/practice/store/practiceSlice';
import dailyChallengeReducer from '../features/dailyChallenge/store/dailyChallengeSlice';
import leaderboardReducer from '../features/leaderboard/store/leaderboardSlice';
import profileReducer from '../features/profile/store/profileSlice';
import analyticsReducer from '../features/analytics/store/analyticsSlice';
import gamificationReducer from '../features/gamification/store/gamificationSlice';
import battleReducer from '../features/battle/store/battleSlice';
import groupsReducer from '../features/groups/store/groupsSlice';
import shopReducer from '../features/shop/store/shopSlice';
import notificationsReducer from '../features/notifications/store/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  home: homeReducer,
  practice: practiceReducer,
  dailyChallenge: dailyChallengeReducer,
  leaderboard: leaderboardReducer,
  profile: profileReducer,
  analytics: analyticsReducer,
  gamification: gamificationReducer,
  battle: battleReducer,
  groups: groupsReducer,
  shop: shopReducer,
  notifications: notificationsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
