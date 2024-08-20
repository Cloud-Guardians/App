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
import {ThemeProvider} from 'styled-components';
import {theme} from './constants/theme';
import {RecoilRoot} from 'recoil';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
