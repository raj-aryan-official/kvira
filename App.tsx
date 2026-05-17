import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { ToastProvider } from './src/shared/components/ui/Toast';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuthHydration } from './src/features/auth/hooks/useAuthHydration';
import { useOnboardingPersistence } from './src/features/onboarding/hooks/useOnboardingPersistence';

const AppRoot = (): React.ReactElement => {
  useAuthHydration();
  useOnboardingPersistence();

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <AppRoot />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}
