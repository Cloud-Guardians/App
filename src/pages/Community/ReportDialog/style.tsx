import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';

const S = {
  RootContainer: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  DialogContainer: styled.View`
    width: 95%;
    padding: ${getSize(20)}px;
    background-color: white;
    border-radius: ${getSize(10)}px;
    position: relative;
  `,
  CloseIconContainer: styled.View`
    position: absolute;
    top: ${getSize(10)}px;
    right: ${getSize(10)}px;
  `,
  DialogTitle: styled.Text`
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    text-align: center;
    margin-bottom: ${getSize(30)}px;
  `,
  TitleUnderline: styled.View`
    width: 50%;
    height: 1px;
    background-color: #000;
    align-self: center;
    margin-top: -${getSize(20)}px;
    margin-bottom: ${getSize(15)}px;
  `,
  DialogContent: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: ${getSize(20)}px;
  `,
  RadioContainer: styled.View`
    width: 50%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${getSize(10)}px;
  `,
  RadioText: styled.Text`
    font-size: ${getSize(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-left: ${getSize(10)}px;
    text-align: center;
    flex: 1;
  `,
  OtherInput: styled.TextInput`
    width: 100%;
    height: ${getSize(108)}px;
    background-color: rgba(217, 217, 217, 0.5);
    border: none;
    border-radius: ${getSize(5)}px;
    padding: ${getSize(10)}px;
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #000;
    margin-top: ${getSize(10)}px;
  `,
  SubmitButtonContainer: styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: ${getSize(20)}px;
  `,
  SubmitButton: styled.TouchableOpacity<{ disabled: boolean }>`
    width: 50%;
    justify-content: center;
    align-items: center;
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: #fff;
    padding: ${getSize(10)}px ${getSize(20)}px;
    background-color: ${({ disabled }) => (disabled ? '#f2f2f2' : '#35465C')};
    border-radius: ${getSize(5)}px;
  `,
  SubmitButtonText: styled.Text`
    color: #fff;
    font-size: ${getSize(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};

export default S;
