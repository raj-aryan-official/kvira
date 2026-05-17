export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  BoardSelection: undefined;
  ClassSelection: undefined;
  SchoolLink: undefined;
  ProfileCreation: undefined;
  SubjectInterests: undefined;
  StarterTestIntro: undefined;
  OnboardingComplete: undefined;
};

export type PracticeStackParamList = {
  SubjectSelection: undefined;
  ChapterSelection: { subjectId: string; subjectName: string };
  TopicSelection: { subjectId: string; chapterId: string; chapterName: string };
};

export type MainTabParamList = {
  Home: undefined;
  Practice: undefined;
  Leaderboard: undefined;
  Profile: undefined;
  Analytics: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
};
