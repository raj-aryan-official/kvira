import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { AUTH_KEYS } from '../../../shared/constants/config';
import { getSecureItem } from '../../../services/storage/secureStorage';
import { setCredentials, setHydrated, logout } from '../store/authSlice';

/** Restores session from Secure Store on app launch. */
export const useAuthHydration = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = async () => {
      try {
        const accessToken = await getSecureItem(AUTH_KEYS.accessToken);
        const refreshToken = await getSecureItem(AUTH_KEYS.refreshToken);
        const userJson = await getSecureItem(AUTH_KEYS.user);

        if (accessToken && refreshToken && userJson) {
          dispatch(
            setCredentials({
              accessToken,
              refreshToken,
              user: JSON.parse(userJson),
            }),
          );
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setHydrated(true));
      }
    };
    hydrate();
  }, [dispatch]);
};

export default useAuthHydration;
