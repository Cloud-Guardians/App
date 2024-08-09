import React from 'react';
import UserProfile from './Profile/UserProfile';
import AddProfile from '../components/AddProfile';
import {RootStackParamList} from '../types/profile.type';
import {createStackNavigator} from '@react-navigation/stack';

const MyPage: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
    </Stack.Navigator>
  );
};

export default MyPage;
