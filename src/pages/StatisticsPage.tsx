import React from 'react';
import {RootStackParamList} from '../types/staticstics.type';
import {createStackNavigator} from '@react-navigation/stack';
import Emotion from './Staticstics/Emotion';
import Collection from './Staticstics/Collection';

const StatisticsPage: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Emotion">
      <Stack.Screen name="Emotion" component={Emotion} />
      <Stack.Screen name="Collection" component={Collection} />
    </Stack.Navigator>
  );
};

export default StatisticsPage;
