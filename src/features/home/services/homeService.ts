import type { HomeState } from '../store/homeSlice';

const mockHomeData = (): Partial<HomeState> => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  return {
    greetingName: 'Riya',
    unreadNotifications: 3,
    streak: 12,
    dailyChallenge: {
      status: 'active',
      subjectName: 'Science',
      questionCount: 8,
      rewardXp: 75,
      endsAt: midnight.toISOString(),
    },
    level: 4,
    xp: 340,
    xpToNext: 500,
    continueSubjects: [
      { id: 'math', name: 'Math', icon: '📐', questionsThisWeek: 24, progress: 0.6 },
      { id: 'sci', name: 'Science', icon: '🔬', questionsThisWeek: 18, progress: 0.45 },
      { id: 'eng', name: 'English', icon: '📚', questionsThisWeek: 12, progress: 0.3 },
    ],
    weeklyActivity: [12, 8, 15, 0, 20, 10, 5],
    schoolTrending: [
      { rank: 1, name: 'Arjun K.', xp: 420, avatarInitials: 'AK' },
      { rank: 2, name: 'Sneha M.', xp: 390, avatarInitials: 'SM' },
      { rank: 3, name: 'Vikram P.', xp: 360, avatarInitials: 'VP' },
    ],
    myRank: { rank: 8, xp: 210 },
    schoolLinked: true,
  };
};

export const fetchHomeData = async (): Promise<Partial<HomeState>> => {
  await new Promise((r) => setTimeout(r, 400));
  return mockHomeData();
};

export default { fetchHomeData };
