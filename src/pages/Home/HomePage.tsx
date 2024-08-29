import React, { useState } from 'react';
import { Text, PanResponder, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import S from './style';
import Fonts from '../../constants/fonts';
import { Strings } from '../../constants/strings';
import moment from 'moment';
import WhisperPage from './Whisper/Whisper';

interface CustomDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const HomePage: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<'Diary' | 'Whisper'>('Diary');
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const renderDay = (date: CustomDate) => {
    return (
      <S.CalendarDayContainer>
        <S.CalendarDayText>{date.day}</S.CalendarDayText>
        <S.EmptyDay />
      </S.CalendarDayContainer>
    );
  };

  const onMonthChange = (date: CustomDate) => {
    setCurrentDate(moment(date.dateString).format('YYYY-MM-DD'));
  };

  const goLastMonth = () => {
    const newDate = moment(currentDate).subtract(1, 'month').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  const goNextMonth = () => {
    const newDate = moment(currentDate).add(1, 'month').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        goLastMonth();
      } else if (gestureState.dx < -50) {
        goNextMonth();
      }
    }
  });

  return (
    <S.RootContainer>
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => setSelectedScreen('Diary')}>
          <S.TypeText>
            {Strings.diaryType}
          </S.TypeText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedScreen('Whisper')}>
          <S.TypeText>
            {Strings.whisperType}
          </S.TypeText>
        </TouchableOpacity>
      </S.HeaderContainer>

      {selectedScreen === 'Diary' && (
        <>
          <S.DateContainer>
            <S.YearText>{moment(currentDate).format('YYYY')}</S.YearText>
            <S.YearText>{moment(currentDate).format('MMMM')}</S.YearText>
            <S.Yinyang />
          </S.DateContainer>
          <View {...panResponder.panHandlers}>
            <S.CalendarContainer>
              <Calendar
                key={currentDate} 
                current={currentDate}
                onMonthChange={onMonthChange}
                dayComponent={({ date }: { date: CustomDate }) => renderDay(date)}
                disableAllTouchEventsForDisabledDays={true}
                hideExtraDays={true}
                renderHeader={() => null}
                renderArrow={() => null}
                theme={{
                  textDayFontFamily: Fonts.MapoFont,
                  textMonthFontFamily: Fonts.MapoFont,
                  textDayHeaderFontFamily: Fonts.MapoFont,
                  textDayFontSize: 6,
                  textMonthFontSize: 10,
                  textDayHeaderFontSize: 16,
                  textSectionTitleFontFamily: Fonts.MapoFont,
                  textSectionTitleColor: 'black',
                }}
              />
            </S.CalendarContainer>
          </View>
        </>
      )}

      {selectedScreen === 'Whisper' && (
        <WhisperPage/>
      )}
    </S.RootContainer>
  );
};

export default HomePage;
