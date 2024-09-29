import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

const {width} = Dimensions.get('window');
const pinLength = 4;

const LockPage = ({onPinSubmit}) => {
  const [code, setCode] = useState<number[]>([]);

  const handlePinPress = (value: number | 'del') => {
    if (value === 'del') {
      setCode(prev => prev.slice(0, -1)); // 마지막 입력 삭제
    } else if (code.length < pinLength) {
      setCode(prev => [...prev, value]); // 숫자 입력 추가
    }
  };

  const handleUnlockAttempt = () => {
    if (code.length === pinLength) {
      const pin = code.join('');
      onPinSubmit(pin); // PIN 검증 함수 호출
    } else {
      Alert.alert('오류', '4자리 PIN을 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>암호를 입력해 주세요</Text>

      {/* PIN 입력 상태 표시 */}
      <View style={styles.pinContainer}>
        {[...Array(pinLength)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              {
                backgroundColor: code[index] ? colors.black : colors.white,
              },
            ]}
          />
        ))}
      </View>

      {/* 숫자 패드 */}
      <View style={styles.padContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.padButton}
            onPress={() => handlePinPress(num)}>
            <Text style={styles.padText}>{num}</Text>
          </TouchableOpacity>
        ))}
        {/* 빈 공간을 위한 self-closing 태그 */}
        <View style={styles.padButton} />
        <TouchableOpacity
          style={styles.padButton}
          onPress={() => handlePinPress(0)}>
          <Text style={styles.padText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.padButton}
          onPress={() => handlePinPress('del')}>
          <Text style={styles.padText}>⌫</Text> {/* 삭제 버튼 */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleUnlockAttempt}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.MapoFont,
    marginBottom: 30,
    color: colors.black,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.5,
    marginBottom: 40,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  padContainer: {
    width: width * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  padButton: {
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.secondaryColorNavy,
    borderRadius: width * 0.11,
  },
  padText: {
    fontSize: 32,
    color: colors.black,
    fontFamily: Fonts.MapoFont,
  },
  confirmButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    backgroundColor: colors.primaryColorSky,
    borderRadius: 25,
  },
  confirmButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: Fonts.MapoFont,
  },
});

export default LockPage;
