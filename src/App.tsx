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
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';



function App() {

    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        console.log('[FCM Token] ', fcmToken);
      };

    useEffect(() => {
      getFcmToken();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('[Remote Message] ', JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    }, []);

const onMessageReceived = async(message: FirebaseMessagingTypes.RemoteMessage)=>{
    }

const unsubscribe = messaging().onMessage(async remoteMessage => onMessageReceived(remoteMessage));
messaging().setBackgroundMessageHandler(async remoteMessage =>{
    console.log('[Background Remote Message]',remoteMessage);
    });

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
