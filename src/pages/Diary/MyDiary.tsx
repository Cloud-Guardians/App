import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Images from '../../constants/images';
import Send from '../../../assets/images/send.svg';
import Clip from '../../../assets/images/clip.svg';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import DiaryLoading from './DiaryLoading';
import {dailyProps} from '../../types/diary.type';
import CustomBtn from '../../components/CustomBtn';
import YesNoDialog from '../../components/YesNoDialog/YesNoDialog';

const dummy = {
  title: '오늘의 모험',
  image: 'https://cdn.pixabay.com/photo/2017/04/27/11/21/dog-2265233_1280.jpg',
  data: '오늘은 오랜만에 친구들과 함께 산책을 다녀왔다. 날씨가 맑고 시원해서 기분이 좋았다. 오랫동안 만나지 못한 친구들과 이야기를 나누며 웃고 떠들었다. 그러고 나서 카페에 가서 맛있는 디저트를 먹었다. 정말 즐거운 하루였다. 집에 돌아와서 따뜻한 차를 마시며 책을 읽었는데, 하루를 마무리하기에 딱 좋았다. 앞으로도 이런 소소한 행복을 자주 느끼고 싶다.',
};

const MyDiary = ({navigation}: dailyProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const gotoAnalyz = () => {
    navigation.navigate('DailyAnalyze');
  };
  const gotoCommunity = () => {};
  const goBack = () => navigation.goBack();

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <DiaryLoading />
      ) : (
        <ImageBackground
          style={{flex: 1}}
          resizeMode={'cover'}
          source={Images.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <CustomBtn onPress={goBack} text="수정" type="SMALL" />
              <CustomBtn onPress={() => {}} text="삭제" type="SMALL" />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Send />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <YesNoDialog
              visible={modalVisible}
              message="커뮤니티에 게시하시겠습니까?"
              yesText="네"
              noText="아니요"
              yesCallback={() => gotoCommunity()}
              noCallback={() => setModalVisible(false)}
            />
            <Text style={styles.title}>
              {year}년 {month}월 {day}일
            </Text>
            <Text style={styles.time}>
              {hours}시 {minutes}분
            </Text>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              <View style={styles.contents}>
                <Image source={{uri: dummy.image}} style={styles.image} />
                <View style={styles.clip}>
                  <Clip />
                </View>
                <Text style={styles.diaryTitle}>{dummy.title}</Text>
                <Text style={styles.diaryData}>{dummy.data}</Text>
              </View>
              <CustomBtn
                text="분석보기"
                onPress={gotoAnalyz}
                type="SECONDARY"
                style={styles.analyzeButton}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 10,
  },
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    width: '100%',
    padding: 15,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  clip: {
    position: 'absolute',
    top: -14,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
    color: colors.black,
    marginBottom: 8,
  },
  time: {
    fontFamily: Fonts.MapoFont,
    fontSize: 12,
    color: colors.gray,
  },
  diaryTitle: {
    fontFamily: Fonts.MapoFont,
    fontSize: 18,
    color: colors.black,
    marginBottom: 8,
  },
  diaryData: {
    fontFamily: Fonts.MapoFont,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
  },
  analyzeButton: {
    width: '80%',
    marginTop: 20,
  },
});

export default MyDiary;
