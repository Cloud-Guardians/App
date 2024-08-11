import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';

const S = {
  RootContainer: styled.SafeAreaView`
    flex: 1;
  `,
  UserContainer: styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  BlackBox: styled.View`
    width: ${getSize(110)}px;
    height: ${getSize(110)}px;
    background-color: #000;
    margin-bottom: ${getSize(23)}px;
  `,
  UserNameText: styled.Text`
    color: #000;
    font-size: ${getSize(20)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
  TabContainer: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    border-top-width: ${getSize(1)}px;
    border-bottom-width: ${getSize(1)}px;
    border-color: #000;
    margin-top: ${getSize(53)}px;
  `,
  Tab: styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    padding: ${getSize(15)}px 0;
  `,
  TabText: styled.Text<{ active: boolean }>`
    font-size: ${getSize(15)}px;
    color: ${({ active }) => (active ? '#000' : '#727272')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  `,
  ScrollContainer: styled.ScrollView`
    flex: 1;
  `,
};

export default S;
