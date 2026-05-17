import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PracticeStackParamList } from './types';
import SubjectSelectionScreen from '../features/practice/screens/SubjectSelectionScreen';
import ChapterSelectionScreen from '../features/practice/screens/ChapterSelectionScreen';
import TopicSelectionScreen from '../features/practice/screens/TopicSelectionScreen';

const Stack = createNativeStackNavigator<PracticeStackParamList>();

const PracticeStackNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
    <Stack.Screen name="ChapterSelection" component={ChapterSelectionScreen} />
    <Stack.Screen name="TopicSelection" component={TopicSelectionScreen} />
  </Stack.Navigator>
);

export default PracticeStackNavigator;
