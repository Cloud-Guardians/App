// UserProfile.tsx

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
  Linking,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Profile from '../../../assets/images/userprofile.svg';
import Images from '../../constants/images';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import {ProfileScreenProps} from '../../types/profile.type';
import YesNoDialog from '../../components/YesNoDialog/YesNoDialog';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  tokenState,
  isLoggedInState,
  logout,
  emailState,
} from '../../atoms/authAtom';
import {profileState} from '../../atoms/communityAtom';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import CustomBtn from '../../components/CustomBtn'; // 커스텀 버튼 컴포넌트
import Config from 'react-native-config';

function UserProfile({navigation}: ProfileScreenProps) {
  const {accessToken, refreshToken} = useRecoilValue(tokenState); // 토큰 상태 가져오기
  const email = useRecoilValue(emailState);
  const setEmail = useSetRecoilState(emailState); // 이메일 업데이트를 위한 setter 추가
  const setTokens = useSetRecoilState(tokenState); // 토큰 상태 업데이트를 위한 setter 추가
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const [LogoutModalVisible, setLogoutModalModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [profileUrl, setProfileUrl] = useState(''); // 프로필 URL 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const [newNickname, setNewNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null); // 이미지 상태 추가


  // API에서 프로필 데이터를 가져오는 함수
  const fetchProfile = async () => {
    try {
      console.log('프로필 조회 요청 시작');
      const response = await fetch(`${Config.API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = await response.json();
      console.log('프로필 조회 응답:', responseJson);
      console.log('프로필 조회 데이터:', responseJson.data);

      if (response.status === 200) {
        const data = responseJson.data; // 수정: responseJson.data로 접근
        console.log('프로필 조회 데이터:', data);

        if (data) {
          const fetchedNickname = data.nickname || '닉네임이 없습니다';
          const fetchedProfileUrl = data.profileUrl || '';

          setNickname(fetchedNickname);
          setProfileUrl(fetchedProfileUrl);
          setNewNickname(fetchedNickname);

          // 이메일 설정 부분 제거
          // 이메일은 로그인 시점에 이미 설정됨
        } else {
          console.log('데이터가 존재하지 않습니다:', responseJson.data);
          Alert.alert('오류', '프로필 데이터를 찾을 수 없습니다.');
        }
      } else {
        console.log('프로필 조회 실패 응답:', responseJson);
        Alert.alert(
          '오류',
          responseJson.errorMessage || '프로필 조회에 실패했습니다.',
        );
      }
    } catch (error) {
      console.log('프로필 조회 중 오류 발생:', error);
      Alert.alert('오류', '프로필 조회 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [accessToken]);

  // 이미지 선택 핸들러
  const handleImageSelection = () => {
    console.log('이미지 선택 시작');
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selected = response.assets[0];
        console.log('이미지 선택됨:', selected);
        setSelectedImage(selected); // 선택한 이미지 상태로 설정
      }
    });
  };

  // 프로필 수정 API 호출 using fetch
  const handleProfileUpdate = async () => {
    if (!newNickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      console.log('프로필 수정 요청 시작');
      const formData = new FormData();
      formData.append('editedNickname', newNickname); // 필드 이름 수정

      // 선택한 이미지가 있으면 추가
      if (selectedImage) {
        console.log('이미지 추가 중:', selectedImage);
        const uri =
          Platform.OS === 'android'
            ? selectedImage.uri
            : selectedImage.uri.replace('file://', '');
        const file = {
          uri: uri,
          type: selectedImage.type || 'image/jpeg', // 기본 타입 설정
          name: selectedImage.fileName || 'profile.jpg',
        };
        console.log('첨부 파일:', file);
        formData.append('file', file); // 필드 이름 수정
      }

      // FormData 내용 수동 로그
      console.log('FormData 내용:');
      console.log('editedNickname:', newNickname);
      if (selectedImage) {
        console.log('file:', {
          uri: selectedImage.uri,
          type: selectedImage.type || 'image/jpeg',
          name: selectedImage.fileName || 'profile.jpg',
        });
      }

      const response = await fetch(`${Config.API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // 'Content-Type'을 명시하지 않음. fetch는 자동으로 설정해줍니다.
        },
        body: formData,
      });

      const responseJson = await response.json();
      console.log('프로필 수정 응답:', responseJson);

      if (response.status === 200) {
        // 상태 코드 수정
        const data = responseJson.data.data; // 프로필 수정 응답 구조에 따라 접근
        if (data) {
          const updatedNickname = data.nickname;
          const updatedProfileUrl = data.profileUrl;

          console.log('프로필 수정 성공:', data);

          setNickname(updatedNickname);
          setProfileUrl(updatedProfileUrl);

          Alert.alert('성공', '프로필이 성공적으로 수정되었습니다.');
          await fetchProfile(); // 프로필 갱신
          setModalVisible(false); // 모달 닫기
        } else {
          console.log('데이터가 존재하지 않습니다:', responseJson.data);
          Alert.alert('오류', '프로필 수정 데이터를 찾을 수 없습니다.');
        }
      } else if (response.status === 409) {
        // 동일한 프로필 사진 에러
        Alert.alert('오류', '동일한 프로필 사진입니다.');
      } else {
        console.log('프로필 수정 실패 응답:', responseJson);
        Alert.alert(
          '오류',
          responseJson.errorMessage || '프로필 수정에 실패했습니다.',
        );
      }
    } catch (error) {
      console.log('프로필 수정 중 오류 발생:', error);
      Alert.alert('오류', '프로필 수정 중 문제가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('로그아웃 요청 시작');
      await logout(setTokens, setIsLoggedIn);
      console.log('로그아웃 성공');
      Alert.alert('로그아웃 성공', '로그인 페이지로 이동합니다.');
      navigation.navigate('Login');
    } catch (error) {
      console.log('로그아웃 실패:', error);
      Alert.alert('로그아웃 실패', '다시 시도해 주세요.');
    }
  };

  const handleWithdraw = async () => {
    try {
      console.log('회원 탈퇴 요청 시작');
      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/withdraw`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseJson = await response.json();
      console.log('회원 탈퇴 응답:', responseJson);

      if (response.status === 200) {
        console.log('회원 탈퇴 성공:', responseJson.data);
        Alert.alert('탈퇴 완료', '회원 탈퇴가 완료되었습니다.');
        setTokens({accessToken: '', refreshToken: ''});
        setIsLoggedIn(false);
        navigation.navigate('Login');
      } else {
        console.log('회원 탈퇴 실패 응답:', responseJson);
        Alert.alert(
          '탈퇴 실패',
          responseJson.errorMessage || '탈퇴에 실패했습니다.',
        );
      }
    } catch (error) {
      console.log('회원 탈퇴 중 오류 발생:', error);
      Alert.alert('오류', '회원 탈퇴 중 문제가 발생했습니다.');
    }
  };

  const navigateToAdminPage = () => {
    console.log('관리자 페이지로 이동');
    navigation.navigate('Admin');
  };

  const navigateToAlarm = () => {
    console.log('알림 설정 페이지로 이동');
    navigation.navigate('UserAlarm');
  };

  const navigateToLock = () => {
    console.log('잠금 화면으로 이동');
    navigation.navigate('LockScreen');
  };

  const navigateToMail = () => {
    console.log('이메일 앱 열기');
    Linking.openURL('mailto:cloudians12@gmail.com');
  };

  const adminSection =
    email === 'admin@admin.com'
      ? [
          {
            text: '🚨 유저 관리하기',
            type: 'label',
            action: navigateToAdminPage,
          },
        ]
      : [];

  const userSection = [
    ...adminSection,
    {
      text: '내 정보 수정',
      type: 'label',
      action: () => setModalVisible(true), // 모달 오픈
    },
    {text: '알림 설정', type: 'label', action: navigateToAlarm},
    {text: '어플보호 잠금', type: 'toggle', action: navigateToLock},
    {
      text: '오류 제보',
      type: 'label',
      action: navigateToMail,
    },
  ];

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View>
        <View style={styles.container}>
          <View style={styles.profile}>
            {/* 프로필 이미지가 없을 때 기본 이미지를 사용 */}
            {profileUrl ? (
              <Image source={{uri: profileUrl}} style={styles.profileImage} />
            ) : (
              <Profile />
            )}
            <Text style={styles.title}>
              {nickname ? nickname : '닉네임이 없습니다'}
            </Text>
            <Text style={styles.email}>{email || '이메일이 없습니다'}</Text>
          </View>

          {/* 사용자 설정 섹션 */}
          <View style={styles.usersection}>
            {userSection.map((item, index) => (
              <TouchableOpacity key={index} onPress={item.action}>
                <View style={styles.usersectionlist}>
                  <Text style={styles.title}>{item.text}</Text>
                  {item.type === 'toggle' && <Switch />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.status}>
            {/* 로그아웃 관련 다이얼로그 */}
            <YesNoDialog
              visible={LogoutModalVisible}
              message="로그아웃 하시겠습니까?"
              yesText="네"
              noText="아니요"
              yesCallback={handleLogout}
              noCallback={() => setLogoutModalModalVisible(false)}
            />
            <TouchableOpacity onPress={() => setLogoutModalModalVisible(true)}>
              <Text style={styles.title}>로그아웃</Text>
            </TouchableOpacity>

            {/* 탈퇴 관련 다이얼로그 */}
            <YesNoDialog
              visible={withdrawModalVisible}
              message="탈퇴 하시겠습니까?"
              yesText="네"
              noText="아니요"
              yesCallback={handleWithdraw}
              noCallback={() => setWithdrawModalVisible(false)}
            />
            <TouchableOpacity onPress={() => setWithdrawModalVisible(true)}>
              <Text style={styles.title}>탈퇴하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 프로필 수정 모달 */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleImageSelection}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage.uri}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Profile />
                )}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="닉네임 수정"
                value={newNickname}
                onChangeText={setNewNickname}
              />
              <View style={styles.btnContainer}>
                <CustomBtn text="수정" onPress={handleProfileUpdate} />
                <CustomBtn text="취소" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 60,
    position: 'relative',
  },
  profile: {
    alignItems: 'center',
    gap: 5,
    padding: 14,
    width: '100%',
    borderBottomColor: colors.darkBrown,
    borderBottomWidth: 1,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.MapoFont,
  },
  email: {
    color: colors.darkBrown,
    fontSize: 15,
    fontFamily: Fonts.MapoFont,
  },
  usersection: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
    borderBottomColor: colors.darkBrown,
    borderBottomWidth: 1,
  },
  usersectionlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
  },
  status: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: colors.darkBrown,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default UserProfile;
