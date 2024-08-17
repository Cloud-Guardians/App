import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Emotion: undefined; //{userId: string} 넘겨주기
  Collection: undefined;
};

export type staticsticsProps = StackScreenProps<
  RootStackParamList,
  'Emotion' | 'Collection'
>;
