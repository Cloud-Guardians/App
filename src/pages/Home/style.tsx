import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';
import Images from '../../constants/images';

const S = {
  RootContainer: styled.SafeAreaView`
    background-color: #fff;
    flex: 1;
  `,
  HeaderContainer: styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: ${getSize(10)}px;
  `,
  TypeText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(17)}px;
    margin-right: ${getSize(15)}px;
  `,
  DateContainer: styled.View`
    width: 100%;
    height: ${getSize(111)}px;
    align-items: center; 
  `,
  YearText: styled.Text`
    font-size: ${getSize(20)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-bottom: ${getSize(12)}px;
  `,
  Yinyang: styled(Images.Yinyang)`
    margin-bottom: ${getSize(112)}px;
  `,
  Sun: styled(Images.Sun)`
  `,
  WhisperContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  CalendarContainer: styled.View`
    flex: 1;
    width: 100%;
    padding: ${getSize(10)}px;
    margin-top: ${getSize(22)}px;
  `,
  CalendarDayContainer: styled.View`
    align-items: center;
  `,
  CalendarHeaderText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    color: red;
    font-size: ${getSize(16)}px;
  `,
  CalendarDayText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-bottom: ${getSize(5)}px;
  `,
  EmptyDay: styled.View`
    width: ${getSize(35)}px;
    height: ${getSize(35)}px;
    background-color: lightgray;
    border-radius: ${getSize(30)}px;
  `,
};

export default S;
