import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Strings } from '../../../constants/strings';
import S from './style';

const SearchBar = () => {
    const [inputText, setInputText] = useState('');

    return (
        <S.RootContainer>
            <S.SearchBarContainer>
                <S.LabelContainer>
                    <S.Label>제목</S.Label>
                    <S.VerticalDivider />
                </S.LabelContainer>
                <S.TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder={Strings.searchHint}
                />
                <S.CancelButton onPress={() => setInputText('')}>
                    <S.CancelIcon />
                </S.CancelButton>
            </S.SearchBarContainer>
            <S.SearchIcon />
            <S.NotificationIcon />
        </S.RootContainer>
    );
};

export default SearchBar;
