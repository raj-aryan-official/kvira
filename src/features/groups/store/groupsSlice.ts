import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  unreadCount: number;
  lastActivity: string;
  icon: string;
  type: string;
  code?: string;
}

export interface GroupMessage {
  id: string;
  text: string;
  senderName: string;
  senderAvatar: string;
  senderLevel: number;
  timestamp: string;
  isAnnouncement: boolean;
}

interface GroupsState {
  myGroups: Group[];
  joinedGroups: Group[];
  activeGroup: Group | null;
  messages: GroupMessage[];
  loading: boolean;
}

const initialState: GroupsState = {
  myGroups: [
    { id: 'g1', name: 'CBSE Class 10 Math', description: 'Study group', memberCount: 156, unreadCount: 5, lastActivity: '2 mins ago', icon: 'calculator', type: 'Subject Group' },
    { id: 'g2', name: 'Delhi Public School', description: 'Official', memberCount: 1200, unreadCount: 0, lastActivity: '1 hour ago', icon: 'school', type: 'School Group' }
  ],
  joinedGroups: [],
  activeGroup: null,
  messages: [
    { id: 'm1', text: 'Math test tomorrow!', senderName: 'Admin', senderAvatar: 'https://i.pravatar.cc/150?img=1', senderLevel: 50, timestamp: '10:00 AM', isAnnouncement: true },
    { id: 'm2', text: 'Does anyone have notes for chapter 5?', senderName: 'Rohan', senderAvatar: 'https://i.pravatar.cc/150?img=2', senderLevel: 12, timestamp: '10:05 AM', isAnnouncement: false },
  ],
  loading: false,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setActiveGroup: (state, action: PayloadAction<Group | null>) => {
      state.activeGroup = action.payload;
    },
    addMessage: (state, action: PayloadAction<GroupMessage>) => {
      state.messages.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { setActiveGroup, addMessage, setLoading } = groupsSlice.actions;
export default groupsSlice.reducer;
