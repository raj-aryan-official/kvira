import type { RootState } from '../../../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuthHydrated = (state: RootState) => state.auth.isHydrated;
export const selectAuthUser = (state: RootState) => state.auth.user;
