/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import colors from './constants/colors';
import fonts from './constants/fonts';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigations/AppNavigator';
import image from './constants/image';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return <AppNavigator />;
}

export default App;
