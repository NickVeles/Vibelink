import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Vibe } from '@/models/Vibe';
import Header from '@/components/Header';
import { BackIcon, CheckIcon, SaveIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ConfirmModal } from '@/components/ConfirmModal';
import FloatingButton from '@/components/ui/FloatingButton';
import Color from 'color';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';
import { ColorPickerModal } from '@/components/ColorPickerModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface EditVibeScreenProps {
  vibe: Vibe;
  isDirty: boolean;
  onSave: (vibe: Vibe) => void;
}

export default function AddEditVibeScreen({
  vibe,
  isDirty,
  onSave,
}: EditVibeScreenProps) {
  const router = useRouter();
  const [text, setText] = useState(vibe.text);
  const [emoji, setEmoji] = useState(vibe.emoji);
  const [color, setColor] = useState(vibe.color);
  const [isConfirmable, setIsConfirmable] = useState(vibe.isConfirmable);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // State for ConfirmModal visibility
  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const [isTextError, setIsTextError] = useState(false);
  const [textError, setTextError] = useState('');
  const [isEmojiError, setIsEmojiError] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  useEffect(() => {
    setIsSaveButtonDisabled(isTextError || isEmojiError);
  }, [isTextError, isEmojiError]);

  const handleChangeText = (value: string) => {
    setText(value);

    // Check for text length
    if (text.length > 16) {
      setIsTextError(true);
      setTextError('Your vibe can have at most 16 characters');
    } else if (text.length == 0) {
      setIsTextError(true);
      setTextError('Your vibe cannot be empty');
    } else {
      setIsTextError(false);
      setTextError('');
    }
  };

  const handleEmojiSelected = (emojiObject: EmojiType) => {
    setEmoji(emojiObject.emoji);
    setEmojiPickerVisible(false);

    // Check for empty emoji
    setIsEmojiError(emoji == '');
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setColorPickerVisible(false);
  };

  const handleLeave = async () => {
    if (!isDirty) {
      router.back();
    }

    if (
      vibe.text == text &&
      vibe.emoji == emoji &&
      vibe.color == color &&
      vibe.isConfirmable == isConfirmable
    ) {
      router.back();
    }

    setConfirmModalVisible(true);
  };

  const handleSave = async () => {
    const updatedVibe = {
      id: vibe.id,
      text: text.trim(),
      emoji: emoji,
      color: color,
      isConfirmable: isConfirmable,
    };
    onSave(updatedVibe);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={<BackIcon width={32} height={32} />}
        onLeftPress={handleLeave}
      />

      {/* Content */}
      <ParallaxScrollView>
        {/* Preview */}
        <LinearGradient
          colors={[
            Color(color).rotate(8).hex(),
            color,
            Color(color).rotate(-8).hex(),
          ]}
          start={[1, 0]}
          end={[0, 0.75]}
          style={styles.vibeButton}
          onLayout={(event) => {
            // make space for the emojis
            const { width } = event.nativeEvent.layout;
            setMaxTextWidth(width - 128);
          }}
        >
          {/* Button Content */}
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.vibeText, { maxWidth: maxTextWidth }]}>
            {text}
          </Text>
          <Text style={[styles.emoji, { opacity: 0 }]}>{emoji}</Text>
        </LinearGradient>

        {/* Text */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What's your vibe?</Text>
          <TextInput
            value={text}
            onChangeText={handleChangeText}
            placeholder="e.g. Happy"
            style={[
              styles.input,
              { borderColor: isTextError ? '#b0485b' : '#424242' },
            ]}
          />
          {isTextError && (
            <Text style={[styles.label, { color: '#b0485b' }]}>
              {textError}
            </Text>
          )}
        </View>

        {/* Emoji */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Emoji</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setEmojiPickerVisible(true)}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
          <EmojiPicker
            onEmojiSelected={handleEmojiSelected}
            open={emojiPickerVisible}
            onClose={() => setEmojiPickerVisible(false)}
          />
          {isEmojiError && (
            <Text style={[styles.label, { color: '#b0485b' }]}>
              You have to pick an emoji
            </Text>
          )}
        </View>

        {/* Color Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Color</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setColorPickerVisible(true)}
          >
            <View style={{ flex: 1, backgroundColor: color }} />
          </TouchableOpacity>
        </View>

        {/* Is Confirmable? */}
        <BouncyCheckbox
          size={24}
          fillColor="#b0485b"
          unFillColor="transparent"
          text="Ask me to confirm before sending the vibe"
          iconStyle={{ borderColor: '#b0485b' }}
          innerIconStyle={{ borderWidth: 2, borderColor: '#f2f2f2' }}
          style={styles.inputContainer}
          onPress={setIsConfirmable}
        />
      </ParallaxScrollView>

      {/* Save button */}
      <FloatingButton
        onPress={handleSave}
        color1="#3d9f3c"
        color2="#1b6e13"
        content={<SaveIcon height={50} width={50} />}
        disabled={isSaveButtonDisabled}
      />

      {/* Color Picker Modal */}
      <ColorPickerModal
        visible={colorPickerVisible}
        color={color}
        onColorSelect={handleColorSelect}
        onClose={() => setColorPickerVisible(false)}
      />

      {/* Confirm modal */}
      <ConfirmModal
        visible={confirmModalVisible}
        title="Discard changes?"
        acceptText="Yes"
        cancelText="No, cancel"
        onConfirm={() => router.back()}
        onClose={closeConfirmModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 16,
    right: 16,
  },
  vibeButton: {
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  emoji: {
    fontSize: 32,
  },
  vibeText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#121212',
    padding: 4,
    paddingBottom: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'rgba(255, 255, 255, 0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#424242',
  },
  input: {
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
  },
});
