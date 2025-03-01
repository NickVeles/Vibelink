import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { CheckIcon, XMarkIcon } from '@/components/ui/Icon';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  cancelText?: string;
  acceptText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  cancelText,
  acceptText,
  onConfirm,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <CheckIcon height={24} width={24} stroke="#121212" />
                {acceptText && (
                  <Text style={styles.buttonText}>{acceptText}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <XMarkIcon height={24} width={24} stroke="#f2f2f2" />
                {cancelText && (
                  <Text style={[styles.buttonText, { color: '#f2f2f2' }]}>
                    {cancelText}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(75, 75, 75, 0.1)',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'rgb(176, 72, 91)',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
