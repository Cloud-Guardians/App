import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ArrowBar from '../../assets/images/dropdown.svg';
import Fonts from '../constants/fonts';

interface DateTimePickerProps {
  defaultValue?: Date;
  onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  defaultValue,
  onDateChange,
}) => {
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  return (
    <View style={styles.mainTitle}>
      <Text style={styles.title}>{`${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <ArrowBar />
      </TouchableOpacity>
      {showPicker && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.MapoFont,
    fontSize: 16,
    textAlign: 'right',
  },
  mainTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 12,
    letterSpacing: 5,
  },
});

export default DateTimePicker;
