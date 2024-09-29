import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRecoilState} from 'recoil';
import {
  nameState,
  genderState,
  birthdateState,
  birthTimeState,
  tokenState,
} from '../../atoms/authAtom';
import Fonts from '../../constants/fonts';
import {AddUserfileScreenProps} from '../../types/profile.type';
import Back from '../../../assets/images/back.svg';
import Config from 'react-native-config';

const UserDataEdit = ({navigation}: AddUserfileScreenProps) => {
  const goBack = navigation.goBack;

  // Recoil 상태를 사용하여 상태 관리
  const [userName, setUserName] = useRecoilState(nameState);
  const [userBirthDate, setUserBirthDate] = useRecoilState(birthdateState);
  const [gender, setGender] = useRecoilState(genderState);
  const [birthTime, setBirthTime] = useRecoilState(birthTimeState);
  const [token] = useRecoilState(tokenState);
  const accessToken = token.accessToken;

  const [openBirthTime, setOpenBirthTime] = useState(false);
  const [birthDateError, setBirthDateError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 사용자 정보 불러오기
  const fetchUserInfo = async () => {
    setIsLoading(true);
    console.log('Fetching user info...');
    console.log('Access Token:', accessToken); // 디버깅용 로그
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/user-info`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('GET 요청 상태 코드:', response.status); // 응답 상태 코드 디버깅

      const responseJson = await response.json();
      console.log('GET 응답 데이터:', responseJson); // 응답 데이터 디버깅

      if (response.status === 200 && responseJson.data) {
        const userData = responseJson.data;
        setUserName(userData.name);
        setUserBirthDate(userData.birthdate);
        setGender(userData.gender);
        setBirthTime(userData.birthTime);
      } else {
        Alert.alert(
          '오류',
          responseJson.errorMessage || '사용자 정보를 불러오는데 실패했습니다.',
        );
      }
    } catch (error: any) {
      Alert.alert('오류', '사용자 정보를 가져오는 중 문제가 발생했습니다.');
      console.error('사용자 정보 불러오기 오류:', error); // 오류 로그 출력
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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

  // 사용자 정보 수정하기
  const onUpdateUserInfo = async () => {
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
        name: userName,
        gender,
        birthdate: userBirthDate,
        birthTime,
      };

      console.log('보내는 데이터:', data); // 디버깅용 로그
      console.log('Access Token:', accessToken); // 액세스 토큰 디버깅

      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/user-info`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      console.log('PUT 요청 상태 코드:', response.status); // 응답 상태 코드 디버깅

      const responseJson = await response.json();
      console.log('PUT 응답 데이터:', responseJson); // 응답 데이터 디버깅

      if (response.status === 201 || response.status === 200) {
        Alert.alert('성공', '사용자 정보가 성공적으로 수정되었습니다.');
      } else {
        Alert.alert(
          '수정 실패',
          responseJson.errorMessage || '사용자 정보 수정에 실패했습니다.',
        );
      }
    } catch (error: any) {
      console.error('사용자 정보 수정 오류:', error); // 오류 로그 출력
      Alert.alert('오류', '사용자 정보 수정 중 문제가 발생했습니다.');
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require('../../../assets/backgrondimg.jpg')}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.backBar}>
          <Back />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>추가 정보 수정</Text>
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
        <CustomBtn text="수정하기" type="PRIMARY" onPress={onUpdateUserInfo} />
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

export default UserDataEdit;
