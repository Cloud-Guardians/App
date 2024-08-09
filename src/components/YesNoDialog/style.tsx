import styled from 'styled-components/native';
import { getSize } from '../../utils/utils';

const S = {
  RootContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  `,
  DialogContainer: styled.View`
    width: 80%;
    height: ${getSize(159)}px;
    padding: ${getSize(20)}px;
    background-color: #C2D0CF;
    border-radius: ${getSize(10)}px;
    align-items: center;
    position: relative;
  `,
  ContentText: styled.Text`
    font-size: ${getSize(18)}px;
    margin-bottom: ${getSize(20)}px;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
  `,
  ButtonContainer: styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 15px;
  `,
  ButtonWrapper: styled.View`
    width: ${getSize(114)}px;
    height: ${getSize(55)}px;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-radius: ${getSize(10)}px;
  `,
  DialogButton: styled.Text`
    font-size: ${getSize(20)}px;
    color: #000;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};

export default S;
