import React from 'react';
import S from './style';
import { Post } from '../../../types/community';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommunityStackParamList, CommunityScreens } from '../../../constants/strings';

interface PostingProps {
  post: Post;
}

const Posting: React.FC<PostingProps> = ({ post }) => {
  const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();

  const showDetailPage = () => {
    // navigation.navigate(CommunityScreens.PostDetail, { post });
    navigation.navigate(CommunityScreens.CommentPage);
  };

  return (
    <S.PostingContainerWrapper>
      <S.Touchable onPress={showDetailPage}>
        <S.PostingContainer>
          <S.LeftArea>
              <S.TitleRow>
                <S.PostTitle numberOfLines={1} ellipsizeMode="tail">{post.title}</S.PostTitle>
                {post.isBest && <S.BestPost />}
              </S.TitleRow>
            <S.PostContent numberOfLines={1} ellipsizeMode="tail">{post.content}</S.PostContent>
            <S.PostWriter numberOfLines={1} ellipsizeMode="tail">{post.writer}</S.PostWriter>
          </S.LeftArea>
          <S.RightArea>
            <S.BlackBox />
            <S.FavoriteCommentArea>
              <S.FavoriteIcon />
              <S.FavorteCommentText>{post.favoriteCount}</S.FavorteCommentText>
              <S.CommenetIcon />
              <S.FavorteCommentText>{post.commentCount}</S.FavorteCommentText>
            </S.FavoriteCommentArea>
          </S.RightArea>
        </S.PostingContainer>
        <S.Underline />
      </S.Touchable>
    </S.PostingContainerWrapper>
  );
};

export default Posting;
