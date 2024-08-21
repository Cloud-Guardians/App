import {atom, selector} from 'recoil';
import {nickname} from '../utils/nickname';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});

export const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

export const genderState = atom<string>({
  key: 'genderState',
  default: '',
});

export const birthdateState = atom<string>({
  key: 'birthdateState',
  default: '',
});

export const calendarTypeState = atom<string>({
  key: 'calendarTypeState',
  default: '1',
});

export const birthTimeState = atom<string>({
  key: 'birthTimeState',
  default: '모름',
});

export const jwtTokenState = atom<string | null>({
  key: 'jwtTokenState',
  default: null,
});

export const randomNicknameSelector = selector({
  key: 'randomNicknameSelector',
  get: async () => {
    const randomNickname =
      nickname[Math.floor(Math.random() * nickname.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${randomNickname}${randomNumber}`;
  },
});

export const nicknameState = atom<string>({
  key: 'nicknameState',
  default: '',
});
