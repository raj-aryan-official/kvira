import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './types';
import BoardSelectionScreen from '../features/onboarding/screens/BoardSelectionScreen';
import ClassSelectionScreen from '../features/onboarding/screens/ClassSelectionScreen';
import SchoolLinkScreen from '../features/onboarding/screens/SchoolLinkScreen';
import ProfileCreationScreen from '../features/onboarding/screens/ProfileCreationScreen';
import SubjectInterestsScreen from '../features/onboarding/screens/SubjectInterestsScreen';
import StarterTestIntroScreen from '../features/onboarding/screens/StarterTestIntroScreen';
import OnboardingCompleteScreen from '../features/onboarding/screens/OnboardingCompleteScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BoardSelection" component={BoardSelectionScreen} />
    <Stack.Screen name="ClassSelection" component={ClassSelectionScreen} />
    <Stack.Screen name="SchoolLink" component={SchoolLinkScreen} />
    <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
    <Stack.Screen name="SubjectInterests" component={SubjectInterestsScreen} />
    <Stack.Screen name="StarterTestIntro" component={StarterTestIntroScreen} />
    <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} />
  </Stack.Navigator>
);

export default OnboardingNavigator;
