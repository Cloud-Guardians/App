import axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAccessToken, getRefreshToken} from '../atoms/authAtom';
import {tokenState, isLoggedInState} from '../atoms/authAtom';
import {setRecoil} from 'recoil-nexus';

const api = axios.create({
  baseURL: `${Config.API_BASE_URL}/api`,
  timeout: 10000,
});

export const makeApiRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  contentType?: string,
  navigation?: any,
  requiresAuth: boolean = true,
) => {
  try {
    let accessToken: string | null = null;

    if (requiresAuth) {
      accessToken = await getAccessToken();

      if (!accessToken) {
        console.warn('액세스 토큰이 없습니다. 리프레시 토큰으로 갱신 시도.');
        accessToken = await refreshAccessToken(navigation);
      }
    }

    // 요청할 데이터를 담을 변수
    let requestData: any = data;

    // multipart/form-data일 경우 FormData 객체로 변환
    if (contentType === 'multipart/form-data') {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      requestData = formData;
    } else if (contentType === 'application/json') {
      requestData = JSON.stringify(data); // JSON 데이터 직렬화
    }

    // Authorization 헤더에서 Bearer 중복 방지
    const headers: any = {
      ...(accessToken
        ? {
            // accessToken에 Bearer가 붙어있으면 그대로 사용, 아니면 Bearer를 붙여서 전송
            Authorization: accessToken.includes('Bearer ')
              ? accessToken
              : `Bearer ${accessToken}`,
          }
        : {}),
      'Content-Type': contentType || 'application/json',
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      data: requestData,
      headers,
    };

    const response = await api.request(config);
    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
    };
  } catch (error: any) {
    console.error(
      'API 요청 오류:',
      error.response ? error.response.data : error.message,
    );

    // 인증이 필요한 요청에서만 401 에러 처리
    if (requiresAuth && error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(navigation);
        if (newAccessToken) {
          const retryConfig: AxiosRequestConfig = {
            method,
            url,
            data: requestData, // 갱신된 토큰으로 다시 전송할 때도 requestData 사용
            headers: {
              Authorization: newAccessToken.includes('Bearer ')
                ? newAccessToken
                : `Bearer ${newAccessToken}`, // Bearer 중복 방지
              'Content-Type': contentType || 'application/json',
            },
          };
          const retryResponse = await api.request(retryConfig);
          return {
            data: retryResponse.data,
            headers: retryResponse.headers,
            status: retryResponse.status,
          };
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        setRecoil(tokenState, {accessToken: null, refreshToken: null});
        setRecoil(isLoggedInState, false);
        if (navigation) {
          navigation.navigate('Login');
        }
        throw new Error('Unauthorized');
      }
    }

    throw error;
  }
};

const refreshAccessToken = async (navigation: any): Promise<string | null> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    console.error('리프레시 토큰이 없습니다. 로그인 페이지로 이동합니다.');
    Alert.alert('로그인이 필요합니다', '다시 로그인해 주세요.');
    if (navigation) {
      navigation.navigate('Login');
    }
    return null;
  }

  try {
    const response = await axios.post(`${Config.API_BASE_URL}/auth/refresh`, {
      refreshToken: refreshToken.replace('Bearer ', ''), // Bearer 제거
    });

    if (response.status === 200) {
      const newAccessToken = response.data.accessToken.replace('Bearer ', ''); // Bearer 제거
      const newRefreshToken = response.data.refreshToken.replace('Bearer ', ''); // Bearer 제거

      console.log('갱신된 액세스 토큰:', newAccessToken);
      console.log('갱신된 리프레시 토큰:', newRefreshToken);

      // 토큰 저장 및 Recoil 상태 업데이트
      await AsyncStorage.setItem('accessToken', newAccessToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);
      setRecoil(tokenState, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      setRecoil(isLoggedInState, true);

      return newAccessToken;
    } else {
      throw new Error('토큰 갱신 실패');
    }
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    Alert.alert('세션 만료', '세션이 만료되었습니다. 다시 로그인해 주세요.');

    // 토큰 삭제 및 상태 초기화
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setRecoil(tokenState, {accessToken: null, refreshToken: null});
    setRecoil(isLoggedInState, false);

    if (navigation) {
      navigation.navigate('Login');
    }
    throw error;
  }
};
