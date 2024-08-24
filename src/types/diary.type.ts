import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  DiaryEmotion: undefined;
  DailyDiary: undefined;
  MyDiary: {diaryId: number; updatedDiary?: any};
  DailyAnalyze: undefined;
};

export type dailyProps = StackScreenProps<
  RootStackParamList,
  'DiaryEmotion' | 'DailyDiary' | 'MyDiary' | 'DailyAnalyze'
>;
