import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const S = {
  ImageBackground: styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
  `,
  Container: styled.View`
    flex: 1;
  `,
  AppBar: styled.View`
    height: ${getSize(56)}px;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-horizontal: ${getSize(16)}px;
    margin-top: ${getSize(23)}px;
    margin-right: ${getSize(24)}px;
  `,
  IconContainer: styled.View`
    justify-content: center;
    align-items: center;
  `,
  Icon: styled(Icon)`
    color: #5F6368;
  `,
  TitleContainer: styled.View`
    flex: 1;
    justify-content: center;
  `,
  Title: styled.Text`
    font-size: ${getSize(24)}px;
    color: black;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.primary};
    align-self: center;
  `,
};

export default S;
