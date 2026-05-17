import { useState, useEffect } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile({ name: 'Student' });
  }, []);

  return { profile };
};

export default useProfile;
