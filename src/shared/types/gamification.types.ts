export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface Level {
  id: string;
  threshold: number;
}
