import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../pages/Home/HomePage';
import MyPage from '../pages/MyPage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import React from 'react';
import TabBarView from './TabBarView/TabBarView';
import {
  CommunityScreens,
  ReportScreens,
  RouteNames,
  StackNames,
} from '../constants/strings';
import CommmunityPage from '../pages/Community/CommunityPage';
import PostingDetail from '../pages/Community/PostingDetail/PostingDetailPage';
import ReportManagePage from '../pages/Profile/Report/ReportManagePage/ReportManagePage';
import CommunityUserProfile from '../pages/Community/CommunityUserProfile/CommunityUserProfile';
import CommentPage from '../pages/Community/CommentPage/CommentPage';
import WhisperPage from '../pages/Whisper/WhisperPage/Whisper';
import {jwtTokenState} from '../atoms/authAtom';
import {useRecoilValue} from 'recoil';
import AuthStack from '../pages/Auth/AuthStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.homeStack}
      component={HomePage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const StatisticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.statisticsStack}
      component={StatisticsPage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const DiaryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.diaryStack}
      component={DiaryPage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.communityStack}
      component={CommmunityPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={CommunityScreens.PostDetailPage}
      component={PostingDetail}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={CommunityScreens.CommentPage}
      component={CommentPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={CommunityScreens.CommunityUserProfile}
      component={CommunityUserProfile}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={CommunityScreens.WhisperPage}
      component={WhisperPage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={StackNames.mypageStack}
      component={MyPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={ReportScreens.ReportManagePage}
      component={ReportManagePage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

// 탭바 숨김이 필요한 리스트
const hideTabBarList: string[] = [
  ...Object.values(CommunityScreens),
  ...Object.values(ReportScreens),
];

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
  const token = useRecoilValue(jwtTokenState);
  return (
    <NavigationContainer>
      {/* {token ? <TabNavigator /> : <AuthStack />} */}
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
