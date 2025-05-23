import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ColorPicker, {
  Panel1,
  HueSlider,
  returnedResults,
} from 'reanimated-color-picker';
import { CheckIcon } from '@/components/ui/Icon';

interface ColorPickerModalProps {
  visible: boolean;
  color: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  visible,
  color,
  onColorSelect,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [selectedColor, setSelectedColor] = useState(color);

  useEffect(() => {
    setIsVisible(visible);
    setSelectedColor(color);
  }, [visible, color]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleColorChange = (color: returnedResults) => {
    'worklet';
    setSelectedColor(color.hex);
  };

  const handleColorSelect = () => {
    onColorSelect(selectedColor);
    handleClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <ColorPicker
              style={styles.colorPicker}
              value={selectedColor}
              sliderThickness={20}
              thumbSize={24}
              onChange={handleColorChange}
            >
              <Panel1 />
              <HueSlider />
            </ColorPicker>
            <TouchableOpacity style={styles.button} onPress={handleColorSelect}>
              <CheckIcon height={24} width={24} stroke="#121212" />
            </TouchableOpacity>
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
    gap: 10,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(75, 75, 75, 0.1)',
    borderRadius: 5,
  },
  colorPicker: {
    flex: 1,
    gap: 10,
    width: '100%',
  },
});
