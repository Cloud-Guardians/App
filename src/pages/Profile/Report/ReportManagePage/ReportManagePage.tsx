import React, { useState } from 'react';
import S from './style';
import ReportList from './ReportList/ReportList';

const ReportMangePage: React.FC = () => {
  enum Tab {
    Diary = 'diary',
    Comments = 'comments',
  }

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Diary);

  return (
    <S.ImageBackground source={require('./../../../../../assets/backgrondimg.jpg')}>
      <S.RootContainer>
        <S.TabContainer>
          <S.Tab active={activeTab === Tab.Diary} onPress={() => setActiveTab(Tab.Diary)}>
            <S.TabText>일기</S.TabText>
          </S.Tab>
          <S.Tab active={activeTab === Tab.Comments} onPress={() => setActiveTab(Tab.Comments)}>
            <S.TabText>댓글</S.TabText>
          </S.Tab>
        </S.TabContainer>
        <ReportList></ReportList>
      </S.RootContainer>
    </S.ImageBackground>
  );
};

export default ReportMangePage;
