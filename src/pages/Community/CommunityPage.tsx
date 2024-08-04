import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import S from './style';
import Posting from './Posting/Posting';
import { Post } from '../../types/community';

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

const CommunityPage: React.FC = () => {
  return (
    <S.ImageBackground source={require('./../../../assets/backgrondimg.jpg')}>
      <S.RootContainer>
        <S.Header>
          <SearchBar />
        </S.Header>
        <S.Body>
          <S.ScrollContainer>
            {dummyPosts.map(post => (
              <Posting key={post.id} post={post} />
            ))}
          </S.ScrollContainer>
        </S.Body>
      </S.RootContainer>
    </S.ImageBackground>
  );
};

export default CommunityPage;
