import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Profile: {userId: string}; // {userId: string} 전달
  AddProfile: undefined;
  UserAlarm: undefined;
  LockScreen: undefined;
  WhisperAlarm: undefined;
  WhisperAlarmDetail: {alarmId: string}; // 예시로 alarmId 추가
  DiaryAlarm: undefined;
  DiaryAlarmDetail: {alarmId: string};
  Login: undefined;
  Admin: undefined; // 예시로 alarmId 추가
};
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'Profile'
>;
export type AddProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'AddProfile'
>;
export type UserAlarmScreenProps = StackScreenProps<
  RootStackParamList,
  'UserAlarm'
>;
export type LockScreenProps = StackScreenProps<
  RootStackParamList,
  'LockScreen'
>;
export type WhisperAlarmScreenProps = StackScreenProps<
  RootStackParamList,
  'WhisperAlarm'
>;
export type WhisperAlarmDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'WhisperAlarmDetail'
>;
export type DiaryAlarmScreenProps = StackScreenProps<
  RootStackParamList,
  'DiaryAlarm'
>;
export type DiaryAlarmDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'DiaryAlarmDetail'
>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;

export type AdminProps = StackScreenProps<RootStackParamList, 'Admin'>;
