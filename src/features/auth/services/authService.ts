import apiClient from '../../../services/api/apiClient';
import type { AuthUser } from '../store/authSlice';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = AuthTokens & {
  user: AuthUser;
};

const devMockAuth = (email: string, fullName?: string): AuthResponse => ({
  accessToken: 'dev-access-token',
  refreshToken: 'dev-refresh-token',
  user: { id: 'dev-1', email, fullName: fullName ?? 'Kvira Student' },
});

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return data;
  } catch {
    if (__DEV__) return devMockAuth(email);
    throw new Error('Login failed');
  }
};

export const signup = async (
  email: string,
  fullName: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await apiClient.post<AuthResponse>('/auth/signup', {
      email,
      fullName,
      password,
    });
    return data;
  } catch {
    if (__DEV__) return devMockAuth(email, fullName);
    throw new Error('Signup failed');
  }
};

export const refreshToken = async (token: string): Promise<AuthTokens> => {
  const { data } = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken: token });
  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export default { login, signup, refreshToken, logout };
