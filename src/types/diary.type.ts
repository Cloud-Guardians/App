// navigation/RootStackParamList.ts
import {StackScreenProps} from '@react-navigation/stack';

export type DiaryData = {
  emotionId: number;
  diaryId: number;
  joy: number;
  sadness: number;
  anger: number;
  anxiety: number;
  boredom: number;
  date: string;
  title: string;
  content: string;
  photoUrl?: string;
};

export type RootStackParamList = {
  DiaryEmotion: {diaryId?: number; emotionId?: number}; // Recoil을 통해 상태 관리
  Dailys: {diaryId?: number};
  MyDiary: {diaryId?: number; emotionId?: number}; // diaryId를 MyDiary로 전달
  DailyAnalyze: {diaryId?: number; emotionId?: number};
  DiaryLoading: undefined;
  DailyDiary: {diaryId: number};
};

// 각 화면별 Props 타입 정의
export type DiaryEmotionProps = StackScreenProps<
  RootStackParamList,
  'DiaryEmotion'
>;
export type DailysProps = StackScreenProps<RootStackParamList, 'Dailys'>;
export type MyDiaryProps = StackScreenProps<RootStackParamList, 'MyDiary'>;
export type DailyAnalyzeProps = StackScreenProps<
  RootStackParamList,
  'DailyAnalyze'
>;
export type DiaryLoadingProps = StackScreenProps<
  RootStackParamList,
  'DiaryLoading'
>;
export type DailyDiaryProps = StackScreenProps<
  RootStackParamList,
  'DailyDiary'
>;
