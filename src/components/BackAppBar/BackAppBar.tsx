import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import S from './style';

interface BackAppBarProps {
    title: string;
}

const BackAppBar: React.FC<BackAppBarProps> = ({ title }) => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <S.AppBar>
            <TouchableOpacity onPress={goBack}>
                <Icon name="arrow-back" size={24} color="#5F6368" />
            </TouchableOpacity>
            <S.Title>{title}</S.Title>
        </S.AppBar>
    );
};

export default BackAppBar;
