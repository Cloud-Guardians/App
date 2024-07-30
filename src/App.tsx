/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import colors from './constants/colors';
import fonts from './constants/fonts';
import image from './constants/image';
function App() {
  return (
    <View>
      <ImageBackground
        source={image.backgroundImage}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}>
        <Text style={{fontFamily: fonts.MapoFont, color: colors.darkBrown}}>
          안녕하세요 일단 app 정리해봤습니다.
        </Text>
      </ImageBackground>
    </View>
  );
}

export default App;
