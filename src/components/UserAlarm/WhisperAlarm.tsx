import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import {profileProps} from '../../types/profile.type';
import Images from '../../constants/images';
import ArrowBack from '../../../assets/images/back.svg';

const WhisperAlarm = ({navigation}: profileProps) => {
  const [whisperAlarmEnabled, setWhisperAlarmEnabled] = useState(false);
  const [timeSet, setTimeSet] = useState(false);

  const toggleWhisperAlarm = () => {
    setWhisperAlarmEnabled(previousState => !previousState);
  };

  const navigateToDetail = () => {
    navigation.navigate('WhisperAlarmDetail');
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <ArrowBack width={24} height={24} fill={colors.black} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Whisper 알림</Text>

        {timeSet && (
          <View style={styles.switchContainer}>
            <Text style={styles.optionText}>Whisper 알림 설정</Text>
            <Switch
              value={whisperAlarmEnabled}
              onValueChange={toggleWhisperAlarm}
              trackColor={{false: colors.lightBrown, true: colors.black}}
              thumbColor={
                whisperAlarmEnabled ? colors.lightBrown : colors.white
              }
              style={styles.switch}
            />
          </View>
        )}

        <TouchableOpacity style={styles.addButton} onPress={navigateToDetail}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    margin: 20,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 28,
    color: colors.black,
    marginBottom: 30,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 18,
    color: colors.black,
  },
  switch: {
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryColorSky,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  addButtonText: {
    fontSize: 36,
    color: colors.white,
    lineHeight: 36,
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

export default WhisperAlarm;
