import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationItem {
  id: string;
  type: 'achievement' | 'battle' | 'streak' | 'dailyChallenge' | 'leaderboard' | 'group' | 'friend';
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  actionId?: string; // id to navigate to (e.g. groupId, userId, battleId)
}

interface NotificationsState {
  notifications: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationsState = {
  notifications: [
    { id: 'n1', type: 'achievement', title: 'New Achievement Unlocked!', body: 'You earned the "Math Duel Master" tag.', timestamp: '10 mins ago', isRead: false },
    { id: 'n2', type: 'battle', title: 'Challenge Received', body: 'Rohan challenged you to a Science battle.', timestamp: '1 hour ago', isRead: false },
    { id: 'n3', type: 'group', title: 'New Group Message', body: 'CBSE Class 10 Math: Check the new notes.', timestamp: '2 hours ago', isRead: true },
  ],
  unreadCount: 2,
  isLoading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const n = state.notifications.find(n => n.id === action.payload);
      if (n && !n.isRead) {
        n.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.isRead = true);
      state.unreadCount = 0;
    }
  },
});

export const { setNotifications, markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
