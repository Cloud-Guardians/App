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
  token?: string,
) => {
  const customHeaders: Record<string, string> = token
    ? {Authorization: `Bearer ${token}`}
    : {};

  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {
      ...api.defaults.headers.common,
      ...customHeaders,
    },
  };

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error: any) {
    const errorMsg = 'API request error';

    if (error.response) {
      console.error('API request error:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('API request error: No response received', error.request);
    } else {
      console.error('API request error:', error.message);
    }

    throw new Error(errorMsg);
  }
};

export default api;
