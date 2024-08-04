import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';

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
    padding-horizontal: ${getSize(16)}px;
  `,
Title: styled.Text`
    font-size: ${getSize(20)}px;
    font-weight: bold;
    color: black;
`,
};

export default S;
