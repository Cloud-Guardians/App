import axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: `${Config.API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API_BASE_URL:', Config.API_BASE_URL);

export const makeApiRequest = async (
  method: string,
  url: string,
  data?: any,
  token?: string, // token은 선택적으로 전달됨
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {
      ...api.defaults.headers.common,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  try {
    const response = await api.request(config);
    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
    };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Access Token 만료 등의 이유로 인증 실패 시 에러 반환
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

export default api;
