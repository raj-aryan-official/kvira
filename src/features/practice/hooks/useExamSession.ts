import { useState, useEffect } from 'react';

const useExamSession = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    answers,
    timer,
    setAnswer: (questionId: string, answer: any) => setAnswers((prev) => ({ ...prev, [questionId]: answer })),
  };
};

export default useExamSession;
