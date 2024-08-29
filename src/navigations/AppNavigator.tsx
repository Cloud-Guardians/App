import {Text, Platform, View} from 'react-native';
import HomePage from '../pages/Home/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import DiaryPage from '../pages/DiaryPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MyPage from '../pages/MyPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';

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

const AppNavigator = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default AppNavigator;
