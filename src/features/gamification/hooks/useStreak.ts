import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { incrementStreak, resetStreak, useStreakShield } from '../store/gamificationSlice';

export const useStreak = () => {
  const dispatch = useDispatch();
  const { streakLastActiveDate, streakShields } = useSelector((state: RootState) => state.gamification);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkStreak();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [streakLastActiveDate, streakShields]);

  const checkStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!streakLastActiveDate) {
      return;
    }

    const lastActive = new Date(streakLastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Actively played yesterday, do nothing until they play today (handled by practice completion)
    } else if (diffDays > 1) {
      // Missed at least a day
      if (streakShields > 0) {
        // Use shield to pretend they played yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        dispatch(useStreakShield(yesterday.toISOString()));
      } else {
        dispatch(resetStreak());
      }
    }
  };

  const registerPracticeToday = () => {
    const today = new Date().toISOString();
    dispatch(incrementStreak(today));
  };

  return { registerPracticeToday, checkStreak };
};
