// src/utils/apiClient.js

import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL:
    'http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 요청 타임아웃 설정 (필요 시 조정)
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  config => {
    console.log('--- Axios Request Start ---');
    console.log('URL:', config.baseURL + config.url);
    console.log('Method:', config.method.toUpperCase());
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('----------------------------');
    return config;
  },
  error => {
    console.error('--- Axios Request Error ---');
    console.error(error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  response => {
    console.log('--- Axios Response Start ---');
    console.log('URL:', response.config.baseURL + response.config.url);
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('-----------------------------');
    return response;
  },
  error => {
    if (error.response) {
      console.error('--- Axios Response Error ---');
      console.error(
        'URL:',
        error.response.config.baseURL + error.response.config.url,
      );
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      console.error('------------------------------');
    } else if (error.request) {
      console.error('--- Axios No Response ---');
      console.error(error.request);
      console.error('--------------------------');
    } else {
      console.error('--- Axios Error Message ---');
      console.error(error.message);
      console.error('----------------------------');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
