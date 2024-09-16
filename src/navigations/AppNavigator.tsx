import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRecoilState, useSetRecoilState} from 'recoil';

import HomePage from '../pages/Home/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MyPage from '../pages/MyPage';

import {tokenState, isLoggedInState} from '../atoms/authAtom';
import colors from '../constants/colors';
import {makeApiRequest} from '../utils/api';
import AuthStack from '../pages/Auth/AuthStack';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff',
  },
};
const AuthenticatedTabNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name="home"
              size={30}
              color={focused ? colors.primaryColorSky : '#d3d3d3'}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatisticsPage}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name="bar-chart"
              size={30}
              color={focused ? colors.primaryColorSky : '#d3d3d3'}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Diary"
      component={DiaryPage}
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: focused ? '#fff' : colors.secondaryColorNavy,
              borderWidth: 2,
              borderColor: focused ? colors.primaryColorSky : '#d3d3d3',
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 0.1,
              transform: [{translateY: -10}],
            }}>
            <Icon
              name="book"
              size={24}
              color={focused ? colors.primaryColorSky : '#fff'}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Community"
      component={CommunityPage}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name="users"
              size={24}
              color={focused ? colors.primaryColorSky : '#d3d3d3'}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="MyPage"
      component={MyPage}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name="user"
              size={24}
              color={focused ? colors.primaryColorSky : '#d3d3d3'}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);
const AppNavigator = () => {
  const [tokens, setTokens] = useRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  // Log current token state
  console.log('Current Tokens:', tokens);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await makeApiRequest('POST', 'auth/refresh', {
          refreshToken: tokens.refreshToken,
        });

        if (response.status === 201) {
          const newAccessToken = response.data.accessToken;
          if (newAccessToken) {
            setTokens(prev => ({...prev, accessToken: newAccessToken}));
            console.log('액세스 토큰 저장 성공:', newAccessToken);
          } else {
            throw new Error('Access-Token 갱신 실패');
          }
        } else {
          throw new Error(
            response.data?.errorMessage || '토큰 갱신에 실패했습니다.',
          );
        }
      } catch (error) {
        console.error('토큰 갱신 중 오류 발생:', error);
        Alert.alert('토큰 갱신 실패', '토큰 갱신 중 오류가 발생했습니다.');
        setIsLoggedIn(false);
      }
    };

    const initializeAuth = async () => {
      if (!tokens.accessToken && tokens.refreshToken) {
        await refreshAccessToken();
      } else if (tokens.accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    initializeAuth();
  }, [tokens, setIsLoggedIn, setTokens]);

  const isLoggedIn = useRecoilState(isLoggedInState)[0];

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
