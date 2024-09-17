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
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  emailState,
  passwordState,
  nameState,
  tokenState, // 하나의 상태로 관리
  genderState,
  birthdateState,
  birthTimeState,
} from '../atoms/authAtom';
import {makeApiRequest} from '../utils/api';
import Fonts from '../constants/fonts';
import {UserProps} from '../types/user.type';
import Back from '../../assets/images/back.svg';

const AddProfilePage = ({navigation}: UserProps) => {
  const goback = navigation.goBack;

  const [userName, setUserName] = useState('');
  const [userBirthDate, setUserBirthDate] = useState('');
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [birthTime, setBirthTime] = useState('모름');
  const [openBirthTime, setOpenBirthTime] = useState(false);
  const [birthDateError, setBirthDateError] = useState('');

  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const setTokens = useSetRecoilState(tokenState); // 액세스 토큰과 리프레시 토큰을 하나의 상태로 관리
  const setNameState = useSetRecoilState(nameState);
  const setGenderState = useSetRecoilState(genderState);
  const setBirthdateState = useSetRecoilState(birthdateState);
  const setBirthTimeState = useSetRecoilState(birthTimeState);

  const selectGender = (gender: 'male' | 'female') => {
    setIsMale(gender === 'male');
    setIsFemale(gender === 'female');
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

    try {
      const gender = isMale ? 'm' : 'w';

      setNameState(userName);
      setGenderState(gender);
      setBirthdateState(userBirthDate);
      setBirthTimeState(birthTime);

      const data = {
        userEmail: email,
        password,
        name: userName,
        gender,
        birthdate: userBirthDate,
        birthTime,
      };

      console.log('회원가입 요청 데이터:', data);

      const response = await makeApiRequest('POST', 'auth/signup', data);

      // 응답의 상태 코드 확인
      if (response && response.status === 201) {
        const accessToken =
          response.data?.accessToken || response.headers?.['access-token'];
        const refreshToken =
          response.data?.refreshToken || response.headers?.['refresh-token'];

        if (accessToken && refreshToken) {
          setTokens({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          console.log('액세스 토큰 저장 성공:', accessToken);
          console.log('리프레시 토큰 저장 성공:', refreshToken);
          navigation.navigate('Login');
        } else {
          console.error('토큰이 누락되었습니다:', response);
          Alert.alert('회원가입 실패', '토큰이 누락되었습니다.');
        }
      } else if (response && response.status === 409) {
        Alert.alert('회원가입 실패', '이미 존재하는 회원 정보입니다.');
      } else if (response && response.status === 400) {
        Alert.alert(
          '회원가입 실패',
          response.data.error || '입력한 정보에 문제가 있습니다.',
        );
      } else {
        console.error('회원가입 실패:', response.data.error);
        Alert.alert('회원가입 실패', '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert('회원가입 실패', '회원가입 중 오류가 발생했습니다.');
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
            onPress={() => selectGender('male')}
            type={isMale ? 'WHITE' : undefined}
          />
          <CustomBtn
            text="여성"
            onPress={() => selectGender('female')}
            type={isFemale ? 'WHITE' : undefined}
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