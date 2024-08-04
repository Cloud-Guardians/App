import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import { CommunityStackParamList } from '../../../constants/strings';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostingDetail: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<CommunityStackParamList>>();

    return (
        <S.ImageBackground source={require('./../../../../assets/backgrondimg.jpg')}>
            <S.RootContainer>
                <BackAppBar title='' />
                <S.Header>
                    <S.WriteDay>07월 19일</S.WriteDay>
                    <S.WriteTime>오후 01:43</S.WriteTime>
                    <S.WriteProfileContainer>
                        <S.Writer>절때안자</S.Writer>
                    </S.WriteProfileContainer>
                </S.Header>
                <S.ContentContainer />
                <S.IconRow>
                    <Icon name="report" size={24} color="red" />
                    <Icon name="favorite-border" size={24} color="gray" style={{ marginLeft: 16 }} />
                    <Icon name="comment" size={24} color="gray" style={{ marginLeft: 16 }} />
                </S.IconRow>
            </S.RootContainer>  
        </S.ImageBackground>
    );
};

export default PostingDetail;
