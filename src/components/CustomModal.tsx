import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const CustomModal = ({isOpen, withInput, children, ...rest}: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.contents}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.modalcontents}>{children}</View>
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}>
      {content}
    </Modal>
  );
};

const styles = StyleSheet.create({
  contents: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },

  modalcontents: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default CustomModal;
