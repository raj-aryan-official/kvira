import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addXP, updateLevel } from '../store/gamificationSlice';

// XP thresholds for levels 1 to 50
export const LEVEL_THRESHOLDS = Array.from({ length: 50 }, (_, i) => Math.pow(i + 1, 1.5) * 100);

export const useXP = () => {
  const dispatch = useDispatch();
  const { xpTotal, level } = useSelector((state: RootState) => state.gamification);

  const awardXP = (amount: number) => {
    dispatch(addXP(amount));
    
    // Check level up
    const newTotal = xpTotal + amount;
    let newLevel = level;
    while (newLevel < LEVEL_THRESHOLDS.length && newTotal >= LEVEL_THRESHOLDS[newLevel]) {
      newLevel++;
    }

    if (newLevel > level) {
      // Trigger level up
      let newLevelName = 'Scholar';
      if (newLevel > 10) newLevelName = 'Master';
      if (newLevel > 20) newLevelName = 'Grandmaster';
      if (newLevel > 30) newLevelName = 'Legend';

      dispatch(updateLevel({ level: newLevel, levelName: newLevelName }));
      return { leveledUp: true, newLevel, newLevelName };
    }
    return { leveledUp: false, newLevel: level, newLevelName: '' };
  };

  return { awardXP };
};
