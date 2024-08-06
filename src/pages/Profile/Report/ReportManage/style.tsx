import styled from 'styled-components/native';
import { getSize } from '../../../../utils/utils';

const S = {
  ReportContainer: styled.SafeAreaView`
    width: 100%;
    height: ${getSize(33)}px;
    margin-top: ${getSize(25)}px;
    margin-bottom: ${getSize(25)}px;
    flex-direction: row;
    align-items: center; 
    justify-content: center;
  `,
  ReportText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(20)}px;
    color: #000;
  `,
  NewText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(12)}px;
    margin-left: ${getSize(5)}px;
    color: #000;
  `,
};

export default S;
