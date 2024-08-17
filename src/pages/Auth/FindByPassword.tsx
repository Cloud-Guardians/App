import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {UserProps} from '../../types/user.type';
import Fonts from '../../constants/fonts';

const FindByPassword = ({navigation}: UserProps) => {
  const [email, setEmail] = useState('');

  const onResetPasswordPressed = () => {
    // 이메일로 비밀번호 재설정 링크 전송 로직 추가
    console.log('비밀번호 재설정 이메일 전송:', email);
    Alert.alert(
      '비밀번호 재설정',
      '해당 이메일로 비밀번호 재설정 링크를 보냈습니다.',
      [{text: '확인', onPress: () => navigation.navigate('Login')}],
    );
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../../assets/backgrondimg.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <CustomInput
          label="이메일"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <CustomBtn
          text="비밀번호 재설정"
          type="PRIMARY"
          onPress={onResetPasswordPressed}
        />
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

export default FindByPassword;
