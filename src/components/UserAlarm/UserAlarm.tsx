import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import ArrowBack from '../../../assets/images/back.svg';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import {profileProps} from '../../types/profile.type';
import Alarrm from '../../../assets/images/alarm.svg';

const UserAlarm = ({navigation}: profileProps) => {
  const goback = () => {
    navigation.goBack();
  };

  const [communityAlarmEnabled, setCommunityAlarmEnabled] = useState(false);

  const toggleCommunityAlarm = () =>
    setCommunityAlarmEnabled(previousState => !previousState);

  const navigateToWhisperAlarm = () => {
    navigation.navigate('WhisperAlarm');
  };

  const navigateToDiaryAlarm = () => {
    navigation.navigate('DiaryAlarm');
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <TouchableOpacity style={styles.backButton} onPress={goback}>
        <ArrowBack width={24} height={24} fill={colors.black} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>알림 설정</Text>
          <Alarrm />
        </View>
        <View style={styles.contents}>
          <TouchableOpacity
            style={styles.option}
            onPress={navigateToDiaryAlarm}>
            <Text style={styles.optionText}>Diary 알림</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={navigateToWhisperAlarm}>
            <Text style={styles.optionText}>Whisper 알림</Text>
          </TouchableOpacity>
          <View style={styles.option}>
            <Text style={styles.optionText}>커뮤니티 알림</Text>
            <Switch
              value={communityAlarmEnabled}
              onValueChange={toggleCommunityAlarm}
              trackColor={{false: colors.lightBrown, true: colors.black}}
              thumbColor={
                communityAlarmEnabled ? colors.lightBrown : colors.white
              }
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primaryColorSky,
  },
  backButton: {
    marginTop: 40,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 30,
    color: colors.black,
    textAlign: 'left',
    marginTop: 60,
    marginBottom: 20,
  },
  contents: {
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryColorSky,
  },
  optionText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
    color: colors.black,
  },
});

export default UserAlarm;
