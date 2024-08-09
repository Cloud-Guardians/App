import React, { useState } from 'react';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import YesNoDialog from '../../../../../components/YesNoDialog/YesNoDialog';
import { Strings } from '../../../../../constants/strings';
import ButtonIcon from '../../../../../components/ButtonIcon/ButtonIcon';

const ReportList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [dialogVisible, setDialogVisible] = useState(false);

  const showYesNoDialog = () => {
    setDialogVisible(true);
  };

  const onYesPress = () => {
    setDialogVisible(false);
  };

  const onNoPress = () => {
    setDialogVisible(false);
  };

  return (
    <S.RootContainer>
      <S.ListContainer>
        <Icon name="check-box-outline-blank" size={18}></Icon>
        <Icon name="circle" size={32}></Icon>
        <S.TextContainer>
          <S.TitleContainer>
            <S.TitleText>잠죽자회원</S.TitleText>
            <S.OthersCount>외 3명</S.OthersCount>
          </S.TitleContainer>
          <S.TitleText>당신의 카카오톡은 해킹당했습니다.</S.TitleText>
          <S.TitleText>당신의 카카오톡이 해킹당했으니 비트코인...</S.TitleText>
          <S.SpamAndViewCount>스팸 00:53 조회 76</S.SpamAndViewCount>
        </S.TextContainer>
        <ButtonIcon name="delete" size={24} color="black" onPress={showYesNoDialog} />
        <ButtonIcon name="highlight-off" size={24} color="black" onPress={() => {}} />   
      </S.ListContainer>
      <S.Underline></S.Underline>
      <YesNoDialog
        visible={dialogVisible}
        message={Strings.userDeleteGuide}
        yesText={Strings.check}
        noText={Strings.cancel}
        yesCallback={onYesPress}
        noCallback={onNoPress}
      />
    </S.RootContainer>
  );
};

export default ReportList;
