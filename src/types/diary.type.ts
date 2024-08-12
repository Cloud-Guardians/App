import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  DiaryEmotion: undefined; //{userId: string} 넘겨주기
  DailyDiary: undefined;
  MyDiary: undefined;
  DailyAnalyze: undefined;
};

export type dailyProps = StackScreenProps<
  RootStackParamList,
  'DiaryEmotion' | 'DailyDiary' | 'MyDiary' | 'DailyAnalyze'
>;
