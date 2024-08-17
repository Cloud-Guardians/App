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
                <S.ContentsContainer>
                    <S.BlackBox />
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

            </S.Content>
        </S.RootContainer>
    );
};

export default CommentPage;
