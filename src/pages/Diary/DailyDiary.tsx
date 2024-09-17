import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../constants/fonts';
import Images from '../../constants/images';
import CustomProgressBar from '../../components/CustomProgressBar';
import DateTimePicker from '../../components/DateTimePicker';
import CustomBtn from '../../components/CustomBtn';
import {dailyProps} from '../../types/diary.type';
import {useRecoilValue} from 'recoil';
import {accessTokenState} from '../../atoms/authAtom'; // 변경된 부분
import {makeApiRequest} from '../../utils/api';

const DiaryEmotion = ({navigation}: dailyProps) => {
  const [selectedColors, setSelectedColors] = useState({
    green: '#FFFFFF',
    blue: '#FFFFFF',
    red: '#FFFFFF',
    orange: '#FFFFFF',
    black: '#FFFFFF',
  });

  const [selectedLevels, setSelectedLevels] = useState({
    joy: 0,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    boredom: 0,
  });

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜를 저장
  const accessToken = useRecoilValue(accessTokenState); // 변경된 부분

  const handleColorChange = (colorName: string, color: string) => {
    setSelectedColors(prevColors => ({
      ...prevColors,
      [colorName]: color || '#FFFFFF',
    }));
  };

  const handleLevelChange = (emotionName: string) => (value: number) => {
    setSelectedLevels(prevLevels => ({
      ...prevLevels,
      [emotionName]: value,
    }));
  };

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const gotoDailyDiary = async () => {
    try {
      const emotionData = {
        joy: selectedLevels.joy,
        sadness: selectedLevels.sadness,
        anger: selectedLevels.anger,
        anxiety: selectedLevels.anxiety,
        boredom: selectedLevels.boredom,
        date: formatDate(selectedDate), // 선택된 날짜를 형식에 맞게 변환하여 추가
      };

      const response = await makeApiRequest(
        'POST',
        '/diaries/self-emotions',
        emotionData,
        accessToken ?? undefined, // 변경된 부분
      );

      console.log('액세스 토큰:', accessToken); // 토큰이 올바르게 전달되는지 확인

      // 응답 처리
      if (response.status === 201) {
        console.log('감정 데이터 저장 성공:', response.data);
        navigation.navigate('DailyDiary');
      } else {
        console.error(
          '감정 데이터 저장 실패:',
          response.data?.errorMessage || '알 수 없는 오류',
        );
        Alert.alert(
          '감정 데이터 저장 실패',
          response.data?.errorMessage || '감정 데이터 저장에 실패했습니다.',
        );
      }
    } catch (error: any) {
      console.error('서버 요청 중 오류 발생:', error);
      Alert.alert(
        '서버 요청 중 오류 발생',
        error.message || '오류가 발생했습니다.',
      );
    }
  };

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <DateTimePicker
          defaultValue={selectedDate}
          onDateChange={value => setSelectedDate(value)} // 날짜를 선택하면 상태 업데이트
        />
        <Text style={styles.title}>데일리 감정 측정</Text>
        <Text style={styles.text}>0-100 단위</Text>
        <View style={styles.progressbar}>
          <CustomProgressBar
            colorName="green"
            emoji="😊"
            emotionLabel="기쁨"
            onColorChange={(colorName, color) =>
              handleColorChange(colorName, color)
            }
            onLevelChange={handleLevelChange('joy')}
          />
          <CustomProgressBar
            colorName="blue"
            emoji="😭"
            emotionLabel="슬픔"
            onColorChange={(colorName, color) =>
              handleColorChange(colorName, color)
            }
            onLevelChange={handleLevelChange('sadness')}
          />
          <CustomProgressBar
            colorName="red"
            emoji="😤"
            emotionLabel="화남"
            onColorChange={(colorName, color) =>
              handleColorChange(colorName, color)
            }
            onLevelChange={handleLevelChange('anger')}
          />
          <CustomProgressBar
            colorName="orange"
            emoji="😰"
            emotionLabel="불안"
            onColorChange={(colorName, color) =>
              handleColorChange(colorName, color)
            }
            onLevelChange={handleLevelChange('anxiety')}
          />
          <CustomProgressBar
            colorName="black"
            emoji="😑"
            emotionLabel="따분"
            onColorChange={(colorName, color) =>
              handleColorChange(colorName, color)
            }
            onLevelChange={handleLevelChange('boredom')}
          />

          <LinearGradient
            colors={[
              selectedColors.green,
              selectedColors.blue,
              selectedColors.red,
              selectedColors.orange,
              selectedColors.black,
            ]}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        </View>
        <CustomBtn
          onPress={gotoDailyDiary}
          text="일기쓰러가기"
          type="SECONDARY"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 12,
    letterSpacing: 5,
  },
  text: {
    fontFamily: Fonts.MapoFont,
    fontSize: 16,
    textAlign: 'right',
  },
  progressbar: {
    gap: 30,
  },
  gradient: {
    height: 34,
    borderRadius: 8,
    marginVertical: 20,
  },
});

export default DiaryEmotion;