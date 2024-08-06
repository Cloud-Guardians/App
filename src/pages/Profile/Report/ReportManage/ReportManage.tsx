import React from 'react';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Strings } from '../../../../constants/strings';

interface ReportManageProps {
    showNew: boolean;
}

const ReportManage: React.FC<ReportManageProps> = ({ showNew }) => {

    return (
        <S.ReportContainer>
            <Icon name="report" size={24} color="red" />
            <S.ReportText>{Strings.reportManage}</S.ReportText>
            {showNew && <S.NewText>{Strings.new}</S.NewText>}
        </S.ReportContainer>
    );
};

export default ReportManage;
