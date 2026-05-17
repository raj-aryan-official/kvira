import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';
import HomeScreen from '../features/home/screens/HomeScreen';
import PracticeStackNavigator from './PracticeStackNavigator';
import LeaderboardScreen from '../features/leaderboard/screens/LeaderboardScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import AnalyticsScreen from '../features/analytics/screens/AnalyticsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = (): React.ReactElement => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Practice" component={PracticeStackNavigator} />
    <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
