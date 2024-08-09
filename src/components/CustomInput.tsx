import {Text, View, TextInput, StyleSheet} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import colors from '../constants/colors';
import Fonts from '../constants/fonts';

type PROPS = {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  secureTextEntry: boolean | undefined;
};

const CustomInput = ({label, value, setValue, secureTextEntry}: PROPS) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBrown,
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  label: {
    color: colors.black,
    fontFamily: Fonts.MapoFont,
    fontSize: 15,
  },
});

export default CustomInput;
