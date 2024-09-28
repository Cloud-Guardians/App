import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: {user_email: string} | undefined;
  SignUp: undefined;
  AddProfile: undefined;
  FindByPassword: undefined;
  Home: undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export type FindByPasswordScreenProps = StackScreenProps<
  RootStackParamList,
  'FindByPassword'
>;
export type AddProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'AddProfile'
>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
