import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {tokenState, emailState} from '../../atoms/authAtom';
import Config from 'react-native-config';
import ArrowBack from '../../../assets/images/back.svg';

const {width} = Dimensions.get('window');
const pinLength = 4;

const UserLockScreen = () => {
  const navigation = useNavigation();
  const {accessToken, refreshToken} = useRecoilValue(tokenState);
  const email = useRecoilValue(emailState);
  const [code, setCode] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false); // 암호가 이미 등록된 경우 모달 표시 상태
  const setTokens = useSetRecoilState(tokenState);

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      const responseJson = await response.json();
      if (response.status === 200 && responseJson.data?.accessToken) {
        const newAccessToken = responseJson.data.accessToken;
        setTokens(prev => ({
          ...prev,
          accessToken: newAccessToken,
        }));
        return newAccessToken;
      } else {
        Alert.alert(
          '오류',
          responseJson.errorMessage || '토큰 갱신에 실패했습니다.',
        );
        return null;
      }
    } catch (error) {
      Alert.alert('오류', '토큰 갱신 중 문제가 발생했습니다.');
      return null;
    }
  };

  // 패스코드 등록 API 호출 (POST 요청)
  const registerPassword = async (pinCode: string) => {
    try {
      const requestUrl = `${Config.API_BASE_URL}/api/users/user-lock`;

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({passcode: pinCode}), // PIN 코드를 바디에 넣어서 전달
      });

      const responseJson = await response.json();
      if (response.status === 200 && responseJson.data) {
        Alert.alert('성공', '암호가 성공적으로 등록되었습니다.');
        navigation.goBack();
      } else if (
        response.status === 401 &&
        responseJson.errorMessage === '잘못된 접근입니다.'
      ) {
        // 401 에러가 발생하면 이미 암호가 등록된 것으로 간주하고 모달 표시
        setModalVisible(true);
      } else {
        Alert.alert(
          '오류',
          responseJson.errorMessage || '암호 등록에 실패했습니다.',
        );
      }
    } catch (error) {
      Alert.alert('오류', '암호 등록 중 문제가 발생했습니다.');
    }
  };

  // PIN 코드 입력 완료 시 호출되는 함수
  const handlePinCompletion = async (pin: string) => {
    registerPassword(pin); // 암호 등록 로직 호출
  };

  useEffect(() => {
    if (code.length === pinLength) {
      const enteredCode = code.join('');
      handlePinCompletion(enteredCode);
    }
  }, [code]);

  const handlePinPress = (item: number | 'del') => {
    if (item === 'del') {
      setCode(prev => prev.slice(0, -1));
    } else if (typeof item === 'number' && code.length < pinLength) {
      setCode(prev => [...prev, item]);
    }
  };

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.contents}>
          <Text style={styles.title}>암호를 설정해 주세요</Text>
          <View style={styles.pinContainer}>
            {[...Array(pinLength).keys()].map(index => {
              const isSelected = !!code[index];
              return (
                <View
                  key={index}
                  style={[
                    styles.pinDot,
                    {
                      backgroundColor: isSelected ? colors.black : colors.white,
                    },
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.numberPad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map(item => (
              <TouchableOpacity
                key={item.toString()}
                style={styles.numberPadButton}
                onPress={() => handlePinPress(item)}>
                <Text style={styles.numberPadText}>
                  {item === 'del' ? '←' : item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* 암호가 이미 등록된 경우 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              이미 암호가 등록되어 있습니다.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 24,
    marginBottom: 20,
    color: colors.black,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  pinDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.darkBrown,
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'center',
    gap: 10,
  },
  numberPadButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColorSky,
    borderRadius: 30,
    margin: 10,
  },
  numberPadText: {
    fontSize: 24,
    color: colors.black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
    marginBottom: 20,
    color: colors.black,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: colors.primaryColorSky,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
});

export default UserLockScreen;
