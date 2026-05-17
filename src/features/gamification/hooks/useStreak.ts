import { useState } from 'react';

const useStreak = () => {
  const [streak, setStreak] = useState(0);
  return { streak, increase: () => setStreak((prev) => prev + 1), reset: () => setStreak(0) };
};

export default useStreak;
