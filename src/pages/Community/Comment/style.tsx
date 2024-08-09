import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';

const S = {
  RootContainer: styled.View`
    flex: 1;
  `,
  Header: styled.View`
    height: ${getSize(40)}px;
    margin-top: ${getSize(24)}px;
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
  DateContainer: styled.View`
    margin-top: ${getSize(2)}px;
    align-items: flex-start;
    width: 100%;
  `,
  Comment: styled.View`
    width: 80%;
    background-color: #fff;
    border-radius: ${getSize(10)}px;
    padding: ${getSize(8)}px;
    position: relative;
    margin: 0 auto;
    margin-bottom: ${getSize(4)}px;
    align-items: center;
    justify-content: center;
  `,
  CommentText: styled.Text`
    color: #333;
    font-size: ${getSize(14)}px;
  `,
  CommentPointer: styled.View`
    position: absolute;
    left: ${getSize(-8)}px;
    bottom: ${getSize(10)}px;
    width: 0;
    height: 0;
    border-left-width: ${getSize(8)}px;
    border-left-color: transparent;
    border-right-width: ${getSize(8)}px;
    border-right-color: transparent;
    border-top-width: ${getSize(8)}px;
    border-top-color: #fff;
    transform: rotate(-45deg);
  `,
  Date: styled.Text`
    color: grey;
    font-size: ${getSize(14)}px;
  `,
  UnderlineAndIcons: styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${getSize(2)}px;
    width: 100%;
  `,
  Underline: styled.View`
    height: ${getSize(2)}px;
    background-color: #A7A7A7;
    flex: 1;
  `,
  IconsContainer: styled.View`
    flex-direction: row;
    margin-left: ${getSize(8)}px;
  `,
  Icon: styled.Image`
    width: ${getSize(24)}px;
    height: ${getSize(24)}px;
    margin-left: ${getSize(8)}px;
  `,
};

export default S;
