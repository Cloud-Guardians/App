import React from 'react';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ReportScreens, ReportStackParamList, Strings } from '../../../../constants/strings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ReportManageProps {
    showNew: boolean;
}

const ReportManage: React.FC<ReportManageProps> = ({ showNew }) => {
    const navigation = useNavigation<StackNavigationProp<ReportStackParamList>>();

    const showReportPage = () => {
        navigation.navigate(ReportScreens.ReportManagePage);
      };

    return (
        <S.Touchable onPress={showReportPage}>
          <S.ReportContainer>
            <Icon name="report" size={24} color="red" />
            <S.ReportText>{Strings.reportManage}</S.ReportText>
            {showNew && <S.NewText>{Strings.new}</S.NewText>}
          </S.ReportContainer>
        </S.Touchable>
    );
};

export default ReportManage;
