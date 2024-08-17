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
  ScrollView: styled.ScrollView.attrs(() => ({
    showsVerticalScrollIndicator: false,
  }))`
    flex: 1;
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
    padding: ${getSize(10)}px;
    overflow: hidden;
  `,
  TitleText: styled.Text`
    text-align: center;
    text-decoration: underline;
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-bottom: ${getSize(30)}px;
  `,
  ContentText: styled.Text`
    text-decoration: underline;
    font-size: ${getSize(11)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    flex-wrap: wrap;
  `,
  IconRow: styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: ${getSize(10)}px;
    margin-right: ${getSize(30)}px;
    margin-left: ${getSize(30)}px;
  `,
  BlackBox: styled.View`
    width: ${getSize(85)}px;
    height: ${getSize(67)}px;
    background-color: #000;
    margin-bottom: ${getSize(5)}px;
    align-self: center;
    margin-bottom: ${getSize(30)}px;
  `,
  CommentContainer: styled.View`
    margin-top: ${getSize(10)}px;
    margin-left: ${getSize(30)}px;
    margin-right: ${getSize(30)}px;
    height: ${getSize(35)}px;
    background-color: white;
    border-radius: ${getSize(5)}px;
    elevation: 5;
    shadow-color: #C2D0CF;
    shadow-offset: ${getSize(4)}px ${getSize(6)}px;
    shadow-opacity: 0.5;
    shadow-radius: ${getSize(10)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  TextInput: styled.TextInput`
    flex: 1;
    height: 100%;
    font-size: ${getSize(10)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    padding-left: ${getSize(10)}px;
  `,
  WriteButtonContainer: styled.View`
    height: 110%;
    justify-content: center;
    background-color: #35465C;
    border-top-left-radius: ${getSize(8)}px;
    border-bottom-left-radius: ${getSize(8)}px;
    border-top-right-radius: ${getSize(8)}px;
    border-bottom-right-radius: ${getSize(8)}px;
    padding-left: ${getSize(5)}px;
    flex-direction: row;
    align-items: center;
  `,
  WriteButton: styled.TouchableOpacity.attrs(() => ({
    activeOpacity: 1,
  }))`
    height: 100%;
    justify-content: center;
    padding-left: ${getSize(10)}px;
    padding-right: ${getSize(15)}px;
    background-color: #fff;
    border-top-right-radius: ${getSize(8)}px;
    border-bottom-right-radius: ${getSize(8)}px;
    align-items: center;
  `,
  WriteButtonText: styled.Text`
    color: #35465C;
    font-size: ${getSize(10)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};

export default S;
