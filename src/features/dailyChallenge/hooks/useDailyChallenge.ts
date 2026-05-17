import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { decrementTimeLeft, completeChallenge } from '../store/dailyChallengeSlice';

export const useDailyChallenge = () => {
  const dispatch = useDispatch();
  const challengeState = useSelector((state: RootState) => state.dailyChallenge);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch(decrementTimeLeft());
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dispatch]);

  const finishChallenge = (score: number) => {
    dispatch(completeChallenge({ score }));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    ...challengeState,
    finishChallenge,
    formattedTimeLeft: formatTime(challengeState.timeLeftSeconds),
    isUrgent: challengeState.timeLeftSeconds < 3600, // Less than 1 hour
  };
};
