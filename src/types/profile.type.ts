import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Profile: undefined; //{userId: string} 넘겨주기
  AddProfile: undefined;
  UserAlarm: undefined;
  LockScreen: undefined;
};

export type profileProps = StackScreenProps<
  RootStackParamList,
  'Profile' | 'AddProfile' | 'UserAlarm' | 'LockScreen'
>;
