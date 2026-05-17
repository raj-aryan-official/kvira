export const adaptDifficulty = (level: string) => {
  if (level === 'easy') return 1;
  if (level === 'medium') return 2;
  if (level === 'hard') return 3;
  return 2;
};

export default adaptDifficulty;
