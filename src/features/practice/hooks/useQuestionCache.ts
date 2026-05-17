import { useState } from 'react';

const useQuestionCache = () => {
  const [cache, setCache] = useState<Record<string, any>>({});

  const storeQuestion = (id: string, question: any) => {
    setCache((prev) => ({ ...prev, [id]: question }));
  };

  return { cache, storeQuestion };
};

export default useQuestionCache;
