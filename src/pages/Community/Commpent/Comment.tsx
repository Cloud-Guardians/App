import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import S from './style';
import { CommunityScreens, CommunityStackParamList } from '../../../constants/strings';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Comment: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();

  const showUserProfilePage = () => {
    navigation.navigate(CommunityScreens.CommunityUserProfile);
  };

  return (
    <S.ContentsContainer>
      <S.Touchable onPress={showUserProfilePage}>
        <S.BlackBox />
      </S.Touchable>
      <S.CommentContainer>
        <S.CommentArea>
          <S.CommentText>횐님 일기 허언증 가득하네요</S.CommentText>
          <S.CommentPointer />
        </S.CommentArea>
        <S.DateText>2023-08-06</S.DateText>
        <S.UnderlineAndIcons>
          <S.Underline />
          <S.IconsContainer>
            <Icon name="favorite-border" size={14} color="gray" />
            <Icon name="comment" size={14} color="gray" />
          </S.IconsContainer>
        </S.UnderlineAndIcons>
      </S.CommentContainer>
    </S.ContentsContainer>
  );
};

export default Comment;
