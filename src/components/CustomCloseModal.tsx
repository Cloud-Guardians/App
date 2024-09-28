import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Fonts from '../constants/fonts';
import colors from '../constants/colors';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
  title: string;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onYes,
  onNo,
  title,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onYes} style={styles.yesButton}>
              <Text style={styles.buttonText}>감정수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNo} style={styles.noButton}>
              <Text style={styles.buttonText}>일기수정</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경에 투명도 추가
  },
  modalContent: {
    width: 320,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // Android shadow 효과
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont, // 폰트 스타일 적용
    color: colors.black,
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  yesButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryColorSky, // 기본 색상 적용
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  noButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.secondaryColorNavy,
    borderRadius: 8,
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontFamily: Fonts.MapoFont,
  },
});

export default CustomModal;
