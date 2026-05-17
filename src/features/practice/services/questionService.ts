import apiClient from '../../../services/api/apiClient';
import type { CurriculumTree } from '../types/curriculum.types';

const MOCK_CURRICULUM: CurriculumTree = {
  board: 'CBSE',
  classNumber: 8,
  subjects: [
    {
      id: 'math',
      name: 'Mathematics',
      color: '#4F46E5',
      icon: '📐',
      questionsPracticed: 120,
      accuracy: 78,
      lastPracticedDaysAgo: 1,
      isFavourite: false,
      chapters: [
        {
          id: 'm1',
          order: 1,
          name: 'Rational Numbers',
          topicCount: 4,
          avgAccuracy: 35,
          completion: 0.4,
          topics: [
            { id: 't1', name: 'Introduction', accuracy: 80, questionsPracticed: 20 },
            { id: 't2', name: 'Properties', accuracy: 42, questionsPracticed: 15 },
            { id: 't3', name: 'Word Problems', accuracy: 30, questionsPracticed: 10 },
          ],
        },
        {
          id: 'm2',
          order: 2,
          name: 'Linear Equations',
          topicCount: 3,
          avgAccuracy: 72,
          completion: 0.7,
          topics: [
            { id: 't4', name: 'One Variable', accuracy: 88, questionsPracticed: 25 },
            { id: 't5', name: 'Applications', accuracy: 65, questionsPracticed: 18 },
          ],
        },
      ],
    },
    {
      id: 'sci',
      name: 'Science',
      color: '#34D399',
      icon: '🔬',
      questionsPracticed: 0,
      accuracy: null,
      lastPracticedDaysAgo: null,
      isFavourite: false,
      chapters: [],
    },
    {
      id: 'eng',
      name: 'English',
      color: '#F87171',
      icon: '📚',
      questionsPracticed: 45,
      accuracy: 55,
      lastPracticedDaysAgo: 3,
      isFavourite: true,
      chapters: [],
    },
  ],
};

export const fetchCurriculum = async (board: string, classNumber: number): Promise<CurriculumTree> => {
  try {
    const { data } = await apiClient.get<CurriculumTree>('/practice/curriculum', {
      params: { board, classNumber },
    });
    return data;
  } catch {
    return { ...MOCK_CURRICULUM, board, classNumber };
  }
};

export const fetchTopicStats = async (topicId: string) => {
  const { data } = await apiClient.get(`/practice/topics/${topicId}/stats`);
  return data;
};

export default { fetchCurriculum, fetchTopicStats };
