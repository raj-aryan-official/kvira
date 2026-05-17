import { createSelector } from '@reduxjs/toolkit';
import { getThemeModeFromClass } from '../../../theme/getThemeModeFromClass';
import type { RootState } from '../../../store';
import type { ThemeMode } from '../../../theme/types';

export const selectClassLevel = (state: RootState): number | null => state.profile.classLevel;

export const selectThemeMode = createSelector(
  [selectClassLevel],
  (classLevel): ThemeMode => getThemeModeFromClass(classLevel),
);

export default { selectClassLevel, selectThemeMode };
