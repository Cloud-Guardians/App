import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: {user_email: string} | undefined;
  SignUp: undefined;
  AddProfile: undefined;
  FindByPassword: undefined;
  Home: undefined;
};

export type UserProps = StackScreenProps<
  RootStackParamList,
  'Login' | 'SignUp' | 'FindByPassword' | 'AddProfile' | 'Home'
>;
