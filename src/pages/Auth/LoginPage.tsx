import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {useSetRecoilState} from 'recoil';
import {UserProps} from '../../types/user.type';
import {tokenState, isLoggedInState, emailState} from '../../atoms/authAtom'; // 통합된 Recoil 상태
import messaging from '@react-native-firebase/messaging';
import {makeApiRequest} from '../../utils/api'; // API 요청 함수

const LoginPage = ({navigation}: UserProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setTokens = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserEmail = useSetRecoilState(emailState);

 const getFcmToken = async () =>{
      const fcmToken = await messaging().getToken();
      console.log('[+] Fcm Token :: ', fcmToken);
      }

const subscribe = messaging().onMessage(async remoteMessage => {
		console.log('[+] Remote Message ', JSON.stringify(remoteMessage));
	});

  const onSignInPressed = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    const loginData = {
      userEmail: email,
      password,
    };

    try {
      const response = await makeApiRequest('POST', 'auth/login', loginData);

      // 서버에서 받은 전체 응답 로그
      console.log('전체 응답:', response);

     if (response.status === 200 || response.status === 201) {
        // headers에서 토큰 추출
        const accessToken = response.headers['access-token'];
        const refreshToken = response.headers['refresh-token'];
         const fcmToken = getFcmToken();

        if (accessToken && refreshToken) {
          setTokens({
            accessToken: accessToken,
            refreshToken: refreshToken,
             fcmToken: fcmToken,
          });
          setIsLoggedIn(true);
          setUserEmail(email);

          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);
//           console.log('Fcm Token:',fcmToken);

          Alert.alert('로그인 성공', '홈 화면으로 이동합니다.');
          navigation.navigate('Home');
        } else {
          console.error('토큰이 누락되었습니다:', response);
          Alert.alert('로그인 실패', '토큰이 누락되었습니다.');
        }
      } else {
        console.error('로그인 실패:', response.data?.errorMessage);
        Alert.alert(
          '로그인 실패',
          response.data?.errorMessage || '로그인에 실패했습니다.',
        );
      }
    } catch (error: any) {
      console.error('로그인 오류:', error.message || error);
      Alert.alert(
        '로그인 실패',
        error.message || '로그인 중 오류가 발생했습니다.',
      );
    }
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const onPasswordReset = () => {
    navigation.navigate('FindByPassword');
  };

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={require('../../../assets/backgrondimg.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <Image
          source={require('../../../assets/boss.png')}
          style={styles.image}
        />

        <CustomInput
          label="이메일"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <CustomInput
          label="패스워드"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomBtn text="로그인" onPress={onSignInPressed} />

        <View style={styles.user}>
          <TouchableOpacity>
            <CustomBtn
              text="회원가입"
              onPress={onSignUpPressed}
              type="NONESTYLE"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CustomBtn
              text="비밀번호 재설정"
              onPress={onPasswordReset}
              type="NONESTYLE"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.MapoFont,
  },
  image: {
    width: 200,
    maxWidth: 200,
    height: 300,
  },
  user: {
    flexDirection: 'row',
    gap: 154,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LoginPage;