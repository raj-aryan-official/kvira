import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { AUTH_KEYS } from '../../../shared/constants/config';
import { setSecureItem, deleteSecureItem } from '../../../services/storage/secureStorage';
import { setCredentials, setLoading, logout as logoutAction } from '../store/authSlice';
import * as authService from '../services/authService';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, password: string) => {
      dispatch(setLoading(true));
      setError(null);
      try {
        const data = await authService.login(email.trim(), password);
        await setSecureItem(AUTH_KEYS.accessToken, data.accessToken);
        await setSecureItem(AUTH_KEYS.refreshToken, data.refreshToken);
        await setSecureItem(AUTH_KEYS.user, JSON.stringify(data.user));
        dispatch(
          setCredentials({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Login failed. Please try again.');
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      /* offline logout */
    }
    await deleteSecureItem(AUTH_KEYS.accessToken);
    await deleteSecureItem(AUTH_KEYS.refreshToken);
    await deleteSecureItem(AUTH_KEYS.user);
    dispatch(logoutAction());
  }, [dispatch]);

  return { login, logout, error, setError };
};

export default useLogin;
