export interface PowerUp {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export const POWER_UPS: Record<string, PowerUp> = {
  extra_time: {
    id: 'extra_time',
    name: 'Extra Time',
    cost: 30,
    description: 'Adds 2 minutes to your timer without affecting the opponent.',
  },
  double_xp: {
    id: 'double_xp',
    name: 'Double XP',
    cost: 50,
    description: 'Doubles XP earned from this battle regardless of outcome.',
  },
  skip_question: {
    id: 'skip_question',
    name: 'Skip Question',
    cost: 20,
    description: 'Allows skipping one question without marking it wrong.',
  },
};
