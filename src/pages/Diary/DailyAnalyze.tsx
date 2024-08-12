import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Back from '../../../assets/images/back.svg';
import {dailyProps} from '../../types/diary.type';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import Soil from '../../../assets/images/soil.svg';
import Fire from '../../../assets/images/fire.svg';
import Water from '../../../assets/images/water.svg';
import Tree from '../../../assets/images/tree.svg';
import Gold from '../../../assets/images/gold.svg';
import Star from '../../../assets/images/star.svg';
import SoilBig from '../../../assets/images/soilbig.svg';

interface HeaderProps {
  goBack: () => void;
}

const Header: React.FC<HeaderProps> = ({goBack}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={goBack}>
      <Back />
    </TouchableOpacity>
  </View>
);

const CircleEmotion = () => (
  <View style={styles.circle}>
    <View style={styles.mainEmotion}>
      <Soil />
    </View>
    <View style={styles.EmotionOppose}>
      <Tree />
    </View>
    <View style={styles.EmotionTwo}>
      <Fire />
    </View>
    <View style={styles.EmotionThree}>
      <Water />
    </View>
    <View style={styles.EmotionFour}>
      <Gold />
    </View>
    <View style={styles.EmotionStar}>
      <Star />
    </View>
  </View>
);

const EmotionAnalysis = () => (
  <View style={styles.textSection}>
    <Text style={styles.descriptionText}>"화" 기운이 많은 날의 특징</Text>
    <Text style={styles.description}>
      - 열정적이거나 활발하지만, 때로는 충동적인 하루를 보냄
    </Text>
    <Text style={styles.descriptionText}>
      "화" 기운이 많은 날 필요한 기운은?
    </Text>
    <Text style={styles.description}>- 반대기운필요</Text>
  </View>
);

const TipSection = () => (
  <View style={styles.tipSection}>
    <Text style={styles.title}>조화로운 하루를 보내는 팁</Text>
    <View style={styles.hashtagSection}>
      <Text style={styles.hashtag}>#활동적</Text>
      <Text style={styles.hashtag}>#차분한</Text>
      <Text style={styles.hashtag}>#열정적</Text>
      <Text style={styles.hashtag}>#여유</Text>
    </View>
    <View style={styles.activitySection}>
      <Text style={styles.activity}>- 요가</Text>
      <Text style={styles.activity}>- 등산</Text>
      <Text style={styles.activity}>- 독서</Text>
      <Text style={styles.activity}>- 명상</Text>
    </View>
  </View>
);

const FortuneSection = () => (
  <View style={styles.fortuneSection}>
    <Text style={styles.title}>내일의 운세</Text>
    <Text style={styles.fortuneText}>
      내일은 새로운 기회가 찾아올 것입니다. 중요한 결정을 내릴 때는 신중하게
      생각하고, 긍정적인 마음으로 하루를 보내세요.
    </Text>
  </View>
);

const DailyAnalyze = ({navigation}: dailyProps) => {
  const goBack = () => navigation.goBack();

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <Header goBack={goBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.dailyEmotion}>
          <Text style={styles.title}>데일리 감정 분석</Text>
          <View style={styles.emotionSection}>
            <CircleEmotion />
            <View style={styles.myEmotion}>
              <SoilBig />
            </View>
          </View>
          <EmotionAnalysis />
        </View>
        <TipSection />
        <FortuneSection />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  dailyEmotion: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  emotionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.lightBrown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainEmotion: {
    position: 'absolute',
    right: -32,
    top: '50%',
    marginTop: -32,
    backgroundColor: colors.darkBrown,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  EmotionOppose: {
    position: 'absolute',
    left: -32,
    top: '50%',
    marginTop: -32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  EmotionTwo: {
    position: 'absolute',
    top: -32,
    left: '50%',
    marginLeft: -32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  EmotionThree: {
    position: 'absolute',
    bottom: -32,
    right: 4,
    marginLeft: 10,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  EmotionFour: {
    position: 'absolute',
    bottom: -32,
    left: 4,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  EmotionStar: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  myEmotion: {
    maxWidth: 150,
    maxHeight: 150,
    marginLeft: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
    color: colors.black,
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 15,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 5,
  },
  description: {
    fontFamily: Fonts.MapoFont,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 5,
  },
  tipSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  hashtagSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  hashtag: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.primaryColorSky,
    marginHorizontal: 5,
  },
  activitySection: {
    alignItems: 'center',
  },
  activity: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  fortuneSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    width: '100%',
  },
  fortuneText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
});

export default DailyAnalyze;
