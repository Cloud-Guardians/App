import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import CustomBtn from '../../components/CustomBtn';
import Fonts from '../../constants/fonts';
import {useRecoilState} from 'recoil';
import {emailState, passwordState} from '../../atoms/authAtom';
import {SignUpScreenProps} from '../../types/user.type';

const SignUpPage = ({navigation}: SignUpScreenProps) => {
  // Recoil 상태를 직접 사용하여 이메일과 비밀번호 관리
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateFields = () => {
    if (!email || !password || !passwordConfirm) {
      setError('모든 필드를 입력해 주세요.');
      return false;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSignUp = () => {
    if (!validateFields()) {
      return;
    }
    // 이미 Recoil 상태가 업데이트되므로 추가 작업 필요 없음
    navigation.navigate('AddProfile');
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../../assets/backgrondimg.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          style={styles.input}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <CustomBtn text="다음" type="PRIMARY" onPress={handleSignUp} />
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpPage;
