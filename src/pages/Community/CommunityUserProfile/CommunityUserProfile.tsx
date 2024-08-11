import React, { useState } from 'react';
import S from './style';
import BackAppBar from '../../../components/BackAppBar/BackAppBar';
import { Strings } from '../../../constants/strings';
import { Post } from '../../../types/community';
import Posting from '../Posting/Posting';

const dummyPosts: Post[] = [
  { id: 1, title: '술 마시면 개', content: '오늘은 나와의 약속을 거슬렀다 이 바', writer: '김삼배 01:37 조회 55', favoriteCount: 3, commentCount: 3, isBest: true, },
  { id: 2, title: '테슬라가 싫다', content: '주식 생각에 점심을 못 먹었다 하필...', writer: '테슬라짱 00:53 조회 76', favoriteCount: 5, commentCount: 1, isBest: false },
  { id: 3, title: '술 마시면 개', content: '오늘은 나와의 약속을 거슬렀다 이 바', writer: '김삼배 01:37 조회 55', favoriteCount: 3, commentCount: 3, isBest: true, },
  { id: 4, title: '테슬라가 싫다', content: '주식 생각에 점심을 못 먹었다 하필...', writer: '테슬라짱 00:53 조회 76', favoriteCount: 5, commentCount: 1, isBest: false },
  { id: 5, title: '술 마시면 개', content: '오늘은 나와의 약속을 거슬렀다 이 바', writer: '김삼배 01:37 조회 55', favoriteCount: 3, commentCount: 3, isBest: true, },
  { id: 6, title: '테슬라가 싫다', content: '주식 생각에 점심을 못 먹었다 하필...', writer: '테슬라짱 00:53 조회 76', favoriteCount: 5, commentCount: 1, isBest: false },
  { id: 7, title: '술 마시면 개', content: '오늘은 나와의 약속을 거슬렀다 이 바', writer: '김삼배 01:37 조회 55', favoriteCount: 3, commentCount: 3, isBest: true, },
  { id: 8, title: '테슬라가 싫다', content: '주식 생각에 점심을 못 먹었다 하필...', writer: '테슬라짱 00:53 조회 76', favoriteCount: 5, commentCount: 1, isBest: false },
];


const CommunityUserProfile: React.FC = () => {
  enum Tab {
    Diary = 'diary',
    Comments = 'comments',
  }

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Diary);

  return (
    <S.RootContainer>
      <BackAppBar title=''/>
      <S.UserContainer>
        <S.BlackBox />
        <S.UserNameText>절때안자</S.UserNameText>
      </S.UserContainer>
      <S.TabContainer>
        <S.Tab onPress={() => setActiveTab(Tab.Diary)}>
          <S.TabText active={activeTab === Tab.Diary}>{Strings.myDiary}</S.TabText>
        </S.Tab>
        <S.Tab onPress={() => setActiveTab(Tab.Comments)}>
          <S.TabText active={activeTab === Tab.Comments}>{Strings.myComment}</S.TabText>
        </S.Tab>
      </S.TabContainer>
      <S.ScrollContainer>
            {dummyPosts.map(post => (
              <Posting key={post.id} post={post} />
            ))}
          </S.ScrollContainer>
    </S.RootContainer>
  );
};

export default CommunityUserProfile;
