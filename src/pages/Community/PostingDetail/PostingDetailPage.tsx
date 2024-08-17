import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CommunityScreens, CommunityStackParamList, Strings } from '../../../constants/strings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReportDialog from '../ReportDialog/ReportDialog';

type PostingDetailRouteProp = RouteProp<CommunityStackParamList, 'PostDetailPage'>;

const PostingDetailPage: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();
    const route = useRoute<PostingDetailRouteProp>();
    const { post } = route.params;

    const [isReportDialogVisible, setReportDialogVisible] = useState(false);
    const [comment, setComment] = useState('');

    const showCommentPage = () => {
        navigation.navigate(CommunityScreens.CommentPage);
      };

    const openReportDialog = () => {
        setReportDialogVisible(true);
    };

    const closeReportDialog = () => {
        setReportDialogVisible(false);
    };

    const sendReport = () => {
        setReportDialogVisible(false);
    };

    const ChangeCommentText = (text: string) => {
        setComment(text);
    };

    const AddComment = () => {
        setComment('');
    };

    return (
        <S.ImageBackground source={require('./../../../../assets/backgrondimg.jpg')}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <S.ScrollView>
                    <S.RootContainer>
                        <BackAppBar title='' />
                        <S.Header>
                            <S.WriteDay>07월 19일</S.WriteDay>
                            <S.WriteTime>오후 01:43</S.WriteTime>
                            <S.WriteProfileContainer>
                                <S.Writer>{post.writer}</S.Writer>
                            </S.WriteProfileContainer>
                        </S.Header>
                        <S.ContentContainer>
                            <S.ScrollView>
                                <S.TitleText>{post.title}</S.TitleText>
                                <S.BlackBox></S.BlackBox>
                                <S.ContentText>{post.content}</S.ContentText>
                            </S.ScrollView>
                        </S.ContentContainer>
                        <S.IconRow>
                            <Icon name="report" size={24} color="red" onPress={openReportDialog} />
                            <Icon name="favorite-border" size={24} color="gray" style={{ marginLeft: 16 }} />
                            <Icon name="comment" size={24} color="gray" style={{ marginLeft: 16 }} onPress={showCommentPage} />
                        </S.IconRow>
                        <ReportDialog
                            visible={isReportDialogVisible}
                            onClose={closeReportDialog}
                            onSubmit={sendReport}
                        />
                        <S.CommentContainer>
                            <S.TextInput
                                value={comment}
                                onChangeText={ChangeCommentText}
                                placeholder={Strings.commentHint}
                            />
                            <S.WriteButtonContainer>
                                <S.WriteButton onPress={AddComment}>
                                    <S.WriteButtonText>{Strings.write}</S.WriteButtonText>
                                </S.WriteButton>
                            </S.WriteButtonContainer>
                        </S.CommentContainer>
                    </S.RootContainer>
                </S.ScrollView>
            </KeyboardAvoidingView>
        </S.ImageBackground>
    );
};

export default PostingDetailPage;
