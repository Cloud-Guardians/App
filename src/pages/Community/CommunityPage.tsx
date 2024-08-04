import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import S from './style';

const CommmunityPage: React.FC = () => {
  return (
    <S.ImageBackground source={require('./../../../assets/backgrondimg.jpg')}>
      <S.RootContainer>
        <S.Header>
          <SearchBar />
        </S.Header>
      </S.RootContainer>
    </S.ImageBackground>
  );
};

export default CommmunityPage;
