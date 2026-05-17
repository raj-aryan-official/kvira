export interface AnswerPayload {
  questionId: string;
  selectedOptionId: string;
  timeTakenSeconds: number;
}

export const analyzeFairPlay = (answers: AnswerPayload[], totalTimeSeconds: number, questionCount: number): boolean => {
  // Rule 1: Detect answers submitted in under 3 seconds (too fast to read)
  const tooFastAnswers = answers.filter(a => a.timeTakenSeconds < 3);
  if (tooFastAnswers.length > Math.max(3, questionCount * 0.2)) {
    console.warn('Anti-Cheat Flag: Too many answers under 3 seconds');
    return false;
  }

  // Rule 2: Student submitting all answers within 30 seconds of battle start for a 20 question set
  if (questionCount >= 20 && totalTimeSeconds < 30) {
    console.warn('Anti-Cheat Flag: Entire test completed impossibly fast');
    return false;
  }

  // Rule 3: Unusually high accuracy compared to practice history (this would require historical data)
  // Simulated here
  const accuracy = answers.filter(a => a.selectedOptionId /* == correct */).length / questionCount;
  // If historical accuracy is 30% and they score 100% in 40s -> flag
  // (Left out of basic check for this demo)

  return true; // Fair play validated
};
