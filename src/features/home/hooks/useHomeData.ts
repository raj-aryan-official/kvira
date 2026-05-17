import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setHomeData, setHomeLoading } from '../store/homeSlice';
import { fetchHomeData } from '../services/homeService';
import { selectOnboarding } from '../../onboarding/store/onboardingSelectors';

export const useHomeData = () => {
  const dispatch = useAppDispatch();
  const home = useAppSelector((s) => s.home);
  const onboarding = useAppSelector(selectOnboarding);

  const load = useCallback(async () => {
    dispatch(setHomeLoading(true));
    try {
      const data = await fetchHomeData();
      dispatch(
        setHomeData({
          ...data,
          greetingName: onboarding.displayName || data.greetingName,
          schoolLinked: Boolean(onboarding.schoolId),
        }),
      );
    } finally {
      dispatch(setHomeLoading(false));
    }
  }, [dispatch, onboarding.displayName, onboarding.schoolId]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...home, refresh: load };
};

export default useHomeData;
