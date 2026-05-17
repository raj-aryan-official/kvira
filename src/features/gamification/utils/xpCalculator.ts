export interface XPBreakdown {
  baseXP: number;
  completionBonus: number;
  accuracyBonus: number;
  streakMultiplier: number;
  dailyStarterBonus: number;
  total: number;
}

export const calculateXP = (
  correctAnswers: number,
  totalQuestions: number,
  testLength: number,
  streakDays: number,
  isDailyChallenge: boolean,
  isFirstTestOfDay: boolean
): XPBreakdown => {
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
  // Base XP: 10 per correct answer
  const baseXP = correctAnswers * 10;
  
  // Completion bonus depends on test length
  const completionBonus = testLength * 5; 
  
  // Accuracy bonus stacks
  let accuracyBonus = 0;
  if (accuracy > 50) accuracyBonus += 25;
  if (accuracy > 70) accuracyBonus += 50;
  if (accuracy > 90) accuracyBonus += 100;
  
  // Streak multiplier
  let streakMultiplier = 1.0;
  if (streakDays >= 30) streakMultiplier = 2.0;
  else if (streakDays >= 14) streakMultiplier = 1.5;
  else if (streakDays >= 7) streakMultiplier = 1.25;
  else if (streakDays >= 3) streakMultiplier = 1.1;

  // Daily Starter Bonus
  const dailyStarterBonus = isFirstTestOfDay ? 50 : 0;
  
  // Calculate total before daily challenge multiplier
  let total = (baseXP + completionBonus + accuracyBonus + dailyStarterBonus) * streakMultiplier;
  
  if (isDailyChallenge) {
    total *= 3; // Daily challenge 3x multiplier
  }
  
  return {
    baseXP,
    completionBonus,
    accuracyBonus,
    streakMultiplier,
    dailyStarterBonus,
    total: Math.round(total)
  };
};
