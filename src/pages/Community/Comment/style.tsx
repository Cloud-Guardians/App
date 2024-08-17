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
  DateContainer: styled.View`
    margin-top: ${getSize(2)}px;
    align-items: flex-start;
    width: 100%;
  `,
  ContentsContainer: styled.View`
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    margin-bottom: ${getSize(4)}px;
  `,
  CommentContainer: styled.View`
    flex: 1;
  `,
  CommentArea: styled.View`
    flex: 1;
    background-color: #fff;
    border-radius: ${getSize(20)}px;
    padding: ${getSize(4)}px;
    position: relative;
    margin-left: ${getSize(8)}px;
    margin-right: ${getSize(8)}px;
    align-items: start;
    justify-content: center;
  `,
  CommentText: styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(12)}px;
    color: #333;
    font-size: ${getSize(14)}px;
    margin-left: ${getSize(10)}px;
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
  DateText: styled.Text`
    color: black;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${getSize(8)}px;
  `,
  UnderlineAndIcons: styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
  `,
  Underline: styled.View`
    height: ${getSize(1)}px;
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
  BlackBox: styled.View`
    width: ${getSize(85)}px;
    height: ${getSize(67)}px;
    background-color: #000;
    align-self: center;
    margin-right: ${getSize(8)}px;
  `,
};

export default S;
