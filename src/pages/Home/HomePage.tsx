import React from 'react';
import { Calendar } from 'react-native-calendars';
import S from './style';
import Fonts from '../../constants/fonts';

interface CustomDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const HomePage: React.FC = () => {
  const renderDay = (date: CustomDate) => {
    return (
      <S.CalendarDayContainer>
        <S.CalendarDayText>{date.day}</S.CalendarDayText>
        <S.Sun />
        <S.EmotionTextContainer>
          <S.EmotionTextHappy>HAPPY</S.EmotionTextHappy>
          <S.EmotionValueText>25</S.EmotionValueText>
        </S.EmotionTextContainer>
        <S.EmotionTextContainer>
          <S.EmotionTextSad>SAD</S.EmotionTextSad>
          <S.EmotionValueText>25</S.EmotionValueText>
        </S.EmotionTextContainer>
      </S.CalendarDayContainer>
    );
  };

  return (
    <S.RootContainer>
      <S.DateContainer>
        <S.YearText>2024</S.YearText>
        <S.YearText>July</S.YearText>
        <S.Yinyang />
      </S.DateContainer>
      <S.CalendarContainer>
        <Calendar
          renderHeader={() => null}
          dayComponent={({ date }: { date: CustomDate }) => renderDay(date)}
          disableAllTouchEventsForDisabledDays={true}
          hideArrows={true}
          hideExtraDays={true}
          disableMonthChange={true}
          theme={{
            textDayFontFamily: Fonts.MapoFont,
            textMonthFontFamily: Fonts.MapoFont,
            textDayHeaderFontFamily: Fonts.MapoFont,
            textDayFontSize: 6,
            textMonthFontSize: 10,
            textDayHeaderFontSize: 16,
            textSectionTitleFontFamily: Fonts.MapoFont,
          }}
        />
      </S.CalendarContainer>
    </S.RootContainer>
  );
};

export default HomePage;
