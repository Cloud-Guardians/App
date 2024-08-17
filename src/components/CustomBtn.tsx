import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

type PROPS = {
  onPress: () => void;
  text?: string | 'PRIMARY' | 'SECONDARY' | 'NONESTYLE' | 'WHITE' | 'SMALL';
  type?: 'PRIMARY' | 'SECONDARY' | 'NONESTYLE' | 'WHITE' | 'SMALL';
};

const CustomBtn = ({onPress, text = 'PRIMARY', type = 'PRIMARY'}: PROPS) => {
  return (
    <Pressable onPress={onPress} style={styles[`container_${type}`]}>
      <Text style={styles[`text_${type}`]}>{text}</Text>
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
    borderWidth: 1,
  },

  container_SECONDARY: {
    backgroundColor: colors.primaryColorSky,
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_NONESTYLE: {},
  container_WHITE: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  container_SMALL: {
    backgroundColor: colors.primaryColorSky,
    width: 40,
    height: 30,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text_PRIMARY: {
    fontFamily: Fonts.MapoFont,
    letterSpacing: 3,
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  text_SECONDARY: {
    fontFamily: Fonts.MapoFont,
    letterSpacing: 3,
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  text_NONESTYLE: {
    color: colors.black,
    fontFamily: Fonts.MapoFont,
    letterSpacing: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  text_WHITE: {
    color: colors.black,
    fontFamily: Fonts.MapoFont,
    letterSpacing: 3,
    fontSize: 18,
    textAlign: 'center',
  },
  text_SMALL: {
    color: colors.white,
    fontFamily: Fonts.MapoFont,
    letterSpacing: 3,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomBtn;
