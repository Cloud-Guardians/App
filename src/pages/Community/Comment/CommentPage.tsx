import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommunityStackParamList, Strings } from '../../../constants/strings';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommentPage: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();

    return (
        <S.RootContainer>
            <S.Header>
                <BackAppBar title={Strings.comment} />
                <S.Line />
            </S.Header>
            <S.Content>
                <S.DateContainer>
                    <S.Comment>
                        <S.CommentText>댓글 위젯 작성 중</S.CommentText>
                        <S.CommentPointer />
                    </S.Comment>
                    <S.Date>2023-08-06</S.Date>
                    <S.UnderlineAndIcons>
                        <S.Underline />
                        <S.IconsContainer>
                            <Icon name="favorite-border" size={24} color="gray" />
                            <Icon name="comment" size={24} color="gray" />
                        </S.IconsContainer>
                    </S.UnderlineAndIcons>
                </S.DateContainer>
            </S.Content>
        </S.RootContainer>
    );
};

export default CommentPage;
