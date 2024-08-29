import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fonts from '../../constants/fonts';
import colors from '../../constants/colors';

interface YesNoDialogProps {
  visible: boolean;
  message: string;
  yesText: string;
  noText: string;
  yesCallback: () => void;
  noCallback: () => void;
}

const YesNoDialog: React.FC<YesNoDialogProps> = ({
  visible,
  message,
  yesText,
  noText,
  yesCallback,
  noCallback,
}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.rootContainer}>
        <View style={styles.dialogContainer}>
          <Text style={styles.contentText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={yesCallback}
              style={styles.buttonWrapper}>
              <Text style={styles.dialogButton}>{yesText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={noCallback} style={styles.buttonWrapper}>
              <Text style={styles.dialogButton}>{noText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    width: '80%',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  contentText: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: Fonts.MapoFont,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.secondaryColorNavy,
    borderRadius: 10,
    alignItems: 'center',
  },
  dialogButton: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    fontWeight: '600',
  },
});

export default YesNoDialog;
