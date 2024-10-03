import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  TextInput,
  Switch,
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
  emailState,
  logout,
  removeTokens,
} from '../../atoms/authAtom';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';

function UserProfile({navigation}: ProfileScreenProps) {
  const {accessToken} = useRecoilValue(tokenState);
  const email = useRecoilValue(emailState);
  const setTokens = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const [LogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false); // 어플 보호 잠금 상태

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await logout(setTokens, setIsLoggedIn);
      Alert.alert('성공', '로그아웃되었습니다.');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      Alert.alert('오류', '로그아웃에 실패했습니다.');
    }
  };

  // 탈퇴 처리 함수
  const handleWithdraw = async () => {
    try {
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

      if (response.status === 200) {
        Alert.alert('성공', '탈퇴가 완료되었습니다.');
        await removeTokens(setTokens, setIsLoggedIn);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        Alert.alert('오류', '탈퇴 처리에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '탈퇴 처리 중 문제가 발생했습니다.');
    }
  };

  // 어플 보호 잠금 상태 업데이트
  const handleToggleAppLock = async () => {
    try {
      const newStatus = !isAppLockEnabled;
      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/user-lock-toggle`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({status: newStatus}),
        },
      );

      if (response.status === 200) {
        setIsAppLockEnabled(newStatus);
        Alert.alert('성공', '어플 보호 잠금 상태가 변경되었습니다.');
      } else {
        Alert.alert('오류', '어플 보호 잠금 상태 변경에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '어플 보호 잠금 상태 변경 중 문제가 발생했습니다.');
    }
  };

  // 프로필 조회 함수
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setNickname(data.nickname || '닉네임이 없습니다');
        setProfileUrl(data.profileUrl || '');
      } else {
        Alert.alert('오류', '프로필 조회에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '프로필 조회 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // 이미지 선택 핸들러
  const handleImageSelection = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // 프로필 업데이트 함수
  const handleProfileUpdate = async () => {
    if (!newNickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('editedNickname', newNickname);

      if (selectedImage) {
        const uri = selectedImage.uri?.replace('file://', '');
        const file = {
          uri,
          type: selectedImage.type || 'image/jpeg',
          name: selectedImage.fileName || 'profile.jpg',
        };
        formData.append('file', file);
      }

      const response = await fetch(`${Config.API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        setNickname(data.nickname);
        setProfileUrl(data.profileUrl);
        Alert.alert('성공', '프로필이 성공적으로 수정되었습니다.');
        setModalVisible(false);
      } else if (response.status === 409) {
        Alert.alert('오류', '동일한 프로필 사진입니다.');
      } else {
        Alert.alert('오류', '프로필 수정에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '프로필 수정 중 문제가 발생했습니다.');
    }
  };

  return (
    <ImageBackground
      style={{height: '100%'}}
      resizeMode={'cover'}
      source={Images.backgroundImage}>
      <View>
        <View style={styles.container}>
          <View style={styles.profile}>
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

          <View style={styles.usersection}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.usersectionlist}>
                <Text style={styles.title}>프로필 수정</Text>
              </View>
            </TouchableOpacity>

            {/* 프로필 수정 모달 */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FontAwesome
                    name="close"
                    size={24}
                    color={colors.darkBrown}
                    onPress={() => setModalVisible(false)}
                    style={styles.closeIcon}
                  />

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
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={handleProfileUpdate}>
                      <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* 어플 보호 잠금 섹션 */}
            <View style={styles.switchContainer}>
              <Text style={styles.title}>어플 보호 잠금</Text>
              <Switch
                value={isAppLockEnabled}
                onValueChange={handleToggleAppLock}
              />
            </View>

            {/* 유저 추가 정보 수정 섹션 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDataEdit');
              }}>
              <View style={styles.usersectionlist}>
                <Text style={styles.title}>추가 정보 수정</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.status}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setLogoutModalVisible(true)}>
              <FontAwesome name="sign-out" size={24} color={colors.darkBrown} />
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={() => setWithdrawModalVisible(true)}>
              <FontAwesome name="trash" size={24} color={colors.darkBrown} />
              <Text style={styles.buttonText}>탈퇴하기</Text>
            </TouchableOpacity>
          </View>

          {/* 로그아웃 다이얼로그 */}
          <YesNoDialog
            visible={LogoutModalVisible}
            message="로그아웃 하시겠습니까?"
            yesText="네"
            noText="아니요"
            yesCallback={handleLogout}
            noCallback={() => setLogoutModalVisible(false)}
          />

          {/* 탈퇴 다이얼로그 */}
          <YesNoDialog
            visible={withdrawModalVisible}
            message="탈퇴 하시겠습니까?"
            yesText="네"
            noText="아니요"
            yesCallback={handleWithdraw}
            noCallback={() => setWithdrawModalVisible(false)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 60,
  },
  profile: {
    alignItems: 'center',
    padding: 14,
    width: '100%',
    borderBottomColor: colors.darkBrown,
    borderBottomWidth: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: colors.primaryColorSky,
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
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
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
    width: '90%',
    gap: 10,
  },
  confirmButton: {
    backgroundColor: colors.secondaryColorNavy,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default UserProfile;
