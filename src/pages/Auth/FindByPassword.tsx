import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import {FindByPasswordScreenProps} from '../../types/user.type';
import Fonts from '../../constants/fonts';
import {makeApiRequest} from '../../utils/api'; // API 요청 함수
import BackIcon from '../../../assets/images/back.svg';
import axios, {AxiosError} from 'axios'; // AxiosError 임포트

const FindByPassword = ({navigation}: FindByPasswordScreenProps) => {
  const [email, setEmail] = useState(''); // 이메일 입력 필드
  const [tempPassword, setTempPassword] = useState(''); // 인증번호 입력 필드
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호 필드
  const [confirmPassword, setConfirmPassword] = useState(''); // 새 비밀번호 확인 필드
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 전송 여부

  // 이메일 인증번호 전송 요청
  const sendTempPassword = async () => {
    try {
      const response = await makeApiRequest(
        'POST',
        'auth/send-temp-pw',
        {userEmail: email},
        undefined,
        navigation,
        false, // 인증 필요 없음
      );
      if (response && response.status === 200) {
        Alert.alert('인증번호 전송', '해당 이메일로 인증번호를 보냈습니다.', [
          {text: '확인'},
        ]);
        setIsEmailSent(true); // 이메일 전송 완료 처리
      } else {
        throw new Error(response?.data?.error || '이메일 인증에 실패했습니다.');
      }
    } catch (error: unknown) {
      handleError(error, '이메일 인증 중 오류가 발생했습니다.');
    }
  };

  // 비밀번호 재설정 요청
  const onResetPasswordPressed = async () => {
    if (!tempPassword) {
      Alert.alert('오류', '인증번호를 입력해 주세요.');
      return;
    }

    if (!newPassword || newPassword !== confirmPassword) {
      Alert.alert('오류', '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        newPassword,
      )
    ) {
      Alert.alert(
        '오류',
        '비밀번호는 8~16자 영문 대소문자, 숫자, 특수문자를 사용해야 합니다.',
      );
      return;
    }

    try {
      const resetPasswordData = {
        userEmail: email,
        tempPassword,
        newPassword,
        confirmPassword,
      };

      // 비밀번호 재설정 요청
      const response = await makeApiRequest(
        'PUT',
        'auth/update-pw',
        resetPasswordData,
        undefined,
        navigation,
        false, // 인증 필요 없음
      );

      if (response && response.status === 200) {
        Alert.alert(
          '비밀번호 재설정',
          '비밀번호가 성공적으로 변경되었습니다.',
          [{text: '확인', onPress: () => navigation.navigate('Login')}],
        );
      } else {
        throw new Error(
          response?.data?.error || '비밀번호 재설정에 실패했습니다.',
        );
      }
    } catch (error: unknown) {
      handleError(error, '비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error)) {
      Alert.alert('오류', error.response?.data?.error || defaultMessage);
    } else {
      Alert.alert('오류', '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../../assets/backgrondimg.jpg')}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <BackIcon width={24} height={24} fill="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 찾기</Text>

        {!isEmailSent ? (
          <>
            {/* 이메일 입력 및 인증번호 전송 버튼 */}
            <CustomInput
              label="이메일"
              value={email}
              setValue={setEmail}
              secureTextEntry={false}
            />
            <CustomBtn
              text="인증번호 받기"
              type="PRIMARY"
              onPress={sendTempPassword}
            />
          </>
        ) : (
          <>
            {/* 인증번호 및 새 비밀번호 입력 */}
            <CustomInput
              label="인증번호"
              value={tempPassword}
              setValue={setTempPassword}
              secureTextEntry={false}
            />
            <CustomInput
              label="새 비밀번호"
              value={newPassword}
              setValue={setNewPassword}
              secureTextEntry={true}
            />
            <CustomInput
              label="새 비밀번호 확인"
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry={true}
            />
            <CustomBtn
              text="비밀번호 재설정"
              type="PRIMARY"
              onPress={onResetPasswordPressed}
            />
          </>
        )}
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
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
