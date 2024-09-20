import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Images from '../../constants/images';
import Send from '../../../assets/images/send.svg';
import Clip from '../../../assets/images/clip.svg';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import DiaryLoading from './DiaryLoading';
import {dailyProps} from '../../types/diary.type';
import CustomBtn from '../../components/CustomBtn';
import YesNoDialog from '../../components/YesNoDialog/YesNoDialog';
import {makeApiRequest} from '../../utils/api';

const MyDiary = ({route, navigation}: dailyProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [diaryData, setDiaryData] = useState<any>(null);

  const diaryId = route.params?.diaryId;

  const fetchDiaryData = useCallback(async () => {
      console.log("fetch Diary Data Start");
    if (diaryId !== undefined) {
      try {
          console.log("diary:"+diaryId);
         const response = await makeApiRequest('GET', `/diaries/${diaryId}`);
         console.log(JSON.stringify(response));
 setDiaryData(response);
      } catch (error) {
        console.error('Failed to fetch diary:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('diaryId is undefined');
      setIsLoading(false);
    }
  }, [diaryId]);

  useEffect(() => {
    fetchDiaryData();
  }, [fetchDiaryData]);

  const handleUpdate = useCallback(
    async (updatedData: any) => {
      if (diaryId !== undefined) {
        try {
          const response = await makeApiRequest(
            'PUT',
            `/diaries/${diaryId}`,
            updatedData,
          );
          setDiaryData(response.data);
          Alert.alert('일기 수정', '일기가 성공적으로 수정되었습니다.');
        } catch (error) {
          console.error('Failed to update diary:', error);
          Alert.alert('수정 실패', '일기 수정에 실패했습니다.');
        }
      } else {
        console.error('diaryId is undefined');
      }
    },
    [diaryId],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.updatedDiary) {
        handleUpdate(route.params.updatedDiary);
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.updatedDiary, handleUpdate]);

  const handleEdit = () => {
    if (diaryData) {
      navigation.navigate('DailyDiary', {diaryData});
    }
  };

  const handleDelete = async () => {
    if (diaryId !== undefined) {
      try {
        await makeApiRequest('DELETE', `/diaries/${diaryId}`);
        Alert.alert('일기 삭제', '일기가 성공적으로 삭제되었습니다.', [
          {text: '확인', onPress: () => navigation.goBack()},
        ]);
      } catch (error) {
        console.error('Failed to delete diary:', error);
        Alert.alert('삭제 실패', '일기 삭제에 실패했습니다.');
      }
    } else {
      console.error('diaryId is undefined');
    }
  };

  const goBack = () => navigation.goBack();

  if (isLoading) {
    return <DiaryLoading />;
  }

//   if (!diaryData) {
//     return (
//       <View style={styles.container}>
//         <Text>일기 데이터를 불러올 수 없습니다.</Text>
//       </View>
//     );
//   }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode={'cover'}
        source={Images.backgroundImage}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <CustomBtn onPress={handleEdit} text="수정" type="SMALL" />
            <CustomBtn onPress={handleDelete} text="삭제" type="SMALL" />
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
            yesCallback={() => {}}
            noCallback={() => setModalVisible(false)}
          />
          <Text style={styles.title}>
            {new Date(diaryData.date).getFullYear()}년{' '}
            {new Date(diaryData.date).getMonth() + 1}월{' '}
            {new Date(diaryData.date).getDate()}일
          </Text>
          <Text style={styles.time}>
            {new Date(diaryData.date).getHours()}시{' '}
            {new Date(diaryData.date).getMinutes()}분
          </Text>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View style={styles.contents}>
              {diaryData.photoUrl && (
                <Image
                  source={{uri: diaryData.photoUrl}}
                  style={styles.image}
                />
              )}
              <View style={styles.clip}>
                <Clip />
              </View>
              <Text style={styles.diaryTitle}>{diaryData.title}</Text>
              <Text style={styles.diaryData}>{diaryData.content}</Text>
            </View>
            <CustomBtn text="분석보기" onPress={() => {}} type="SECONDARY" />
          </ScrollView>
        </View>
      </ImageBackground>
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
    color: colors.black,
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
