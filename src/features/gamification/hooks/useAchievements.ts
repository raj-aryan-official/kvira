import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { queueAchievement, addEarnedTag, Tag } from '../store/gamificationSlice';

// A mock catalog of tags
export const TAG_CATALOG: Tag[] = [
  { id: 'first_perfect', name: 'First Perfect Score', description: 'Score 100% on any practice test', icon: 'star', xpReward: 100 },
  { id: 'streak_3', name: 'On Fire', description: 'Reach a 3-day streak', icon: 'flame', xpReward: 50 },
  { id: 'streak_7', name: 'Unstoppable', description: 'Reach a 7-day streak', icon: 'flame', xpReward: 150 },
  { id: 'battle_champion', name: 'Battle Champion', description: 'Win 10 battles', icon: 'trophy', xpReward: 200 },
  { id: 'quiz_king', name: 'Quiz King', description: 'Win 50 battles', icon: 'crown', xpReward: 500 },
];

export const useAchievements = () => {
  const dispatch = useDispatch();
  const { streakCurrent, earnedTags } = useSelector((state: RootState) => state.gamification);

  const evaluatePostTestAchievements = (accuracy: number) => {
    if (accuracy === 100 && !earnedTags.some(t => t.id === 'first_perfect')) {
      const tag = TAG_CATALOG.find(t => t.id === 'first_perfect');
      if (tag) {
        dispatch(queueAchievement(tag));
        dispatch(addEarnedTag({ ...tag, earnedAt: new Date().toISOString() }));
      }
    }

    if (streakCurrent >= 3 && !earnedTags.some(t => t.id === 'streak_3')) {
      const tag = TAG_CATALOG.find(t => t.id === 'streak_3');
      if (tag) {
        dispatch(queueAchievement(tag));
        dispatch(addEarnedTag({ ...tag, earnedAt: new Date().toISOString() }));
      }
    }
  };

  return { evaluatePostTestAchievements };
};
