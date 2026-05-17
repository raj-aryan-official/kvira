import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CurriculumTree, Subject } from '../types/curriculum.types';

export type PracticeState = {
  curriculum: CurriculumTree | null;
  favourites: string[];
  selectedSubjectId: string | null;
  selectedChapterId: string | null;
  searchQuery: string;
};

const initialState: PracticeState = {
  curriculum: null,
  favourites: [],
  selectedSubjectId: null,
  selectedChapterId: null,
  searchQuery: '',
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setCurriculum: (state, action: PayloadAction<CurriculumTree>) => {
      state.curriculum = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favourites.includes(id)) {
        state.favourites = state.favourites.filter((f) => f !== id);
      } else {
        state.favourites = [...state.favourites, id];
      }
    },
    setSelectedSubject: (state, action: PayloadAction<string | null>) => {
      state.selectedSubjectId = action.payload;
    },
    setSelectedChapter: (state, action: PayloadAction<string | null>) => {
      state.selectedChapterId = action.payload;
    },
  },
});

export const {
  setCurriculum,
  setSearchQuery,
  toggleFavourite,
  setSelectedSubject,
  setSelectedChapter,
} = practiceSlice.actions;

export const selectSubjectById = (subjects: Subject[], id: string) =>
  subjects.find((s) => s.id === id);

export default practiceSlice.reducer;
