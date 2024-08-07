import styled from 'styled-components/native';
import { getSize } from '../../../../../utils/utils';

const S = {
  RootContainer: styled.View`
    flex-direction: column;
  `,
  ListContainer: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${getSize(18)}px;
    padding-right: ${getSize(12)}px;
  `,
  TextContainer: styled.View`
    flex-direction: column;
    margin-left: ${getSize(4)}px;
  `,
  TitleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${getSize(5)}px;
    margin-right: ${getSize(15)}px;
  `,
  TitleText: styled.Text`
    font-size: ${getSize(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
  `,
  ContentText: styled.Text`
    font-size: ${getSize(12)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
  `,
  OthersCount: styled.Text`
    font-size: ${getSize(10)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-left: ${getSize(10)}px;
  `,
  SpamAndViewCount: styled.Text`
    font-size: ${getSize(11)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-top: ${getSize(5)}px;
  `,
  Underline: styled.View`
    width: auto;  
    height: 1px;
    margin-top: ${getSize(15)}px;
    margin-left: ${getSize(45)}px;
    margin-right: ${getSize(45)}px;
    background-color: #B7B7B7;
  `,
};

export default S;
