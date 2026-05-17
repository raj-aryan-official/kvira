import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import { selectIsAuthenticated, selectIsAuthHydrated } from '../features/auth/store/authSelectors';
import { selectOnboardingComplete } from '../features/onboarding/store/onboardingSelectors';
import { authTheme } from '../shared/constants/authTheme';
import type { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = (): React.ReactElement => {
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const onboardingComplete = useAppSelector(selectOnboardingComplete);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: authTheme.background }}>
        <ActivityIndicator color={authTheme.text} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !onboardingComplete ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
