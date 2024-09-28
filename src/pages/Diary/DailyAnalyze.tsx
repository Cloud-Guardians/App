// DailyAnalyze.tsx

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Back from '../../../assets/images/back.svg';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import Soil from '../../../assets/images/soil.svg';
import Fire from '../../../assets/images/fire.svg';
import Water from '../../../assets/images/water.svg';
import Tree from '../../../assets/images/tree.svg';
import Gold from '../../../assets/images/gold.svg';
import {makeApiRequest} from '../../utils/api';
import {useRecoilValue} from 'recoil';
import {tokenState} from '../../atoms/authAtom';
import {DailyAnalyzeProps} from '../../types/diary.type';

// Header 컴포넌트
const Header: React.FC<{goBack: () => void}> = ({goBack}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={goBack}>
      <Back />
    </TouchableOpacity>
  </View>
);

// 요소 이름에 따른 아이콘 반환 함수
const getElementIcon = (elementName: string) => {
  switch (elementName) {
    case '목':
      return <Tree />;
    case '화':
      return <Fire />;
    case '토':
      return <Soil />;
    case '금':
      return <Gold />;
    case '수':
      return <Water />;
    default:
      return null;
  }
};

// 원형 감정 컴포넌트
const CircleEmotion: React.FC<{
  mainElement: string;
  plusElement: string;
  otherElements: string[];
}> = ({mainElement, plusElement, otherElements}) => {
  return (
    <View style={styles.circle}>
      <View style={styles.mainEmotion}>{getElementIcon(mainElement)}</View>
      <View style={styles.EmotionOppose}>{getElementIcon(plusElement)}</View>
      {otherElements[0] && (
        <View style={styles.EmotionTwo}>
          {getElementIcon(otherElements[0])}
        </View>
      )}
      {otherElements[1] && (
        <View style={styles.EmotionThree}>
          {getElementIcon(otherElements[1])}
        </View>
      )}
      {otherElements[2] && (
        <View style={styles.EmotionFour}>
          {getElementIcon(otherElements[2])}
        </View>
      )}
    </View>
  );
};

// 감정 분석 섹션
const EmotionAnalysis: React.FC<{analysis: any}> = ({analysis}) => (
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
    <Text style={styles.description}>
      {`+${analysis.plusElement} -${analysis.minusElement}`}
    </Text>
  </View>
);

// 조화로운 하루 팁 섹션
const TipSection: React.FC<{harmonyTips: any[]}> = ({harmonyTips}) => (
  <View style={styles.tipSection}>
    <Text style={styles.title}>조화로운 하루를 보내는 팁</Text>
    <View style={styles.hashtagSection}>
      {harmonyTips.map((tip, index) => (
        <Text key={index} style={styles.hashtag}>
          {`#${tip.activityTag}`}
        </Text>
      ))}
    </View>
    <View style={styles.activitySection}>
      {harmonyTips.map((tip, index) => (
        <Text key={index} style={styles.activity}>
          {`- ${tip.activityTitle}`}
        </Text>
      ))}
    </View>
  </View>
);

// 내일의 운세 섹션
const FortuneSection: React.FC<{tomorrowFortune: any}> = ({
  tomorrowFortune,
}) => (
  <View style={styles.fortuneSection}>
    <Text style={styles.title}>내일의 운세</Text>
    <Text style={styles.fortuneText}>{tomorrowFortune.fortuneDetail}</Text>
    <Text style={styles.fortuneText}>{tomorrowFortune.advice}</Text>
  </View>
);

// DailyAnalyze 컴포넌트
const DailyAnalyze: React.FC<DailyAnalyzeProps> = ({navigation, route}) => {
  const {diaryId: personalDiaryId} = route.params;
  const [analysisData, setAnalysisData] = useState<any>(null);
  const {accessToken} = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        console.log('Access Token:', accessToken);
        console.log('Diary ID:', personalDiaryId);

        // API 요청 경로 수정: '/api' 제거
        const response = await makeApiRequest(
          'GET',
          `diaries/${personalDiaryId}/analyses`, // '/api' 제거
          undefined,
          accessToken || undefined,
        );

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        if (
          (response.status === 200 || response.status === 201) &&
          response.data.data
        ) {
          setAnalysisData(response.data.data);
        } else {
          const errorMessage =
            response.data.errorMessage || '분석 데이터를 불러올 수 없습니다.';
          Alert.alert('오류', errorMessage);
          navigation.goBack();
        }
      } catch (error: any) {
        console.error('Failed to fetch analysis data:', error);

        if (error.response) {
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
        }

        let errorMessage = '분석 데이터를 불러오는 중 오류가 발생했습니다.';
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorMessage
        ) {
          errorMessage = error.response.data.errorMessage;
        }
        Alert.alert('오류', errorMessage);
        navigation.goBack();
      }
    };

    // 개인 일기 ID가 유효한지 확인
    if (typeof personalDiaryId !== 'number') {
      Alert.alert('오류', '유효하지 않은 일기 ID입니다.');
      navigation.goBack();
      return;
    }

    fetchAnalysisData();
  }, [personalDiaryId, accessToken, navigation]);

  const goBack = () => navigation.goBack();

  if (!analysisData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // 모든 오행 요소들
  const allElements = ['목', '화', '토', '금', '수'];
  const mainElement: string = analysisData.analysis.elementName;
  const plusElement: string = analysisData.analysis.plusElement;

  // 타입 오류 해결: mainElement와 plusElement가 string인지 확인
  if (typeof mainElement !== 'string' || typeof plusElement !== 'string') {
    console.error('Invalid element names:', mainElement, plusElement);
    Alert.alert('오류', '분석 데이터가 올바르지 않습니다.');
    navigation.goBack();
    return null;
  }

  // mainElement와 plusElement를 제외한 나머지 요소들
  const otherElements = allElements.filter(
    element => element !== mainElement && element !== plusElement,
  );

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
              mainElement={mainElement}
              plusElement={plusElement}
              otherElements={otherElements}
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

// 스타일 정의
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 40,
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
    borderRadius: 75,
    borderWidth: 2,
    borderColor: colors.lightBrown,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainEmotion: {
    position: 'absolute',
    right: -28,
    top: '50%',
    transform: [{translateY: -32}],
    backgroundColor: colors.darkBrown,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  EmotionOppose: {
    position: 'absolute',
    left: -28,
    top: '50%',
    transform: [{translateY: -32}],
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  EmotionTwo: {
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{translateX: -32}],
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  EmotionThree: {
    position: 'absolute',
    bottom: -20,
    right: '25%',
    transform: [{translateX: 32}],
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  EmotionFour: {
    position: 'absolute',
    bottom: -20,
    left: '25%',
    transform: [{translateX: -32}],
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  textSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
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
    fontSize: 14, // 약간 큰 폰트 사이즈로 조정
    color: colors.black,
    textAlign: 'center',
    marginVertical: 5,
    lineHeight: 20, // 가독성을 높이기 위해 줄 높이 추가
  },
  tipSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    marginVertical: 2,
  },
  fortuneSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  fortuneText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 5,
    lineHeight: 20,
  },
});

export default DailyAnalyze;
