import styled from 'styled-components/native';
import { getSize } from '../../../utils/utils';
import Images from '../../../constants/images';

const S = {
  PostingContainerWrapper: styled.View`
    padding-left: ${getSize(20)}px;
    padding-right: ${getSize(20)}px;
    width: 100%;
    margin-top: ${getSize(14)}px;
    margin-bottom: ${getSize(10)}px;
  `,
  Touchable: styled.TouchableOpacity`
    width: 100%;
  `,
  PostingContainer: styled.View`
    width: 100%;
    height: ${getSize(98)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  Underline: styled.View`
    height: 1px;
    background-color: #B7B7B7;
    width: 100%;
    margin-top: ${getSize(5)}px;
  `,
  TitleRow: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  LeftArea: styled.View`
    flex: 1;
    padding-right: ${getSize(10)}px;
  `,
  PostTitle: styled.Text`
    color: #000;
    font-size: ${getSize(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-bottom: ${getSize(5)}px;
  `,
  PostContent: styled.Text`
    color: #000;
    font-size: ${getSize(12)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-bottom: ${getSize(6)}px;
  `,
  PostWriter: styled.Text`
    color: #000;
    font-size: ${getSize(11)}px;
    font-family: ${({ theme }) => theme.fonts.primary};
  `,
  RightArea: styled.View`
    width: ${getSize(90)}px;
    align-items: center;
    justify-content: flex-end;
  `,
  BlackBox: styled.View`
    width: ${getSize(85)}px;
    height: ${getSize(67)}px;
    background-color: #000;
    margin-bottom: ${getSize(5)}px;
  `,
  FavoriteCommentArea: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  FavoriteIcon: styled(Images.Favorite)`
    width: ${getSize(20)}px;
    height: ${getSize(20)}px;
  `,
  CommenetIcon: styled(Images.Comment)`
    width: ${getSize(20)}px;
    height: ${getSize(20)}px;
    margin-left: ${getSize(5)}px;
  `,
  FavorteCommentText: styled.Text`
    margin-left: ${getSize(3)}px;
    color: #000;
  `,
  BestPost: styled(Images.BestPost)`
    margin-left: ${getSize(5)}px;
  `,
};

export default S;
