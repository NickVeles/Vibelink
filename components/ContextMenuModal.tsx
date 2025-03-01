import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  EditIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from '@/components/ui/Icon';

interface ContextMenuModalProps {
  visible: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ContextMenuModal: React.FC<ContextMenuModalProps> = ({
  visible,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDelete,
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

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleMoveUp = () => {
    onMoveUp();
    handleClose();
  };

  const handleMoveDown = () => {
    onMoveDown();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleClose}
        activeOpacity={1}
      >
        <View style={styles.modal}>
          <TouchableOpacity style={styles.option} onPress={handleEdit}>
            <EditIcon height={24} width={24} stroke="#121212" />
            <Text style={styles.optionText}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.option} onPress={handleMoveUp}>
            <ChevronUpIcon height={24} width={24} stroke="#121212" />
            <Text style={styles.optionText}>Move up</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.option} onPress={handleMoveDown}>
            <ChevronDownIcon height={24} width={24} stroke="#121212" />
            <Text style={styles.optionText}>Move down</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.option} onPress={handleDelete}>
            <TrashIcon height={24} width={24} stroke="#121212" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  spacer: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(75, 75, 75, 0.1)',
  },
});
