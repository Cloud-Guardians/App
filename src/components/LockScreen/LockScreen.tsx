import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DialPad from './DialPad';
import ArrowBack from '../../../assets/images/back.svg';
const LockScreen = () => {
  const navigation = useNavigation();
  const goback = () => {
    navigation.goBack();
  };

  const pinLength = 4;
  const [code, setCode] = useState<number[]>([]);
  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <TouchableOpacity onPress={goback}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.contents}>
          <Text style={styles.title}>암호를 입력해 주세요.</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              marginBottom: 40,
              height: 30,
              alignItems: 'flex-end',
            }}>
            {[...Array(pinLength).keys()].map(index => {
              const isSelected = !!code[index];
              return (
                <View
                  key={index}
                  style={{
                    width: 22,
                    height: isSelected ? 22 : 2,
                    borderRadius: 22,
                    backgroundColor: colors.black,
                  }}></View>
              );
            })}
          </View>
          <DialPad
            onPress={item => {
              if (item === 'del') {
                setCode(prev => prev.slice(0, prev.length - 1));
              } else if (typeof item === 'number') {
                setCode(prev => [...prev, item]);
              }
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 24,
    marginVertical: 10,
    color: colors.black,
  },
  contents: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    width: '90%',
    padding: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default LockScreen;
