import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import {profileProps} from '../../types/profile.type';
import Images from '../../constants/images';
import ArrowBack from '../../../assets/images/back.svg';

const WhisperAlarmDetail = ({navigation}: profileProps) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleConfirm = () => {
    navigation.navigate('WhisperAlarm');
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} fill={colors.black} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>알림 시간 설정</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.promptText}>억지로웃는 고양이님,</Text>
            <Text style={styles.promptText}>
              Whisper와 대화는 몇시가 좋으시나요?
            </Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={showDatepicker}>
              <Text style={styles.timeButtonText}>시간 선택</Text>
            </TouchableOpacity>
            <Text style={styles.selectedTimeText}>
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode="time"
              display="spinner"
              onChange={onChange}
              style={styles.dateTimePicker}
            />
          )}
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 26,
    color: colors.black,
    marginBottom: 30,
    textAlign: 'center',
  },
  pickerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  promptText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 18,
    color: colors.black,
    marginVertical: 5,
    textAlign: 'center',
  },
  timeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryColorSky,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  timeButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: Fonts.MapoFont,
  },
  selectedTimeText: {
    marginTop: 30,
    fontSize: 54,
    color: colors.secondaryColorNavy,
    fontFamily: Fonts.MapoFont,
  },
  confirmButton: {
    marginTop: 40,
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: Fonts.MapoFont,
    textTransform: 'uppercase',
  },
  dateTimePicker: {
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 20,
  },
});

export default WhisperAlarmDetail;
