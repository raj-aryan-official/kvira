import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectOnboarding } from '../../onboarding/store/onboardingSelectors';
import { fetchCurriculum } from '../services/questionService';
import { setCurriculum } from '../store/practiceSlice';

export const useCurriculum = () => {
  const dispatch = useAppDispatch();
  const curriculum = useAppSelector((s) => s.practice.curriculum);
  const onboarding = useAppSelector(selectOnboarding);

  useEffect(() => {
    if (curriculum) return;
    const load = async () => {
      const tree = await fetchCurriculum(onboarding.board ?? 'CBSE', onboarding.classNumber ?? 8);
      dispatch(setCurriculum(tree));
    };
    load();
  }, [curriculum, dispatch, onboarding.board, onboarding.classNumber]);

  return curriculum;
};

export default useCurriculum;
