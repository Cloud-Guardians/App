// atoms/diaryAtom.ts
import {atom} from 'recoil';

// 감정 상태
export const emotionState = atom<{
  joy: number;
  sadness: number;
  anger: number;
  anxiety: number;
  boredom: number;
}>({
  key: 'diaryEmotionState', // 고유한 키 사용
  default: {
    joy: 0,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    boredom: 0,
  },
});

// 색상 상태
export const colorState = atom<{
  green: string;
  blue: string;
  red: string;
  orange: string;
  black: string;
}>({
  key: 'diaryColorState', // 고유한 키 사용
  default: {
    green: 'rgba(255, 255, 255, 1)',
    blue: 'rgba(255, 255, 255, 1)',
    red: 'rgba(255, 255, 255, 1)',
    orange: 'rgba(255, 255, 255, 1)',
    black: 'rgba(255, 255, 255, 1)',
  },
});

// 수정 모드 상태
export const editModeState = atom<boolean>({
  key: 'diaryEditModeState', // 고유한 키 사용
  default: false,
});

// 감정 ID 상태
export const emotionIdState = atom<number | null>({
  key: 'diaryEmotionIdState', // 고유한 키 사용
  default: null,
});

// 일기 ID 상태
export const diaryIdState = atom<number | null>({
  key: 'diaryDiaryIdState', // 고유한 키 사용
  default: null,
});
