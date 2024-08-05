import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import S from './style';

interface BackAppBarProps {
  title: string;
}

const BackAppBar: React.FC<BackAppBarProps> = ({ title }) => {
  const navigation = useNavigation();

  const goBack = () => {
    console.log("JKehee")
    navigation.goBack();
  };

  return (
    <S.AppBar>
      <TouchableOpacity onPress={goBack}>
        <S.IconContainer>
          <S.Icon name="arrow-back" size={24} />
        </S.IconContainer>
      </TouchableOpacity>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
      </S.TitleContainer>
      <S.IconContainer />
    </S.AppBar>
  );
};

export default BackAppBar;