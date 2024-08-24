import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Images from '../../constants/images';
import ArrowBack from '../../../assets/images/back.svg';
import CustomBtn from '../../components/CustomBtn';
import Fonts from '../../constants/fonts';
import {useRecoilValue} from 'recoil';
import {emotionState} from '../../atoms/diaryAtom';
import {makeApiRequest} from '../../utils/api';
import {launchImageLibrary} from 'react-native-image-picker';
import {dailyProps} from '../../types/diary.type';
import {jwtTokenState} from '../../atoms/authAtom';

const DailyDiary = ({navigation}: dailyProps) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [titleError, setTitleError] = useState('');

  const emotion = useRecoilValue(emotionState);
  const token = useRecoilValue(jwtTokenState);

  useEffect(() => {
    const parentNavigation = navigation.getParent();
    parentNavigation?.setOptions({tabBarVisible: false});

    return () => {
      parentNavigation?.setOptions({tabBarVisible: true});
    };
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      quality: 1 as const,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
        } else {
          setImageUri(null);
        }
      }
    });
  };

  const validateTitle = (text: string) => {
    if (text.length > 20) {
      setTitleError('제목은 20글자 이내여야 합니다.');
    } else {
      setTitleError('');
    }
    setTitle(text);
  };

  const saveDiary = async () => {
    if (titleError) {
      return;
    }

    const diaryData = {
      title,
      content: text,
      photoUrl: imageUri,
      ...emotion,
    };

    try {
      const response = await makeApiRequest(
        'POST',
        '/diaries',
        diaryData,
        token ?? undefined,
      );

      if (response.statusCode === 201) {
        console.log('Diary saved successfully:', response.data);
        navigation.navigate('MyDiary', {
          diaryId: response.data.personalDiaryId,
        });
      } else {
        console.error('Failed to save diary:', response.errorMessage);
        Alert.alert('저장 실패', '일기 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving diary:', error);
      Alert.alert('저장 실패', '일기 저장 중 오류가 발생했습니다.');
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
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>사진 선택하기</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={[styles.textTitle, titleError ? styles.errorBorder : null]}
          value={title}
          onChangeText={validateTitle}
          maxLength={20}
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

        <CustomBtn text="일기등록" type="SECONDARY" onPress={saveDiary} />
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
