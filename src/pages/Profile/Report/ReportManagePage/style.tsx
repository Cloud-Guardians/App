import styled from 'styled-components/native';
import { getSize } from '../../../../utils/utils';

const S = {
  ImageBackground: styled.ImageBackground`
    flex: 1;
  `,
  RootContainer: styled.View`
    flex: 1;
  `,
  TabContainer: styled.View`
    flex-direction: row;
    align-items: flex-start;
    margin-left: ${getSize(27)}px;
  `,
  Tab: styled.TouchableOpacity<{ active: boolean }>`
    width: ${getSize(84)}px;
    padding: ${getSize(15)}px 0;
    align-items: center;
    border-bottom-width: ${getSize(1)}px;
    border-bottom-color: ${({ active }) => (active ? '#A7A7A7' : 'transparent')};
  `,
  TabText: styled.Text`
    font-size: ${getSize(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
};

export default S;
