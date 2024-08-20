import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import CustomModal from '../../components/CustomModal';
import Loud from '../../../assets/images/loudspeaker.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const NoticePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const notices = [
    {
      id: '1',
      title: '공지사항 1',
      description: '이것은 공지사항 1의 내용입니다.',
    },
    {
      id: '2',
      title: '공지사항 2',
      description: '이것은 공지사항 2의 내용입니다.',
    },
    {
      id: '3',
      title: '공지사항 3',
      description: '이것은 공지사항 3의 내용입니다.',
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Loud />
      </TouchableOpacity>

      <CustomModal isOpen={modalVisible}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="times" size={24} color={colors.darkBrown} />
          </TouchableOpacity>
          {notices.map(notice => (
            <View key={notice.id} style={styles.noticeItem}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.noticeText}>{notice.description}</Text>
              <View style={styles.underline} />
            </View>
          ))}
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 340,
    maxWidth: 340,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  noticeItem: {
    marginBottom: 20,
    padding: 10,
  },
  noticeTitle: {
    fontFamily: Fonts.MapoFont,
    fontSize: 18,
    color: colors.black,
    marginBottom: 5,
  },
  noticeText: {
    fontFamily: Fonts.MapoFont,
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  underline: {
    height: 1,
    backgroundColor: colors.lightBrown,
    marginTop: 10,
  },
});

export default NoticePage;
