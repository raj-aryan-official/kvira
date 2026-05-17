import { useState, useEffect } from 'react';

const useDailyChallenge = () => {
  const [challenge, setChallenge] = useState<any>(null);

  useEffect(() => {
    setChallenge({ title: 'Daily Challenge' });
  }, []);

  return challenge;
};

export default useDailyChallenge;
