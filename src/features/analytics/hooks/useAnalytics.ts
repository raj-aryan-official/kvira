import { useState, useEffect } from 'react';

const useAnalytics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData({});
  }, []);

  return data;
};

export default useAnalytics;
