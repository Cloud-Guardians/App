import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../constants/fonts';
import Images from '../../constants/images';
import CustomProgressBar from '../../components/CustomProgressBar';
import DateTimePicker from '../../components/DateTimePicker';
import CustomBtn from '../../components/CustomBtn';
import {dailyProps} from '../../types/diary.type';
import {useRecoilValue} from 'recoil';
import {jwtTokenState} from '../../atoms/authAtom';
import {makeApiRequest} from '../../utils/api';

const DiaryEmotion = ({navigation}: dailyProps) => {
  const [selectedColors, setSelectedColors] = useState({
    green: '#368F3F',
    blue: '#295D9B',
    red: '#B73636',
    orange: '#D7801A',
    black: '#393636',
  });

  const [selectedLevels, setSelectedLevels] = useState({
    joy: 0,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    boredom: 0,
  });

  const token = useRecoilValue(jwtTokenState);

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

  const gotoDailyDiary = async () => {
    try {
      const emotionData = {
        joy: selectedLevels.joy,
        sadness: selectedLevels.sadness,
        anger: selectedLevels.anger,
        anxiety: selectedLevels.anxiety,
        boredom: selectedLevels.boredom,
      };

      const response = await makeApiRequest(
        'POST',
        '/diaries/self-emotions',
        emotionData,
        token ?? undefined,
      );

      // 응답 처리
      if (response.statusCode === 201) {
        console.log('감정 데이터 저장 성공:', response.data);
        navigation.navigate('DailyDiary');
      } else {
        console.error('감정 데이터 저장 실패:', response.errorMessage);
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <DateTimePicker
          defaultValue={new Date()}
          onDateChange={value => console.log(value)}
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
