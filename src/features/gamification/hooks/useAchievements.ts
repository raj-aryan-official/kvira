import { useState } from 'react';

const useAchievements = () => {
  const [achievements, setAchievements] = useState<string[]>([]);
  return { achievements, unlock: (achievement: string) => setAchievements((prev) => [...prev, achievement]) };
};

export default useAchievements;
