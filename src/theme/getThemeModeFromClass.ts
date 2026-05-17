import type { ThemeMode } from './types';

/** Maps Indian school class (0 = Nursery) to theme mode. */
export const getThemeModeFromClass = (classLevel: number | null | undefined): ThemeMode => {
  if (classLevel === null || classLevel === undefined) {
    return 'junior';
  }
  if (classLevel <= 5) {
    return 'kids';
  }
  if (classLevel <= 7) {
    return 'junior';
  }
  return 'senior';
};

export default getThemeModeFromClass;
