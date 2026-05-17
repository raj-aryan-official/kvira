import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  options: { id: string; letter: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface Answer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeTakenSeconds: number;
}

interface ExamState {
  questions: Question[];
  currentIndex: number;
  answers: Answer[];
  timer: number;
  xpEarned: number;
  isFinished: boolean;
  mode: 'practice' | 'dailyChallenge' | 'battle';
}

const initialState: ExamState = {
  questions: [],
  currentIndex: 0,
  answers: [],
  timer: 0,
  xpEarned: 0,
  isFinished: false,
  mode: 'practice',
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    startExam: (state, action: PayloadAction<{ questions: Question[]; mode: 'practice' | 'dailyChallenge' | 'battle' }>) => {
      state.questions = action.payload.questions;
      state.mode = action.payload.mode;
      state.currentIndex = 0;
      state.answers = [];
      state.timer = 0;
      state.xpEarned = 0;
      state.isFinished = false;
    },
    submitAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
      if (action.payload.isCorrect) {
        state.xpEarned += 10; // Base XP for live counter
      }
    },
    nextQuestion: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },
    finishExam: (state, action: PayloadAction<{ finalXp: number }>) => {
      state.isFinished = true;
      state.xpEarned = action.payload.finalXp;
    },
    incrementTimer: (state) => {
      state.timer += 1;
    },
    quitExam: (state) => {
      state.isFinished = true;
    }
  },
});

export const { startExam, submitAnswer, nextQuestion, finishExam, incrementTimer, quitExam } = examSlice.actions;
export default examSlice.reducer;
