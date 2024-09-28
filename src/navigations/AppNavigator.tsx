// src/navigation/AppNavigator.tsx
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from '../pages/Home/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MyPage from '../pages/MyPage';
import AuthStack from '../pages/Auth/AuthStack';
import colors from '../constants/colors';
import {useRecoilState} from 'recoil';
import {
  tokenState,
  isLoggedInState,
  loadTokensFromStorage,
} from '../atoms/authAtom';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
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
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 토큰을 AsyncStorage에서 불러와 상태 업데이트
        await loadTokensFromStorage(setTokens, setIsLoggedIn);
      } catch (error) {
        console.error('토큰 초기화 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setTokens, setIsLoggedIn]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primaryColorSky} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
