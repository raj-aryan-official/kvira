import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { markAsRead, markAllAsRead, setNotifications } from '../store/notificationsSlice';
import { useEffect } from 'react';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    // Fetch notifications initially
    // Real-time subscription logic would go here
  }, []);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return {
    ...state,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
  };
};
