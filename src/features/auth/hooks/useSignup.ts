import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { AUTH_KEYS } from '../../../shared/constants/config';
import { setSecureItem } from '../../../services/storage/secureStorage';
import { setCredentials, setLoading } from '../store/authSlice';
import * as authService from '../services/authService';

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(
    async (email: string, fullName: string, password: string) => {
      dispatch(setLoading(true));
      setError(null);
      try {
        const data = await authService.signup(email.trim(), fullName.trim(), password);
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
        setError(e instanceof Error ? e.message : 'Signup failed. Please try again.');
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  return { signup, error, setError };
};

export default useSignup;
