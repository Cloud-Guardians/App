import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';
import Images from '../../constants/images';

const S = {
  RootContainer: styled.SafeAreaView`
    background-color: #fff;
    flex: 1;
  `,
  DateContainer: styled.View`
    width: 100%;
    height: ${getSize(111)}px;
    align-items: center; 
  `,
  YearText: styled.Text`
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-bottom: ${getSize(12)}px;
  `,
  Yinyang: styled(Images.Yinyang)`
    margin-bottom: ${getSize(112)}px;
  `,
  Sun: styled(Images.Sun)`
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
  EmotionTextContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
        margin-top: ${getSize(2)}px;
    margin-bottom: ${getSize(2)}px;
  `,
  EmotionTextHappy: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(8)}px;
    color: red;
    text-align: left;
    width: ${getSize(37)}px;
    margin-left: ${getSize(5)}px;
  `,
  EmotionTextSad: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(8)}px;
    color: blue;
    text-align: left;
    width: ${getSize(37)}px;
    margin-left: 5px;
  `,
  EmotionValueText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(8)}px;
    text-align: right;
    margin-right: ${getSize(5)}px;
  `,
};

export default S;
