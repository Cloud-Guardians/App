import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import HomePage from '../pages/Home/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MyPage from '../pages/MyPage';

import {
  jwtTokenState,
  isLoggedInState,
  accessTokenState,
  refreshTokenState,
} from '../atoms/authAtom';
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
  const token = useRecoilValue(jwtTokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const refreshToken = useRecoilValue(refreshTokenState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await makeApiRequest('POST', 'auth/refresh', {
          refreshToken,
        });

        if (response.statusCode === 201) {
          const newAccessToken = response.headers['Access-Token'];
          setAccessToken(newAccessToken);
          setIsLoggedIn(true);
        } else {
          Alert.alert(
            '토큰 갱신 실패',
            response.error || '토큰 갱신에 실패했습니다.',
          );
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('토큰 갱신 중 오류 발생:', error);
        Alert.alert('토큰 갱신 실패', '토큰 갱신 중 오류가 발생했습니다.');
      }
    };

    if (token) {
      setIsLoggedIn(true);
      if (refreshToken) {
        refreshAccessToken(); // 토큰 갱신 시도
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token, refreshToken, setAccessToken, setIsLoggedIn]);

  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
