import React from 'react';
import { View } from 'react-native';

export const createEmptyScreen = (): React.FC => {
  const EmptyScreen = (): React.ReactElement => <View />;
  return EmptyScreen;
};

export default createEmptyScreen;
