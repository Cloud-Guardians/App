import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import Google from '../../../assets/images/google.svg';
import Kakao from '../../../assets/images/kakao.svg';
import {useNavigation} from '@react-navigation/native';

const onRegisterPressed = () => {};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {};

  const onSignUpPressed = () => {};

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
          <CustomBtn
            text="회원가입"
            onPress={onSignUpPressed}
            type="NONESTYLE"
          />
          <CustomBtn
            text="비밀번호 재설정"
            onPress={onSignInPressed}
            type="NONESTYLE"
          />
        </View>
        <View style={styles.social}>
          <Kakao onPress={onSignInPressed} />
          <Google onPress={onSignInPressed} />
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
    padding: 10,
    gap: 100,
  },
  social: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});

export default LoginPage;
