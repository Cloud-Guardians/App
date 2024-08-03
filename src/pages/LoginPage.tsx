import {View, Text, Image} from 'react-native';
import React from 'react';

const LoginPage = () => {
  return (
    <View>
      <View>
        <Image source={require('./../../assets/boss.png')} />
      </View>
      <Text>로그인</Text>
    </View>
  );
};

export default LoginPage;
