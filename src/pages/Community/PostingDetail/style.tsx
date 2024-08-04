import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';

const S = {
  ImageBackground: styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
  `,
  RootContainer: styled.View`
    flex: 1;
    position: relative;
  `,
  Header: styled.View`
    height: ${getSize(90)}px;
    align-items: center;
  `,
  WriteDay: styled.Text`
    font-size: ${getSize(24)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-bottom: ${getSize(5)}px;
  `, 
  WriteTime: styled.Text`
    font-size: ${getSize(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
  `, 
  WriteProfileContainer: styled.View`
    flex-direction: row;
    margin-top: ${getSize(19)}px;
  `,
  Writer: styled.Text`
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
  `,
  ContentContainer: styled.View`
    margin-top: ${getSize(24)}px;
    margin-left: ${getSize(30)}px;
    margin-right: ${getSize(30)}px;
    height: ${getSize(400)}px;
    background-color: white;
    border-radius: ${getSize(10)}px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: ${getSize(4)}px ${getSize(6)}px;
    shadow-opacity: 0.1;
    shadow-radius: ${getSize(10)}px;
  `,
  IconRow: styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: ${getSize(10)}px;
    margin-right: ${getSize(30)}px;
    margin-left: ${getSize(30)}px;
  `,
};

export default S;
