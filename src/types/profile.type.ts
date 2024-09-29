import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Profile: {userId: string}; // {userId: string} 전달
  UserDataEdit: undefined;
  UserAlarm: undefined;
  LockScreen: undefined;
  WhisperAlarm: undefined;
  WhisperAlarmDetail: {alarmId: string}; // 예시로 alarmId 추가
  DiaryAlarm: undefined;
  DiaryAlarmDetail: {alarmId: string};
  Login: undefined;
  Admin: undefined;
  DiaryNotification: undefined;
  UserLockScreen: undefined;
  WhisperNotification: undefined;
};
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'Profile'
>;
export type AddUserfileScreenProps = StackScreenProps<
  RootStackParamList,
  'UserDataEdit'
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

export type DiaryNotificationProps = StackScreenProps<
  RootStackParamList,
  'DiaryNotification'
>;

export type UserLockScreenProps = StackScreenProps<
  RootStackParamList,
  'UserLockScreen'
>;

export type WhisperNotificationProps = StackScreenProps<
  RootStackParamList,
  'WhisperNotification'
>;
