import React from 'react';
import UserProfile from './Profile/UserProfile';
import AddProfile from '../components/AddProfile';
import {RootStackParamList} from '../types/profile.type';
import {createStackNavigator} from '@react-navigation/stack';
import LockScreen from '../components/LockScreen/LockScreen';
import UserAlarm from '../components/UserAlarm/UserAlarm';
import WhisperAlarm from '../components/UserAlarm/WhisperAlarm';
import WhisperAlarmDetail from '../components/UserAlarm/WhisperAarmDetail';
import DiaryAlarm from '../components/UserAlarm/DiaryAlarm';
import DiarylarmDetail from '../components/UserAlarm/DiaryAlarmDetail';
const MyPage: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
      <Stack.Screen name="UserAlarm" component={UserAlarm} />
      <Stack.Screen name="DiaryAlarm" component={DiaryAlarm} />
      <Stack.Screen name="DiaryAlarmDetail" component={DiarylarmDetail} />
      <Stack.Screen name="WhisperAlarm" component={WhisperAlarm} />
      <Stack.Screen name="WhisperAlarmDetail" component={WhisperAlarmDetail} />
      <Stack.Screen name="LockScreen" component={LockScreen} />
    </Stack.Navigator>
  );
};

export default MyPage;
