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
import LoginPage from './Auth/LoginPage';
import AdminPage from './Auth/Admin/AdminPage';
import DiaryNotificationSetting from './Profile/DiaryNotificationSetting ';
import UserDataEdit from './Profile/UserDataEdit';
import UserLockScreen from './Profile/UserLockScreen';
import WhisperNotificationSetting from './Profile/WhisperNotificationSetting';
const MyPage: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="UserDataEdit" component={UserDataEdit} />
      <Stack.Screen name="UserAlarm" component={UserAlarm} />
      <Stack.Screen name="DiaryAlarm" component={DiaryAlarm} />
      <Stack.Screen
        name="DiaryNotification"
        component={DiaryNotificationSetting}
      />
      <Stack.Screen
        name="WhisperNotification"
        component={WhisperNotificationSetting}
      />

      <Stack.Screen name="DiaryAlarmDetail" component={DiarylarmDetail} />
      <Stack.Screen name="WhisperAlarm" component={WhisperAlarm} />
      <Stack.Screen name="WhisperAlarmDetail" component={WhisperAlarmDetail} />
      <Stack.Screen name="LockScreen" component={LockScreen} />
      <Stack.Screen name="Admin" component={AdminPage} />
      <Stack.Screen name="UserLockScreen" component={UserLockScreen} />
    </Stack.Navigator>
  );
};

export default MyPage;
