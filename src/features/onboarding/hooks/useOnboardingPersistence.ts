import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getItem, setItem } from '../../../services/storage/asyncStorage';
import { STORAGE_KEYS } from '../../../shared/constants/storageKeys';
import {
  hydrateOnboarding,
  initialOnboardingState,
  type OnboardingState,
} from '../store/onboardingSlice';
import { selectOnboarding } from '../store/onboardingSelectors';

export const useOnboardingPersistence = (): void => {
  const dispatch = useAppDispatch();
  const onboarding = useAppSelector(selectOnboarding);

  useEffect(() => {
    const load = async () => {
      const raw = await getItem(STORAGE_KEYS.onboarding);
      if (raw) {
        try {
          dispatch(hydrateOnboarding(JSON.parse(raw) as OnboardingState));
        } catch {
          dispatch(hydrateOnboarding(initialOnboardingState));
        }
      }
    };
    load();
  }, [dispatch]);

  useEffect(() => {
    setItem(STORAGE_KEYS.onboarding, JSON.stringify(onboarding));
  }, [onboarding]);
};

export default useOnboardingPersistence;
