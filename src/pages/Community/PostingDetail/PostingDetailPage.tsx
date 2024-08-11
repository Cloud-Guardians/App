import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import { CommunityStackParamList } from '../../../constants/strings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReportDialog from '../ReportDialog/ReportDialog';

type PostingDetailRouteProp = RouteProp<CommunityStackParamList, 'PostDetailPage'>;

const PostingDetailPage: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();
    const route = useRoute<PostingDetailRouteProp>();
    const { post } = route.params;

    const [isReportDialogVisible, setReportDialogVisible] = useState(false);

    const openReportDialog = () => {
        setReportDialogVisible(true);
    };

    const closeReportDialog = () => {
        setReportDialogVisible(false);
    };

    const sendReport = () => {
        setReportDialogVisible(false);
    };

    return (
        <S.ImageBackground source={require('./../../../../assets/backgrondimg.jpg')}>
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
                    <S.ContentText>{post.content}</S.ContentText>
                </S.ContentContainer>
                <S.IconRow>
                    <Icon name="report" size={24} color="red" onPress={openReportDialog} />
                    <Icon name="favorite-border" size={24} color="gray" style={{ marginLeft: 16 }} />
                    <Icon name="comment" size={24} color="gray" style={{ marginLeft: 16 }} />
                </S.IconRow>
                <ReportDialog
                    visible={isReportDialogVisible}
                    onClose={closeReportDialog}
                    onSubmit={sendReport}
                />
            </S.RootContainer>  
        </S.ImageBackground>
    );
};

export default PostingDetailPage;
