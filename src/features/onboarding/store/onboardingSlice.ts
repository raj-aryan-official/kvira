import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BoardType = 'CBSE' | 'ICSE' | 'STATE' | null;
export type OnboardingState = {
  currentStep: number;
  board: BoardType;
  stateBoard: string | null;
  classNumber: number | null;
  schoolId: string | null;
  schoolName: string | null;
  displayName: string;
  profilePhoto: string | null;
  selectedSubjects: string[];
  isCompleted: boolean;
};

export const initialOnboardingState: OnboardingState = {
  currentStep: 1,
  board: null,
  stateBoard: null,
  classNumber: null,
  schoolId: null,
  schoolName: null,
  displayName: '',
  profilePhoto: null,
  selectedSubjects: [],
  isCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: initialOnboardingState,
  reducers: {
    hydrateOnboarding: (state, action: PayloadAction<OnboardingState>) => ({ ...action.payload }),
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setBoard: (state, action: PayloadAction<{ board: BoardType; stateBoard?: string | null }>) => {
      state.board = action.payload.board;
      state.stateBoard = action.payload.stateBoard ?? null;
    },
    setClassNumber: (state, action: PayloadAction<number | null>) => {
      state.classNumber = action.payload;
    },
    setSchool: (state, action: PayloadAction<{ schoolId: string; schoolName: string } | null>) => {
      state.schoolId = action.payload?.schoolId ?? null;
      state.schoolName = action.payload?.schoolName ?? null;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setProfilePhoto: (state, action: PayloadAction<string | null>) => {
      state.profilePhoto = action.payload;
    },
    toggleSubject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedSubjects.includes(id)) {
        state.selectedSubjects = state.selectedSubjects.filter((s) => s !== id);
      } else if (state.selectedSubjects.length < 4) {
        state.selectedSubjects.push(id);
      }
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      state.currentStep = 7;
    },
    resetOnboarding: () => initialOnboardingState,
  },
});

export const {
  hydrateOnboarding,
  setStep,
  setBoard,
  setClassNumber,
  setSchool,
  setDisplayName,
  setProfilePhoto,
  toggleSubject,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
