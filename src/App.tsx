import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigations/AppNavigator';
import {ThemeProvider} from 'styled-components';
import {theme} from './constants/theme';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import RecoilNexus from 'recoil-nexus';
import {loadTokensFromStorage} from './atoms/authAtom';
import {tokenState, isLoggedInState} from './atoms/authAtom';

const InitializeApp = () => {
  const setTokenState = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const initializeTokens = async () => {
      await loadTokensFromStorage(setTokenState, setIsLoggedIn);
      setIsLoading(false); // 토큰 로드가 끝나면 로딩 상태 false
      SplashScreen.hide(); // 토큰 로드 후 스플래시 화면 숨김
    };

    initializeTokens();
  }, [setTokenState, setIsLoggedIn]);

  // 로딩 중일 때는 아무 것도 렌더링하지 않음 (혹은 로딩 화면을 추가할 수 있음)
  if (isLoading) {
    return null;
  }

  return null; // 초기화가 완료되면 반환할 UI가 없으므로 null
};
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

  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {};

  const unsubscribe = messaging().onMessage(async remoteMessage =>
    onMessageReceived(remoteMessage),
  );
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[Background Remote Message]', remoteMessage);
  });

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <RecoilRoot>
      <RecoilNexus />
      <SafeAreaView style={styles.container}>
        <ThemeProvider theme={theme}>
          <InitializeApp />
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
