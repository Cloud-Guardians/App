import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import S from './style';

interface YesNoDialogProps {
  visible: boolean;
  message: string;
  yesText: string;
  noText: string;
  yesCallback: () => void;
  noCallback: () => void;
}

const YesNoDialog: React.FC<YesNoDialogProps> = ({ visible, message, yesText, noText, yesCallback, noCallback }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <S.RootContainer>
        <S.DialogContainer>
          <S.ContentText>{message}</S.ContentText>
          <S.ButtonContainer>
            <TouchableOpacity onPress={yesCallback}>
              <S.ButtonWrapper>
                <S.DialogButton>{yesText}</S.DialogButton>
              </S.ButtonWrapper>
            </TouchableOpacity>
            <TouchableOpacity onPress={noCallback}>
              <S.ButtonWrapper>
                <S.DialogButton>{noText}</S.DialogButton>
              </S.ButtonWrapper>
            </TouchableOpacity>
          </S.ButtonContainer>
        </S.DialogContainer>
      </S.RootContainer>
    </Modal>
  );
};

export default YesNoDialog;
