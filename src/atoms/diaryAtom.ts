import {atom} from 'recoil';

export const emotionState = atom({
  key: 'emotionState',
  default: {
    joy: 0,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    boredom: 0,
  },
});

export const colorState = atom({
  key: 'colorState',
  default: {
    joy: 'rgba(255, 255, 255, 1)',
    sadness: 'rgba(255, 255, 255, 1)',
    anger: 'rgba(255, 255, 255, 1)',
    anxiety: 'rgba(255, 255, 255, 1)',
    boredom: 'rgba(255, 255, 255, 1)',
  },
});