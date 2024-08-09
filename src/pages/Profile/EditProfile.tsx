import {
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Setting from '../../..//assets/images/setting.svg';
import CustomModal from '../../components/CustomModal';
import Profile from '../../../assets/images/userprofile.svg';
import CustomBtn from '../../components/CustomBtn';
import Camera from '../../../assets/images/camera.svg';
const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleImageSelection = () => {};

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Setting />
      </TouchableOpacity>
      <CustomModal isOpen={modalVisible}>
        <View style={styles.card}>
          <View style={styles.camera}>
            <Camera />
          </View>
          <Profile />
          <TextInput style={styles.title}>억지로 웃는 고양이</TextInput>

          <View style={styles.btnstlye}>
            <CustomBtn text="확인" onPress={handleImageSelection} />
            <CustomBtn
              text="닫기"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 300,
    maxWidth: 300,
    height: 300,
    maxHeight: 300,
    padding: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    right: 80,
    top: 30,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
  },
  btnstlye: {
    width: '48%',
    gap: 20,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;
