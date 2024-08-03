/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigations/AppNavigator';
import fonts from './constants/fonts';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
