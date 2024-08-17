import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined; //{userId: string} 넘겨주기
  SignUp: undefined;
  FindByPassword: undefined;
};

export type UserProps = StackScreenProps<
  RootStackParamList,
  'Login' | 'SignUp' | 'FindByPassword'
>;
