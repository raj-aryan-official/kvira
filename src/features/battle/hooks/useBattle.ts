import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setActiveBattle, updateScores, usePowerUp, removePendingChallenge, finishBattle } from '../store/battleSlice';
import { spendCoins } from '../../gamification/store/gamificationSlice';

export const useBattle = () => {
  const dispatch = useDispatch();
  const battleState = useSelector((state: RootState) => state.battle);

  const acceptChallenge = (id: string) => {
    dispatch(removePendingChallenge(id));
    // Start battle logic...
    dispatch(setActiveBattle({
      id: 'active_1',
      opponent: { id: '2', name: 'Rohan', avatar: 'https://i.pravatar.cc/150?img=14' },
      subject: 'English',
      topic: 'Grammar',
      questionCount: 10,
      myScore: 0,
      opponentScore: 0,
      status: 'active',
      powerUpsAvailable: ['extra_time', 'double_xp', 'skip_question'],
    }));
  };

  const declineChallenge = (id: string) => {
    dispatch(removePendingChallenge(id));
  };

  const sendChallenge = (opponentId: string, subject: string, topic: string, count: number) => {
    // Initiate waiting screen
    dispatch(setActiveBattle({
      id: 'active_2',
      opponent: { id: opponentId, name: 'Opponent', avatar: 'https://i.pravatar.cc/150?img=15' },
      subject,
      topic,
      questionCount: count,
      myScore: 0,
      opponentScore: 0,
      status: 'waiting',
      powerUpsAvailable: [],
    }));
  };

  const applyPowerUp = (powerUpId: string, cost: number) => {
    dispatch(spendCoins(cost));
    dispatch(usePowerUp(powerUpId));
  };

  const simulateLiveOpponent = () => {
    if (battleState.activeBattle?.status === 'active') {
      const newScore = battleState.activeBattle.opponentScore + 10;
      dispatch(updateScores({ 
        myScore: battleState.activeBattle.myScore, 
        opponentScore: newScore 
      }));
    }
  };

  return {
    ...battleState,
    acceptChallenge,
    declineChallenge,
    sendChallenge,
    applyPowerUp,
    simulateLiveOpponent,
  };
};
