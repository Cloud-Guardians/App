// src/pages/Auth/LoginPage.tsx
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
import {LoginScreenProps} from '../../types/user.type';
import {makeApiRequest} from '../../utils/api';
import {storeTokens} from '../../atoms/authAtom';
import {useSetRecoilState} from 'recoil';
import {tokenState, isLoggedInState, emailState} from '../../atoms/authAtom';

const LoginPage = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Recoil 상태 설정 함수
  const setTokensRecoil = useSetRecoilState(tokenState);
  const setIsLoggedInRecoil = useSetRecoilState(isLoggedInState);
  const setEmailState = useSetRecoilState(emailState);

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
      const response = await makeApiRequest(
        'POST',
        'auth/login',
        loginData,
        undefined,
        navigation,
        false, // 인증 필요 없음
      );

      if (response.status === 201) {
        // 응답에서 토큰 추출
        const accessTokenArray = response.data.data['Access-Token'];
        const refreshTokenArray = response.data.data['Refresh-Token'];


        const accessToken = accessTokenArray ? accessTokenArray[0] : null;
        const refreshToken = refreshTokenArray ? refreshTokenArray[0] : null;

        if (accessToken && refreshToken) {
          // 토큰 저장 및 Recoil 상태 업데이트
          await storeTokens(
            accessToken,
            refreshToken,
            setTokensRecoil,
            setIsLoggedInRecoil,
          );
          setEmailState(email);
          console.log(emailState);
          Alert.alert('로그인 성공', '홈 화면으로 이동합니다.');
          navigation.navigate('Home');
        } else {
          Alert.alert('로그인 실패', '토큰이 누락되었습니다.');
        }
      } else {
        Alert.alert(
          '로그인 실패',
          response.data?.error || '로그인에 실패했습니다.',
        );
      }
    } catch (error: any) {
      Alert.alert(
        '로그인 실패',
        error.response?.data?.error || '로그인 중 오류가 발생했습니다.',
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
