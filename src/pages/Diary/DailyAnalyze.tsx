import React, {useEffect, useState} from 'react';
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
import {makeApiRequest} from '../../utils/api';

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

const getElementIcon = (elementName: string) => {
  switch (elementName) {
    case '목':
      return Tree;
    case '화':
      return Fire;
    case '토':
      return Soil;
    case '금':
      return Gold;
    case '수':
      return Water;
    default:
      return null;
  }
};

const getRandomElements = (mainElement: string, opposeElement: string) => {
  const allElements = ['토', '화', '수', '목', '금'];
  const remainingElements = allElements.filter(
    element => element !== mainElement && element !== opposeElement,
  );

  // 요소를 섞은 후 3개만 선택
  for (let i = remainingElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingElements[i], remainingElements[j]] = [
      remainingElements[j],
      remainingElements[i],
    ];
  }

  return remainingElements.slice(0, 3);
};

const CircleEmotion = ({
  mainElement,
  opposeElement,
}: {
  mainElement: string;
  opposeElement: string;
}) => {
  const [elementTwo, elementThree, elementFour] = getRandomElements(
    mainElement,
    opposeElement,
  );

  return (
    <View style={styles.circle}>
      <View style={styles.mainEmotion}>
        {getElementIcon(mainElement) && getElementIcon(mainElement)!({})}
      </View>
      <View style={styles.EmotionOppose}>
        {getElementIcon(opposeElement) && getElementIcon(opposeElement)!({})}
      </View>
      <View style={styles.EmotionTwo}>
        {getElementIcon(elementTwo) && getElementIcon(elementTwo)!({})}
      </View>
      <View style={styles.EmotionThree}>
        {getElementIcon(elementThree) && getElementIcon(elementThree)!({})}
      </View>
      <View style={styles.EmotionFour}>
        {getElementIcon(elementFour) && getElementIcon(elementFour)!({})}
      </View>
    </View>
  );
};

const EmotionAnalysis = ({analysis}: any) => (
  <View style={styles.textSection}>
    <Text
      style={
        styles.descriptionText
      }>{`"${analysis.elementName}" 기운의 특징`}</Text>
    <Text style={styles.description}>
      {analysis.characters && analysis.characters.join('\n')}
    </Text>
    <Text style={styles.descriptionText}>
      {`"${analysis.elementName}" 기운이 많은 날 필요한 기운은?`}
    </Text>
    <Text
      style={
        styles.description
      }>{`+${analysis.plusElement} -${analysis.minusElement}`}</Text>
  </View>
);

const TipSection = ({harmonyTips}: any) => (
  <View style={styles.tipSection}>
    <Text style={styles.title}>조화로운 하루를 보내는 팁</Text>
    <View style={styles.hashtagSection}>
      {harmonyTips.map((tip: any, index: number) => (
        <Text key={index} style={styles.hashtag}>{`#${tip.activityTag}`}</Text>
      ))}
    </View>
    <View style={styles.activitySection}>
      {harmonyTips.map((tip: any, index: number) => (
        <Text
          key={index}
          style={styles.activity}>{`- ${tip.activityTitle}`}</Text>
      ))}
    </View>
  </View>
);

const FortuneSection = ({tomorrowFortune}: any) => (
  <View style={styles.fortuneSection}>
    <Text style={styles.title}>내일의 운세</Text>
    <Text style={styles.fortuneText}>{tomorrowFortune.fortuneDetail}</Text>
    <Text style={styles.fortuneText}>{tomorrowFortune.advice}</Text>
  </View>
);

const DailyAnalyze = ({navigation, route}: dailyProps) => {
  const {diaryId: personalDiaryId} = route.params || {}; // personalDiaryId를 route에서 가져옴
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await makeApiRequest(
          'GET',
          `/diaries/${personalDiaryId}/analyses`,
        );
        setAnalysisData(response.data);
      } catch (error) {
        console.error('Failed to fetch analysis data:', error);
      }
    };

    fetchAnalysisData();
  }, [personalDiaryId]);

  const goBack = () => navigation.goBack();

  if (!analysisData) {
    return <Text>Loading...</Text>;
  }

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
            <CircleEmotion
              mainElement={analysisData.analysis.elementName}
              opposeElement={analysisData.analysis.plusElement}
            />
          </View>
          <EmotionAnalysis analysis={analysisData.analysis} />
        </View>
        <TipSection harmonyTips={analysisData.harmonyTips} />
        <FortuneSection tomorrowFortune={analysisData.tomorrowFortune} />
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
