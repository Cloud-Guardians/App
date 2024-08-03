import {Text, View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const CustomInput = ({label, value, setValue, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
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
  input: {},
});

export default CustomInput;
