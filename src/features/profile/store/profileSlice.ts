import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag, Milestone } from '../../gamification/store/gamificationSlice';

export interface SubjectStats {
  id: string;
  name: string;
  accuracy: number;
  questionCount: number;
  trend: 'up' | 'down' | 'flat';
}

interface ProfileState {
  id: string;
  name: string;
  avatar: string;
  board: string;
  className: string;
  school: string;
  featuredTags: Tag[];
  stats: {
    totalQuestions: number;
  };
  subjectStats: SubjectStats[];
}

const initialState: ProfileState = {
  id: 'user_1',
  name: 'Rahul Kumar',
  avatar: 'https://i.pravatar.cc/150?img=11',
  board: 'CBSE',
  className: 'Class 10',
  school: 'Delhi Public School',
  featuredTags: [
    { id: 'first_perfect', name: 'First Perfect Score', description: '', icon: 'star', earnedAt: '2023-01-01' },
    { id: 'streak_7', name: 'Unstoppable', description: '', icon: 'flame', earnedAt: '2023-02-01' },
    { id: 'quiz_king', name: 'Quiz King', description: '', icon: 'crown', earnedAt: '2023-03-01' },
  ],
  stats: {
    totalQuestions: 1450,
  },
  subjectStats: [
    { id: 'math', name: 'Mathematics', accuracy: 85, questionCount: 600, trend: 'up' },
    { id: 'sci', name: 'Science', accuracy: 72, questionCount: 450, trend: 'up' },
    { id: 'eng', name: 'English', accuracy: 90, questionCount: 400, trend: 'flat' },
  ]
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    setFeaturedTags: (state, action: PayloadAction<Tag[]>) => {
      state.featuredTags = action.payload;
    }
  },
});

export const { updateProfile, setFeaturedTags } = profileSlice.actions;
export default profileSlice.reducer;
