export const calculateXp = (correctAnswers: number, totalQuestions: number) => {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export default calculateXp;
