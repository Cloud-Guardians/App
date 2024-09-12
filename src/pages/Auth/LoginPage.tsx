import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import Google from '../../../assets/images/google.svg';
import Kakao from '../../../assets/images/kakao.svg';
import {useSetRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {
  accessTokenState,
  refreshTokenState,
  isLoggedInState,
} from '../../atoms/authAtom'; // Recoil 상태
import {makeApiRequest} from '../../utils/api'; // API 요청 함수
import {UserProps} from '../../types/user.type';

const LoginPage = ({navigation}: UserProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

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

      if (response.statusCode === 201) {
        const accessToken = response.data['Access-Token'][0];
        const refreshToken = response.data['Refresh-Token'][0];

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);

        Alert.alert('로그인 성공', '홈 화면으로 이동합니다.');
        navigation.navigate('Home');
      } else {
        Alert.alert('로그인 실패', response.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다.');
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
