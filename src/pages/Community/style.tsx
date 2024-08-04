import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';
import Images from '../../constants/images';

const S = {
  ImageBackground: styled.ImageBackground`
    flex: 1;
    resize-mode: cover;
  `,
  RootContainer: styled.SafeAreaView`
    flex: 1;
  `,
  Header: styled.View`
    height: ${getSize(82)}px;
    justify-content: center;
    align-items: center; 
    margin-horizontal: ${getSize(20)}px;
  `,
  Body: styled.View`
    flex: 1;
    background-color: #fff;
    margin-top: ${getSize(10)}px;
    margin-bottom: ${getSize(78)}px;
  `,
  ScrollContainer: styled.ScrollView`
    flex: 1;
  `,
};

export default S;
