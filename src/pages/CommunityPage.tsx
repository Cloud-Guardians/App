import React from 'react';
import {RootStackParamList} from '../types/community';
import {createStackNavigator} from '@react-navigation/stack';
import Community from './Community/Community';
import CommunityDetail from './Community/CommunityDetail';
import CommentPage from './Community/Comment/CommentPage';
import { useNavigation } from '@react-navigation/native';

const CommunityPage: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();



  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Community">
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
      <Stack.Screen name="CommentPage" component={CommentPage}/>
    </Stack.Navigator>
  );
};

export default CommunityPage;
