import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommunityStackParamList, Strings } from '../../../constants/strings';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import Comment from '../Commpent/Comment';


const CommentPage: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();

    return (
        <S.RootContainer>
            <S.Header>
                <BackAppBar title={Strings.comment} />
                <S.Line />
            </S.Header>
            <S.Content>
                <Comment />
            </S.Content>
        </S.RootContainer>
    );
};

export default CommentPage;
