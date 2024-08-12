import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../constants/fonts';
import Images from '../../constants/images';
import CustomProgressBar from '../../components/CustomProgressBar';
import DateTimePicker from '../../components/DateTimePicker';
import CustomBtn from '../../components/CustomBtn';
import {dailyProps} from '../../types/diary.type';

const DiaryEmotion = ({navigation}: dailyProps) => {
  const [selectedColors, setSelectedColors] = useState({
    green: 'rgba(255, 255, 255, 1)',
    blue: 'rgba(255, 255, 255, 1)',
    red: 'rgba(255, 255, 255, 1)',
    orange: 'rgba(255, 255, 255, 1)',
    black: 'rgba(255, 255, 255, 1)',
  });

  const handleColorChange = (colorName: string, color: string) => {
    setSelectedColors(prevColors => ({
      ...prevColors,
      [colorName]: color,
    }));
  };

  const gotoDailyDiary = () => {
    navigation.navigate('DailyDiary');
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
        <Text style={styles.title}>데일리감정측정</Text>
        <Text style={styles.text}>10단위</Text>
        <View style={styles.progressbar}>
          <CustomProgressBar
            colorName="green"
            emoji="😊"
            emotionLabel="기쁨"
            onColorChange={handleColorChange}
          />
          <CustomProgressBar
            colorName="blue"
            emoji="😭"
            emotionLabel="슬픔"
            onColorChange={handleColorChange}
          />
          <CustomProgressBar
            colorName="red"
            emoji="😤"
            emotionLabel="화남"
            onColorChange={handleColorChange}
          />
          <CustomProgressBar
            colorName="orange"
            emoji="😰"
            emotionLabel="불안"
            onColorChange={handleColorChange}
          />
          <CustomProgressBar
            colorName="black"
            emoji="😑"
            emotionLabel="따분"
            onColorChange={handleColorChange}
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
