import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_KEYS, config } from '../../shared/constants/config';
import { getSecureItem } from '../../services/storage/secureStorage';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: async (headers) => {
      const token = await getSecureItem(AUTH_KEYS.accessToken);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Auth',
    'User',
    'Home',
    'Practice',
    'DailyChallenge',
    'Leaderboard',
    'Profile',
    'Analytics',
    'Gamification',
    'Battle',
    'Groups',
    'Shop',
    'Notifications',
  ],
  endpoints: () => ({}),
});

export default baseApi;
