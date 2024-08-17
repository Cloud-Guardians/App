import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {UserProps} from '../../types/user.type';
import Fonts from '../../constants/fonts';

const SignUpPage = ({navigation}: UserProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = () => {
    // 회원가입 로직 추가
    console.log('회원가입 성공:', email, password);
    // 회원가입 성공 후 로그인 페이지로 이동
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../../assets/backgrondimg.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
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
        <CustomBtn text="회원가입" type="PRIMARY" onPress={onSignUpPressed} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: Fonts.MapoFont,
    color: '#333',
  },
});

export default SignUpPage;
