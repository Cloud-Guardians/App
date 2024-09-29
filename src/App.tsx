import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigations/AppNavigator';
import {ThemeProvider} from 'styled-components';
import {theme} from './constants/theme';
import {LogBox} from 'react-native';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import RecoilNexus from 'recoil-nexus';
import {loadTokensFromStorage} from './atoms/authAtom';
import {tokenState, isLoggedInState} from './atoms/authAtom';
import Config from 'react-native-config';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreLogs(['ReactImageView']);

const InitializeApp = () => {
  const setTokenState = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false); // 잠금 상태 추가
  const [pinCode, setPinCode] = useState(''); // PIN 코드 상태

  useEffect(() => {
    const initializeTokens = async () => {
      await loadTokensFromStorage(setTokenState, setIsLoggedIn);
      checkLockStatus();
      setIsLoading(false);
      SplashScreen.hide();
    };

    initializeTokens();
  }, [setTokenState, setIsLoggedIn]);

  // 잠금 상태 확인 함수
  const checkLockStatus = async () => {
    try {
      const requestUrl = `${Config.API_BASE_URL}/api/users/user-lock?insertCode=${pinCode}`; // 유저 입력받은 PIN 코드 사용
      const accessToken = ''; // Recoil에서 가져오는 게 필요합니다.
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = await response.json();

      if (response.status === 200 && responseJson.data) {
        setIsLocked(true); // 잠금 코드가 있으면 잠금 상태로 설정
      } else {
        setIsLocked(false); // 잠금 코드가 없으면 잠금 해제
      }
    } catch (error) {
      console.error('잠금 상태 확인 오류:', error);
      Alert.alert('오류', '잠금 상태 확인 중 문제가 발생했습니다.');
    }
  };

  const handleCheckPinCode = () => {
    if (pinCode.length === 4) {
      checkLockStatus();
    } else {
      Alert.alert('오류', 'PIN 코드는 4자리여야 합니다.');
    }
  };

  // 로딩 중일 때 로딩 화면 또는 아무것도 렌더링하지 않음
  if (isLoading) {
    return null;
  }

  if (isLocked) {
    // PIN 코드 입력 UI
    return (
      <View style={styles.pinCodeContainer}>
        <Text style={styles.title}>PIN 코드를 입력하세요</Text>
        <TextInput
          placeholder="PIN 코드"
          keyboardType="numeric"
          maxLength={4}
          value={pinCode}
          onChangeText={setPinCode}
          style={styles.pinInput}
        />
        <TouchableOpacity style={styles.pinButton} onPress={handleCheckPinCode}>
          <Text style={styles.pinButtonText}>PIN 코드 확인</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

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
  pinCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  pinButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  pinButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
