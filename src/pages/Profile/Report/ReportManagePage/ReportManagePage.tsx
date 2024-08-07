import React, { useState } from 'react';
import S from './style';
import ReportList from './ReportList/ReportList';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('diary');

  return (
    <S.ImageBackground source={require('./../../../../../assets/backgrondimg.jpg')}>
      <S.RootContainer>
        <S.TabContainer>
          <S.Tab active={activeTab === 'diary'} onPress={() => setActiveTab('diary')}>
            <S.TabText>일기</S.TabText>
          </S.Tab>
          <S.Tab active={activeTab === 'comments'} onPress={() => setActiveTab('comments')}>
            <S.TabText>댓글</S.TabText>
          </S.Tab>
        </S.TabContainer>
        <ReportList></ReportList>
      </S.RootContainer>
    </S.ImageBackground>
  );
};

export default CommunityPage;
