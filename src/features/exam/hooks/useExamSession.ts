import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { submitAnswer, nextQuestion, finishExam, incrementTimer, quitExam, startExam, Question } from '../store/examSlice';
import { calculateXP } from '../../gamification/utils/xpCalculator';

export const useExamSession = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex, answers, timer, isFinished, mode, xpEarned } = useSelector((state: RootState) => state.exam);
  const { streakCurrent } = useSelector((state: RootState) => state.gamification);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!isFinished) {
      timerRef.current = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished, dispatch]);

  const initExam = (examQuestions: Question[], examMode: 'practice' | 'dailyChallenge' | 'battle' = 'practice') => {
    dispatch(startExam({ questions: examQuestions, mode: examMode }));
    questionStartTime.current = Date.now();
  };

  const handleAnswer = (selectedOptionId: string) => {
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOptionId === currentQ.correctOptionId;
    const timeTaken = Math.floor((Date.now() - questionStartTime.current) / 1000);

    dispatch(submitAnswer({
      questionId: currentQ.id,
      selectedOptionId,
      isCorrect,
      timeTakenSeconds: timeTaken,
    }));
  };

  const goNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      dispatch(nextQuestion());
      questionStartTime.current = Date.now();
    } else {
      endExam();
    }
  };

  const endExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const correctCount = answers.filter(a => a.isCorrect).length;
    
    // For this example, assuming false for isFirstTestOfDay
    const xpBreakdown = calculateXP(
      correctCount,
      questions.length,
      questions.length,
      streakCurrent,
      mode === 'dailyChallenge',
      false 
    );
    
    dispatch(finishExam({ finalXp: xpBreakdown.total }));
    return xpBreakdown;
  };

  const quit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    dispatch(quitExam());
  };

  return {
    initExam,
    handleAnswer,
    goNextQuestion,
    endExam,
    quit,
    currentQuestion: questions[currentIndex],
    isLastQuestion: currentIndex === questions.length - 1,
    answers,
    currentIndex,
    totalQuestions: questions.length,
    timer,
    xpEarned
  };
};
