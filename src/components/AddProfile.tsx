import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Images from '../constants/images';
import Fonts from '../constants/fonts';
import colors from '../constants/colors';
import CustomInput from './CustomInput';
import CustomBtn from './CustomBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackAppBar from './BackAppBar/BackAppBar';
import ArrowBack from '../../assets/images/back.svg';
import {useNavigation} from '@react-navigation/native';
type PROPS = {
  label: string;
  value: string | number;
};

const AddProfile = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [userBirthDate, setUserBirthDate] = useState('');

  // Dropdown states
  const [openCalendarDropdown, setOpenCalendarDropdown] = useState(false);
  const [openTimeDropdown, setOpenTimeDropdown] = useState(false);
  const [calendarType, setCalendarType] = useState('1');
  const [birthTime, setBirthTime] = useState(1);

  const [calendarOptions] = useState<PROPS[]>([
    {label: '양력', value: '1'},
    {label: '음력 평달', value: '2'},
    {label: '음력 윤달', value: '3'},
  ]);

  const [birthTimeOptions] = useState<PROPS[]>([
    {label: '子時 (자시) 오전 11시~오전 1시', value: 1},
    {label: '丑時 (축시) 오전 1시~오전 3시', value: 2},
    {label: '寅時 (인시) 오전 3시~오전 5시', value: 3},
    {label: '卯時 (묘시) 오전 5시~오전 7시', value: 4},
    {label: '辰時 (진시) 오전 7시~오전 9시', value: 5},
    {label: '巳時 (사시) 오전 9시~오전 11시', value: 6},
    {label: '午時 (오시) 오전 11시~오후 1시', value: 7},
    {label: '未時 (미시) 오후 1시~오후 3시', value: 8},
    {label: '申時 (신시) 오후 3시~오후 5시', value: 9},
    {label: '酉時 (유시) 오후 5시~오후 7시', value: 10},
    {label: '戌時 (술시) 오후 7시~오후 9시', value: 11},
    {label: '亥時 (해시) 오후 9시~오전 11시', value: 12},
  ]);

  const selectGender = (gender: 'male' | 'female') => {
    if (gender === 'male') {
      setIsMale(true);
      setIsFemale(false);
    } else if (gender === 'female') {
      setIsMale(false);
      setIsFemale(true);
    } else {
      setIsMale(false);
      setIsFemale(false);
    }
  };

  const handleCalendarDropdownOpen = () => {
    if (!openTimeDropdown) {
      setOpenCalendarDropdown(true);
    }
  };

  const handleTimeDropdownOpen = () => {
    if (!openCalendarDropdown) {
      setOpenTimeDropdown(true);
    }
  };

  const handleDropdownClose = () => {
    setOpenCalendarDropdown(false);
    setOpenTimeDropdown(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.backBar}>
          <TouchableOpacity onPress={goBack}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>추가 정보 입력</Text>
        <View style={styles.contents}>
          <CustomInput
            label="이름"
            value={userName}
            setValue={setUserName}
            secureTextEntry={false}
          />

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

          <View style={styles.birthContainer}>
            <CustomInput
              label="생년월일"
              value={userBirthDate}
              setValue={setUserBirthDate}
              secureTextEntry={false}
            />
            <View
              style={[
                styles.birthDrop,
                openCalendarDropdown && styles.zIndexTop,
              ]}>
              <DropDownPicker
                open={openCalendarDropdown}
                value={calendarType}
                items={calendarOptions}
                setOpen={handleCalendarDropdownOpen}
                onClose={handleDropdownClose}
                setValue={setCalendarType}
                setItems={() => {}}
                autoScroll
                zIndex={1000}
                zIndexInverse={1000}
              />
            </View>
          </View>

          <View
            style={[styles.timePicker, openTimeDropdown && styles.zIndexTop]}>
            <DropDownPicker
              open={openTimeDropdown}
              value={birthTime}
              items={birthTimeOptions}
              setOpen={handleTimeDropdownOpen}
              onClose={handleDropdownClose}
              setValue={setBirthTime}
              autoScroll
              setItems={() => {}}
              zIndex={900}
              zIndexInverse={900}
            />
          </View>
          <View style={styles.submitButton}>
            <CustomBtn
              text="등록하기"
              onPress={() => console.log('등록하기 버튼 클릭')}
              type="PRIMARY"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backBar: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 24,
    marginVertical: 10,
    color: colors.black,
  },
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    width: '90%',
    padding: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    width: '40%',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  birthContainer: {
    flexDirection: 'row',
    maxWidth: 300,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  birthPicker: {
    maxWidth: 100,
    zIndex: 1,
  },
  birthDrop: {
    width: '30%',
    zIndex: 1,
  },
  timePicker: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },
  zIndexTop: {
    zIndex: 2000,
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
  },
});

export default AddProfile;
