import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';
import Images from '../../../constants/images';

const S = {
  RootContainer: styled.View`
    height: ${getSize(40)}px;
    flex-direction: row;
    align-items: center; 
    margin-left: ${getSize(20)}px;
    margin-right: ${getSize(20)}px;
    margin-top: ${getSize(20)}px;
  `,
  SearchBarContainer: styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: ${getSize(40)}px;
    border-radius: ${getSize(10)}px;
  `,
  LabelContainer: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Label: styled.Text`
    margin-left: ${getSize(10)}px;
    color: #000;
    font-size: ${getSize(15)}px;
  `,
  VerticalDivider: styled.View`
    width: 2px;
    height: ${getSize(30)}px;
    background-color: #B7B7B7;
    margin-left: ${getSize(10)}px;
    margin-right: ${getSize(10)}px;
  `,
  TextInput: styled.TextInput`
    flex: 1;
    color: #8A8E93;
    font-size: ${getSize(15)}px;
    line-height: ${getSize(15)}px;
  `,
  CancelButton: styled.TouchableOpacity`
    margin-right: ${getSize(12)}px;
  `,
  SearchIcon: styled(Images.Search)`
    width: ${getSize(20)}px;
    height: ${getSize(20)}px;
    margin-left: ${getSize(5)}px;
    margin-right: ${getSize(12)}px;
  `,
  CancelIcon: styled(Images.Cancel)`
    width: ${getSize(18)}px;
    height: ${getSize(18)}px;
  `,
  NotificationIcon: styled(Images.Notification)`
    width: ${getSize(18)}px;
    height: ${getSize(18)}px;
  `,
};

export default S;
