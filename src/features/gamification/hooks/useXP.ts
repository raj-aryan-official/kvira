import { useState } from 'react';

const useXP = () => {
  const [xp, setXp] = useState(0);
  return { xp, addXp: (amount: number) => setXp((prev) => prev + amount) };
};

export default useXP;
