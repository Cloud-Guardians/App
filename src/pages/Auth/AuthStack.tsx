import React from 'react';

import {RootStackParamList} from '../../types/user.type';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import FindByPassword from './FindByPassword';

const AuthStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="FindByPassword" component={FindByPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
