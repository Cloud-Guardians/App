import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  emailState,
  passwordState,
  nameState,
  genderState,
  birthdateState,
  birthTimeState,
} from '../atoms/authAtom';
import {makeApiRequest} from '../utils/api';
import Fonts from '../constants/fonts';
import {SignUpScreenProps} from '../types/user.type';
import Back from '../../assets/images/back.svg';

const AddProfilePage = ({navigation}: SignUpScreenProps) => {
  const goback = navigation.goBack;

  // Recoil 상태를 사용하여 상태 관리
  const [userName, setUserName] = useRecoilState(nameState);
  const [userBirthDate, setUserBirthDate] = useRecoilState(birthdateState);
  const [gender, setGender] = useRecoilState(genderState);
  const [birthTime, setBirthTime] = useRecoilState(birthTimeState);

  const [openBirthTime, setOpenBirthTime] = useState(false);
  const [birthDateError, setBirthDateError] = useState('');

  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);

  const selectGender = (selectedGender: 'm' | 'w') => {
    setGender(selectedGender);
  };

  const validateBirthDate = (date: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      setBirthDateError('생년월일은 YYYY-MM-DD 형식이어야 합니다.');
      return false;
    } else {
      setBirthDateError('');
      return true;
    }
  };

  const onRegisterPressed = async () => {
    if (!validateBirthDate(userBirthDate)) {
      Alert.alert('입력 오류', '생년월일을 YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }

    if (!gender) {
      Alert.alert('입력 오류', '성별을 선택해주세요.');
      return;
    }

    try {
      const data = {
        userEmail: email,
        password,
        name: userName,
        gender,
        birthdate: userBirthDate,
        birthTime,
      };

      const response = await makeApiRequest(
        'POST',
        'auth/signup',
        data,
        undefined,
        navigation,
        false,
      );

      // 응답의 상태 코드 확인
      if (response && (response.status === 201 || response.status === 200)) {
        Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
        navigation.navigate('Login'); // 로그인 화면으로 이동
      } else if (response && response.status === 409) {
        Alert.alert('회원가입 실패', '이미 존재하는 회원 정보입니다.');
      } else if (response && response.status === 400) {
        Alert.alert(
          '회원가입 실패',
          response.data.error || '입력한 정보에 문제가 있습니다.',
        );
      } else {
        Alert.alert('회원가입 실패', '회원가입에 실패했습니다.');
      }
    } catch (error: any) {
      Alert.alert(
        '회원가입 실패',
        error.response?.data?.error || '회원가입 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../assets/backgrondimg.jpg')}>
      <TouchableOpacity onPress={goback}>
        <View style={styles.backBar}>
          <Back />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>추가 정보 입력</Text>
        <CustomInput
          label="이름"
          value={userName}
          setValue={setUserName}
          secureTextEntry={false}
        />
        <CustomInput
          label="생년월일 (YYYY-MM-DD)"
          value={userBirthDate}
          setValue={setUserBirthDate}
          secureTextEntry={false}
        />
        {birthDateError ? (
          <Text style={styles.error}>{birthDateError}</Text>
        ) : null}
        <View style={styles.genderContainer}>
          <CustomBtn
            text="남성"
            onPress={() => selectGender('m')}
            type={gender === 'm' ? 'WHITE' : undefined}
          />
          <CustomBtn
            text="여성"
            onPress={() => selectGender('w')}
            type={gender === 'w' ? 'WHITE' : undefined}
          />
        </View>
        <DropDownPicker
          open={openBirthTime}
          value={birthTime}
          items={[
            {label: '생시모름', value: '모름'},
            {label: '子時 (자시) 오전 11시~오전 1시', value: '자시'},
            {label: '丑時 (축시) 오전 1시~오전 3시', value: '축시'},
            {label: '寅時 (인시) 오전 3시~오전 5시', value: '인시'},
            {label: '卯時 (묘시) 오전 5시~오전 7시', value: '묘시'},
            {label: '辰時 (진시) 오전 7시~오전 9시', value: '진시'},
            {label: '巳時 (사시) 오전 9시~오전 11시', value: '사시'},
            {label: '午時 (오시) 오전 11시~오후 1시', value: '오시'},
            {label: '未時 (미시) 오후 1시~오후 3시', value: '미시'},
            {label: '申時 (신시) 오후 3시~오후 5시', value: '신시'},
            {label: '酉時 (유시) 오후 5시~오후 7시', value: '유시'},
            {label: '戌時 (술시) 오후 7시~오후 9시', value: '술시'},
            {label: '亥時 (해시) 오후 9시~오전 11시', value: '해시'},
          ]}
          setOpen={setOpenBirthTime}
          setValue={setBirthTime}
          setItems={() => {}}
          zIndex={900}
          zIndexInverse={900}
          style={styles.dropDown}
        />
        <CustomBtn text="등록하기" type="PRIMARY" onPress={onRegisterPressed} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backBar: {
    position: 'absolute',
    top: -80,
    right: 160,
  },
  container: {
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: Fonts.MapoFont,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  dropDown: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default AddProfilePage;
