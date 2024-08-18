import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';

const S = {
  RootContainer: styled.View`
    flex: 1;
  `,
  Header: styled.View`
    height: ${getSize(40)}px;
    margin-top: ${getSize(24)}px;
    margin-bottom: ${getSize(40)}px;
  `,
  Line: styled.View`
    height: ${getSize(2)}px;
    background-color: #A7A7A7;
    margin-left: ${getSize(45)}px;
    margin-right: ${getSize(45)}px;
  `,
  Content: styled.View`
    align-items: flex-start;
    padding: ${getSize(16)}px;
  `,
};

export default S;
