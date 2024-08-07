import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import S from './style';

interface ButtonIconProps {
  name: string;
  size: number;
  color: string;
  onPress: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ name, size, color, onPress }) => {
  return (
    <S.Button onPress={onPress}>
      <S.IconWrapper>
        <Icon name={name} size={size} color={color} />
      </S.IconWrapper>
    </S.Button>
  );
};

export default ButtonIcon;
