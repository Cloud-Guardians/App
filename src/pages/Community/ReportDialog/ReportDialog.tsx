import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import S from './style';
import { Strings } from '../../../constants/strings';

type ReportDialogProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (selectedOption: string, additionalInfo?: string) => void;
};

const reportOptions = [
  '영리목적/홍보성',
  '저작권 침해',
  '음란성/선정성',
  '욕설/인신공격',
  '개인정보 노출',
  '도배',
  '기타',
];

const ReportDialog: React.FC<ReportDialogProps> = ({ visible, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [ otherInfo, setOtherInfo ] = useState<string>('');

  const selectOptionCallback = (option: string) => {
    setSelectedOption(option);
  };

  const submitCallback = () => {
    if (selectedOption) {
      onSubmit(selectedOption, otherInfo);
    }
  };

  return (
    <Modal transparent={true} visible={visible}>
      <S.RootContainer>
        <S.DialogContainer>
          <S.CloseIconContainer>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </S.CloseIconContainer>
          <S.DialogTitle>{Strings.report}</S.DialogTitle>
          <S.TitleUnderline />
          <S.DialogContent>
            {reportOptions.map((option, index) => (
              <S.RadioContainer key={index}>
                <TouchableOpacity onPress={() => selectOptionCallback(option)}>
                  <Icon
                    name={selectedOption === option ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>
                <S.RadioText>{option}</S.RadioText>
              </S.RadioContainer>
            ))}
            <S.OtherInput
              placeholder={Strings.reportOtherHint}
              value={otherInfo}
              onChangeText={setOtherInfo}
              multiline
            />
          </S.DialogContent>
          <S.SubmitButtonContainer>
            <S.SubmitButton onPress={submitCallback} disabled={!selectedOption}>
              <S.SubmitButtonText>{Strings.report}</S.SubmitButtonText>
            </S.SubmitButton>
          </S.SubmitButtonContainer>
        </S.DialogContainer>
      </S.RootContainer>
    </Modal>
  );
};

export default ReportDialog;
