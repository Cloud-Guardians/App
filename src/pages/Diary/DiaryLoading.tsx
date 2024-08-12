import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import Images from '../../constants/images';
import Boss from '../../../assets/images/bossanaly.svg';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
const DiaryLoading = () => {
  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View style={styles.container}>
        <Boss />
        <Text style={styles.title}>
          구름도사가 당신의 일기를 분석하고 있습니다...
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.MapoFont,
    color: colors.black,
    fontSize: 18,
  },
});
export default DiaryLoading;
