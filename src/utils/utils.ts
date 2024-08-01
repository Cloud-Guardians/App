import {Dimensions} from 'react-native';

// 피그마 기준 width, height
export const basicDimensions = {
  height: 816,
  width: 390,
};

export const getSize = (px: number) => {
  return Number(
    (Dimensions.get('screen').width * (px / basicDimensions.width)).toFixed(2),
  );
};