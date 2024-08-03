import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const CustomBtn = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container_PRIMARY: {
    backgroundColor: colors.secondaryColorNavy,
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_NONESTYLE: {},
  text: {
    color: colors.white,
    fontFamily: fonts.MapoFont,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text_NONESTYLE: {
    color: colors.black,
  },
});

export default CustomBtn;
