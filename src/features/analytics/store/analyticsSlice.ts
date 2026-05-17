import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricSummary {
  totalQuestions: number;
  averageAccuracy: number;
  testsCompleted: number;
  estimatedStudyTime: number; // in minutes
}

interface SubjectAnalytics {
  id: string;
  name: string;
  accuracy: number;
  questionCount: number;
  trend: 'up' | 'down' | 'flat';
  worstTopic: string;
}

interface AnalyticsState {
  period: 'Last 7 Days' | 'Last 30 Days' | 'All Time';
  metrics: MetricSummary;
  subjectBreakdown: SubjectAnalytics[];
  heatmapData: { date: string; count: number; accuracy: number }[];
  trendData: { date: string; accuracy: number }[];
  loading: boolean;
}

const initialState: AnalyticsState = {
  period: 'Last 7 Days',
  metrics: {
    totalQuestions: 150,
    averageAccuracy: 78,
    testsCompleted: 5,
    estimatedStudyTime: 120,
  },
  subjectBreakdown: [
    { id: 'math', name: 'Mathematics', accuracy: 85, questionCount: 60, trend: 'up', worstTopic: 'Geometry' },
    { id: 'sci', name: 'Science', accuracy: 72, questionCount: 50, trend: 'up', worstTopic: 'Physics' },
    { id: 'eng', name: 'English', accuracy: 90, questionCount: 40, trend: 'flat', worstTopic: 'Grammar' },
  ],
  heatmapData: [],
  trendData: [
    { date: 'Mon', accuracy: 65 },
    { date: 'Tue', accuracy: 70 },
    { date: 'Wed', accuracy: 68 },
    { date: 'Thu', accuracy: 75 },
    { date: 'Fri', accuracy: 80 },
    { date: 'Sat', accuracy: 85 },
    { date: 'Sun', accuracy: 78 },
  ],
  loading: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<AnalyticsState['period']>) => {
      state.period = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { setPeriod, setLoading } = analyticsSlice.actions;
export default analyticsSlice.reducer;
