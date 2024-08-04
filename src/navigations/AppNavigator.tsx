import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/Home/HomePage';
import MyPage from '../pages/MyPage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import React from 'react';
import TabBarView from './TabBarView/TabBarView';
import { CommunityScreens, RouteNames, StackNames } from '../constants/strings';
import CommmunityPage from '../pages/Community/CommunityPage';
import PostingDetail from '../pages/Community/PostingDetail/PostingDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.homeStack}
      component={HomePage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={CommunityScreens.PostDetail}
      component={PostingDetail}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const StatisticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.statisticsStack}
      component={StatisticsPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const DiaryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.diaryStack}
      component={DiaryPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.communityStack}
      component={CommmunityPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.mypageStack}
      component={MyPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// 탭바 숨김이 필요한 리스트
const hideTabBarList: string[] = [...Object.values(CommunityScreens)];

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        const currentRoute = props.state.routes[props.state.index];
        if (currentRoute.state?.index) {
          const stackRouteName =
            currentRoute.state?.routes[currentRoute.state.index];
          if (
            hideTabBarList.findIndex(
              element => element === stackRouteName?.name,
            ) > -1
          ) {
            return null;
          }
        }

        return <TabBarView {...props} />;
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={RouteNames.home} component={HomeStack} />
      <Tab.Screen name={RouteNames.statistics} component={StatisticsStack} />
      <Tab.Screen name={RouteNames.diary} component={DiaryStack} />
      <Tab.Screen name={RouteNames.community} component={CommunityStack} />
      <Tab.Screen name={RouteNames.mypage} component={MyStack} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
