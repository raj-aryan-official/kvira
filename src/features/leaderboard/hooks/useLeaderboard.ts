import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setPeriod, setLoading, setSchoolList, setStateList, setNationalList, setFriendsList, LeaderboardUser } from '../store/leaderboardSlice';

// Mock data generator
const generateMockList = (count: number): LeaderboardUser[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `user_${i}`,
    name: i === 5 ? 'You' : `Student ${i + 1}`,
    avatar: 'https://i.pravatar.cc/150?img=' + (i + 1),
    xp: 5000 - (i * 100),
    rank: i + 1,
    class: 'Class 10',
    hasActiveStreak: Math.random() > 0.5,
    isSelf: i === 5,
  }));
};

export const useLeaderboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.leaderboard);

  const fetchTab = async (tab: 'School' | 'State' | 'National' | 'Friends') => {
    dispatch(setLoading(true));
    // Simulate network
    await new Promise(res => setTimeout(res, 800));

    switch (tab) {
      case 'School':
        dispatch(setSchoolList(generateMockList(50)));
        break;
      case 'State':
        dispatch(setStateList(generateMockList(50)));
        break;
      case 'National':
        dispatch(setNationalList(generateMockList(50)));
        break;
      case 'Friends':
        dispatch(setFriendsList([])); // Simulate no friends
        break;
    }
    dispatch(setLoading(false));
  };

  const changePeriod = (period: 'This Week' | 'This Month') => {
    dispatch(setPeriod(period));
    // Re-fetch active tab if necessary
  };

  return {
    ...state,
    fetchTab,
    changePeriod
  };
};
