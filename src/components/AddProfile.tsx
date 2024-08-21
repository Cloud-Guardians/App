import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  emailState,
  passwordState,
  nameState,
  nicknameState,
  jwtTokenState,
  genderState,
  birthdateState,
  calendarTypeState,
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
  const [calendarType, setCalendarType] = useState('1');
  const [birthTime, setBirthTime] = useState('모름');
  const [openCalendarType, setOpenCalendarType] = useState(false);
  const [openBirthTime, setOpenBirthTime] = useState(false);

  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const nickname = useRecoilValue(nicknameState);
  const setJwtToken = useSetRecoilState(jwtTokenState);
  const setNameState = useSetRecoilState(nameState);
  const setGenderState = useSetRecoilState(genderState);
  const setBirthdateState = useSetRecoilState(birthdateState);
  const setCalendarTypeState = useSetRecoilState(calendarTypeState);
  const setBirthTimeState = useSetRecoilState(birthTimeState);

  const selectGender = (gender: 'male' | 'female') => {
    setIsMale(gender === 'male');
    setIsFemale(gender === 'female');
  };

  const onRegisterPressed = async () => {
    try {
      const gender = isMale ? 'male' : 'female';

      setNameState(userName);
      setGenderState(gender);
      setBirthdateState(userBirthDate);
      setCalendarTypeState(calendarType);
      setBirthTimeState(birthTime);

      const data = {
        user_email: email,
        password,
        name: userName,
        nickname,
        gender,
        calendar_type: calendarType,
        birthdate: userBirthDate,
        birth_time: birthTime,
      };

      const response = await makeApiRequest('POST', '/auth/signup', data);

      if (response.token) {
        setJwtToken(response.token);
        console.log('JWT 토큰 저장 성공:', response.token);
        navigation.navigate('Home');
      } else {
        console.error('토큰이 반환되지 않았습니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../assets/backgrondimg.jpg')}>
      <TouchableOpacity onPress={goback}>
        <Back />
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
          label="생년월일"
          value={userBirthDate}
          setValue={setUserBirthDate}
          secureTextEntry={false}
        />
        <Text style={styles.label}>성별</Text>
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
        <Text style={styles.label}>달력 종류</Text>
        <DropDownPicker
          open={openCalendarType}
          value={calendarType}
          items={[
            {label: '양력', value: '1'},
            {label: '음력 평달', value: '2'},
            {label: '음력 윤달', value: '3'},
          ]}
          setOpen={setOpenCalendarType}
          setValue={setCalendarType}
          setItems={() => {}}
          zIndex={1000}
          zIndexInverse={1000}
        />
        <Text style={styles.label}>출생 시간</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  genderContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default AddProfilePage;
