import type { RootState } from '../../../store';

export const selectOnboarding = (state: RootState) => state.onboarding;
export const selectOnboardingComplete = (state: RootState) => state.onboarding.isCompleted;
export const selectOnboardingStep = (state: RootState) => state.onboarding.currentStep;
