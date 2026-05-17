import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useProfile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const gamification = useSelector((state: RootState) => state.gamification);

  return {
    ...profile,
    gamification,
  };
};
