// src/atoms/authAtom.ts
import {atom, SetterOrUpdater} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Recoil atoms
export const tokenState = atom<{
  accessToken: string | null;
  refreshToken: string | null;
}>({
  key: 'tokenState',
  default: {
    accessToken: null,
    refreshToken: null,
  },
});

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedInState',
  default: false,
});

// 이메일 상태 추가
export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

// 비밀번호 상태 추가
export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});

// 이름 상태 추가
export const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

// 성별 상태 추가
export const genderState = atom<'m' | 'w' | ''>({
  key: 'genderState',
  default: '',
});

// 생년월일 상태 추가
export const birthdateState = atom<string>({
  key: 'birthdateState',
  default: '',
});

// 출생 시간 상태 추가
export const birthTimeState = atom<string>({
  key: 'birthTimeState',
  default: '모름',
});
// 토큰 저장 함수
export const storeTokens = async (
  accessToken: string,
  refreshToken: string,
  setTokens: SetterOrUpdater<{
    accessToken: string | null;
    refreshToken: string | null;
  }>,
  setIsLoggedIn: SetterOrUpdater<boolean>,
) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    // Recoil 상태 업데이트
    setTokens({accessToken, refreshToken});
    setIsLoggedIn(true);
    console.log('토큰 저장 및 상태 업데이트 성공:', {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('토큰 저장 중 오류 발생:', error);
  }
};
// 액세스 토큰 가져오기
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('액세스 토큰 가져오기 실패:', error);
    return null;
  }
};

// 리프레시 토큰 가져오기
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return refreshToken;
  } catch (error) {
    console.error('리프레시 토큰 가져오기 실패:', error);
    return null;
  }
};
// axios 인터셉터 설정
export const setupAxiosInterceptors = (
  setTokens: SetterOrUpdater<{
    accessToken: string | null;
    refreshToken: string | null;
  }>,
  setIsLoggedIn: SetterOrUpdater<boolean>,
) => {
  axios.interceptors.request.use(
    async config => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      // 토큰이 만료되었을 때 (401)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = await getRefreshToken();

        if (refreshToken) {
          try {
            // 새 accessToken 요청
            const {data} = await axios.post('/auth/refresh-token', {
              refreshToken,
            });
            const newAccessToken = data.accessToken;

            // 새 토큰을 AsyncStorage와 Recoil에 저장
            await storeTokens(
              newAccessToken,
              refreshToken,
              setTokens,
              setIsLoggedIn,
            );

            // 새 토큰으로 원래 요청 재시도
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('토큰 갱신 실패:', refreshError);
            await logout(setTokens, setIsLoggedIn);
          }
        } else {
          // refreshToken이 없으면 로그아웃 처리
          await logout(setTokens, setIsLoggedIn);
        }
      }

      return Promise.reject(error);
    },
  );
};
// 토큰 삭제 함수
export const removeTokens = async (
  setTokens: SetterOrUpdater<{
    accessToken: string | null;
    refreshToken: string | null;
  }>,
  setIsLoggedIn: SetterOrUpdater<boolean>,
) => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    // Recoil 상태 초기화
    setTokens({accessToken: null, refreshToken: null});
    setIsLoggedIn(false);
    console.log('토큰 삭제 및 상태 초기화 성공');
  } catch (error) {
    console.error('토큰 삭제 중 오류 발생:', error);
  }
};

// AsyncStorage에서 토큰 로드 및 Recoil 상태 업데이트
export const loadTokensFromStorage = async (
  setTokens: SetterOrUpdater<{
    accessToken: string | null;
    refreshToken: string | null;
  }>,
  setIsLoggedIn: SetterOrUpdater<boolean>,
) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setTokens({accessToken, refreshToken});
      setIsLoggedIn(true);
      console.log('토큰 로드 및 상태 업데이트 성공');
    } else {
      setTokens({accessToken: null, refreshToken: null});
      setIsLoggedIn(false);
      console.log('토큰이 존재하지 않습니다. 로그인 필요');
    }
  } catch (error) {
    console.error('토큰 로드 중 오류 발생:', error);
  }
};

export const logout = async (
  setTokens: SetterOrUpdater<{
    accessToken: string | null;
    refreshToken: string | null;
  }>,
  setIsLoggedIn: SetterOrUpdater<boolean>,
) => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    // Recoil 상태 초기화
    setTokens({accessToken: null, refreshToken: null});
    setIsLoggedIn(false);
    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  }
};
