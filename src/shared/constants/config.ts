export const config = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.kvira.app',
  environment: process.env.NODE_ENV ?? 'development',
} as const;

export const AUTH_KEYS = {
  accessToken: 'kvira_access_token',
  refreshToken: 'kvira_refresh_token',
  user: 'kvira_user',
} as const;

export default config;
