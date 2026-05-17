import { useState, useEffect } from 'react';

const useLeaderboard = () => {
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    setBoard([]);
  }, []);

  return { board };
};

export default useLeaderboard;
