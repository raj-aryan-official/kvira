import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileState = {
  /** 0 = Nursery, 1–10 = class number */
  classLevel: number | null;
};

const initialState: ProfileState = {
  classLevel: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setClassLevel: (state, action: PayloadAction<number | null>) => {
      state.classLevel = action.payload;
    },
  },
});

export const { setClassLevel } = profileSlice.actions;
export default profileSlice.reducer;
