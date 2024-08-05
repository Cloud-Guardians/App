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
    padding-horizontal: ${getSize(16)}px;
  `,
  IconContainer: styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
  `,
  Icon: styled(Icon)`
    color: #5F6368;
  `,
  TitleContainer: styled.View`
    width: 100%;
  `,
  Title: styled.Text`
    font-size: ${getSize(24)}px;
    color: black;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};

export default S;
