import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰 저장 함수
export const storeTokens = async (
  accessToken: string | null,
  refreshToken: string | null,
) => {
  try {
    if (accessToken && refreshToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('토큰 저장 성공:', {accessToken, refreshToken});
    } else {
      console.warn('저장하려는 토큰 값이 null입니다.', {
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw new Error('토큰 저장 실패');
  }
};
// 액세스 토큰 가져오기
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      console.log('액세스 토큰:', accessToken);
      return accessToken;
    } else {
      console.warn('액세스 토큰이 존재하지 않습니다.');
      return null;
    }
  } catch (error) {
    console.error('액세스 토큰 가져오기 실패:', error);
    throw new Error('액세스 토큰 가져오기 실패');
  }
};

// 리프레시 토큰 가져오기
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    console.log('리프레시 토큰:', refreshToken);
    return refreshToken;
  } catch (error) {
    console.error('리프레시 토큰 가져오기 실패:', error);
    throw new Error('리프레시 토큰 가져오기 실패');
  }
};

// 토큰 삭제 함수
export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('토큰 삭제 성공');
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
    throw new Error('토큰 삭제 실패');
  }
};
