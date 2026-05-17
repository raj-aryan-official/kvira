export type Topic = {
  id: string;
  name: string;
  accuracy: number | null;
  questionsPracticed: number;
};

export type Chapter = {
  id: string;
  order: number;
  name: string;
  topics: Topic[];
  topicCount: number;
  avgAccuracy: number | null;
  completion: number;
};

export type Subject = {
  id: string;
  name: string;
  color: string;
  icon: string;
  questionsPracticed: number;
  accuracy: number | null;
  lastPracticedDaysAgo: number | null;
  isFavourite: boolean;
  chapters: Chapter[];
};

export type CurriculumTree = {
  board: string;
  classNumber: number;
  subjects: Subject[];
};
