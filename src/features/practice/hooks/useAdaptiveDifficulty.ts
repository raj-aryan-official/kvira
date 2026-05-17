import { useState } from 'react';

const useAdaptiveDifficulty = () => {
  const [difficulty, setDifficulty] = useState('medium');

  const adjust = (performance: number) => {
    setDifficulty(performance > 80 ? 'hard' : performance < 40 ? 'easy' : 'medium');
  };

  return { difficulty, adjust };
};

export default useAdaptiveDifficulty;
