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

// 토큰 저장을 중앙에서 처리
const saveTokens = async (newAccessToken: string, newRefreshToken: string) => {
  await AsyncStorage.setItem('accessToken', newAccessToken);
  await AsyncStorage.setItem('refreshToken', newRefreshToken);
  setRecoil(tokenState, {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    fcmToken: (await AsyncStorage.getItem('fcmToken')) || null,
  });
  setRecoil(isLoggedInState, true);
};

export const makeApiRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  contentType?: string,
  navigation?: any,
  requiresAuth: boolean = true,
) => {
  try {
    let accessToken: string | null = await getAccessToken();

    if (requiresAuth && !accessToken) {
      console.warn('액세스 토큰이 없습니다. 리프레시 토큰으로 갱신 시도.');
      accessToken = await refreshAccessToken(navigation);
    }

    let requestData: any = data || null;

    if (contentType === 'multipart/form-data') {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      requestData = formData;
    } else if (contentType === 'application/json') {
      requestData = JSON.stringify(data);
    }

    const headers: any = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
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

    if (requiresAuth && error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(navigation);
        if (newAccessToken) {
          const retryConfig: AxiosRequestConfig = {
            method,
            url,
            data: requestData,
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
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
        setRecoil(tokenState, {
          accessToken: null,
          refreshToken: null,
          fcmToken: null,
        });
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
      refreshToken: refreshToken.replace('Bearer ', ''),
    });

    if (response.status === 200) {
      const newAccessToken = response.data.accessToken.replace('Bearer ', '');
      const newRefreshToken = response.data.refreshToken.replace('Bearer ', '');

      console.log('갱신된 액세스 토큰:', newAccessToken);
      console.log('갱신된 리프레시 토큰:', newRefreshToken);

      // 토큰 저장 및 Recoil 상태 업데이트
      await saveTokens(newAccessToken, newRefreshToken);

      return newAccessToken;
    } else {
      throw new Error('토큰 갱신 실패');
    }
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    Alert.alert('세션 만료', '세션이 만료되었습니다. 다시 로그인해 주세요.');

    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setRecoil(tokenState, {
      accessToken: null,
      refreshToken: null,
      fcmToken: null,
    });
    setRecoil(isLoggedInState, false);

    if (navigation) {
      navigation.navigate('Login');
    }
    throw error;
  }
};
