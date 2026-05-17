import { useState } from 'react';

const useOnboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Record<string, any>>({});

  return {
    step,
    nextStep: () => setStep((prev) => prev + 1),
    previousStep: () => setStep((prev) => Math.max(prev - 1, 1)),
    data,
    updateData: (partial: Record<string, any>) => setData((prev) => ({ ...prev, ...partial })),
  };
};

export default useOnboarding;
