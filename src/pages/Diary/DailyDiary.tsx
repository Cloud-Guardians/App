import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Images from '../../constants/images';
import ArrowBack from '../../../assets/images/back.svg';
import CustomBtn from '../../components/CustomBtn';
import Fonts from '../../constants/fonts';
import {useRecoilValue} from 'recoil';
import {emotionState} from '../../atoms/diaryAtom';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  Asset,
} from 'react-native-image-picker';
import {DailysProps} from '../../types/diary.type';
import {tokenState} from '../../atoms/authAtom';
import Config from 'react-native-config';
import {makeApiRequest} from '../../utils/api';

const DailyDiary = ({route, navigation}: DailysProps) => {
  const {diaryId} = route.params ?? {diaryId: undefined};
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageAsset, setImageAsset] = useState<Asset | null>(null);
  const [titleError, setTitleError] = useState('');
  const [isEditMode, setIsEditMode] = useState<boolean>(!!diaryId);

  const emotion = useRecoilValue(emotionState);
  const {accessToken} = useRecoilValue(tokenState);

  useEffect(() => {
    const parentNavigation = navigation.getParent();
    parentNavigation?.setOptions({tabBarVisible: false});

    return () => {
      parentNavigation?.setOptions({tabBarVisible: true});
    };
  }, [navigation]);

  useEffect(() => {
    if (isEditMode && diaryId) {
      fetchDiaryData(); // 기존 일기 데이터를 불러옴 (수정 모드)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaryId]);

  const fetchDiaryData = async () => {
    try {
      const response = await makeApiRequest(
        'GET',
        `/diaries/${diaryId}`,
        undefined,
        'application/json',
        accessToken,
      );

      if (response.status === 200) {
        const data = response.data.data;
        setTitle(data.title);
        setText(data.content);
        if (data.photoUrl) {
          setImageAsset({uri: data.photoUrl});
        }
      } else {
        throw new Error('일기 데이터를 불러오지 못했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '일기 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImageAsset(asset);
      }
    });
  };

  const validateTitle = (text: string) => {
    if (text.length > 50) {
      setTitleError('제목은 50글자 이내여야 합니다.');
    } else {
      setTitleError('');
    }
    setTitle(text);
  };

  const saveDiary = async () => {
    if (titleError) {
      Alert.alert('입력 오류', titleError);
      return;
    }
    if (!title.trim()) {
      Alert.alert('입력 오류', '제목을 입력해주세요.');
      return;
    }
    if (!text.trim()) {
      Alert.alert('입력 오류', '내용을 입력해주세요.');
      return;
    }

    try {
      navigation.navigate('DiaryLoading');
      const formData = new FormData();

      // 'request' 필드를 문자열로 추가
      const requestPayload = JSON.stringify({title, content: text});
      formData.append('request', requestPayload);

      // 이미지 파일이 있는 경우 추가
      if (imageAsset && imageAsset.uri) {
        const fileName = imageAsset.fileName || 'photo.jpg';
        const fileType = imageAsset.type || 'image/jpeg';
        formData.append('file', {
          name: fileName,
          type: fileType,
          uri: imageAsset.uri,
        } as any);
      }

      const tokenWithoutBearer = accessToken?.replace('Bearer ', '');

      let response;
      if (isEditMode) {
        // PUT 요청: 기존 일기 수정
        response = await fetch(
          `${Config.API_BASE_URL}/api/diaries/${diaryId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${tokenWithoutBearer}`,
            },
            body: formData,
          },
        );
      } else {
        // POST 요청: 새로운 일기 작성
        response = await fetch(`${Config.API_BASE_URL}/api/diaries`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
          body: formData,
        });
      }

      if (response.ok) {
        const responseData = await response.json();

        // 저장 후 MyDiary로 이동
        navigation.navigate('MyDiary', {
          diaryId: responseData.data.personalDiaryId,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || '알 수 없는 오류');
      }
    } catch (error: any) {
      Alert.alert(
        '저장 실패',
        error.message || '요청을 처리하는 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <ArrowBack width={24} height={24} />
      </TouchableOpacity>
      <View style={styles.container}>
        {imageAsset && imageAsset.uri ? (
          <Image source={{uri: imageAsset.uri}} style={styles.image} />
        ) : (
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              {isEditMode ? '사진 수정하기' : '사진 선택하기'}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={[styles.textTitle, titleError ? styles.errorBorder : null]}
          value={title}
          onChangeText={validateTitle}
          maxLength={50}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

        <Text style={styles.label}>내용</Text>
        <TextInput
          style={styles.textInput}
          placeholder="오늘의 일기를 작성하세요..."
          multiline
          value={text}
          onChangeText={setText}
        />

        <CustomBtn
          text={isEditMode ? '일기 수정하기' : '일기 등록하기'}
          type="SECONDARY"
          onPress={saveDiary}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    marginBottom: 8,
  },
  textTitle: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: Fonts.MapoFont,
  },
  textInput: {
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
  image: {
    width: '100%',
    height: 400,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  imagePlaceholderText: {
    color: '#777',
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
});

export default DailyDiary;
