import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setPeriod, setLoading } from '../store/analyticsSlice';

export const useAnalytics = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state: RootState) => state.analytics);

  const changePeriod = (period: 'Last 7 Days' | 'Last 30 Days' | 'All Time') => {
    dispatch(setLoading(true));
    dispatch(setPeriod(period));
    // Fetch new data based on period
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  return {
    ...analytics,
    changePeriod,
  };
};
