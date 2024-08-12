import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const dialPadSize = width * 0.2;
const dialFontSize = dialPadSize * 0.4;
const _gap = 14;
const DialPad = ({
  onPress,
}: {
  onPress: (value: (typeof dialPad)[number]) => void;
}) => {
  return (
    <View>
      <FlatList
        data={dialPad}
        style={{flexGrow: 0}}
        columnWrapperStyle={{gap: _gap}}
        contentContainerStyle={{gap: _gap}}
        scrollEnabled={false}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPress(item);
              }}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: dialPadSize,
                  height: dialPadSize,
                  borderRadius: dialPadSize,
                  borderWidth: typeof item === 'number' ? 1 : 0,
                  borderColor: colors.black,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: dialFontSize}}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DialPad;
