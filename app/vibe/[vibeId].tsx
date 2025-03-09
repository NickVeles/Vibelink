import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Vibe } from '@/models/Vibe';
import Header from '@/components/Header';
import { BackIcon, SaveIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ConfirmModal } from '@/components/ConfirmModal';
import FloatingButton from '@/components/ui/FloatingButton';
import Color from 'color';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';
import { ColorPickerModal } from '@/components/ColorPickerModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DataContext from '@/components/DataContext';
import { v4 as uuidv4, validate } from 'uuid';
import { ThemedText } from '@/components/ThemedText';

const defaultVibe: Vibe = {
  id: '',
  text: '',
  emoji: '',
  color: '#000',
  isConfirmable: false,
};

export default function VibeEditScreen() {
  const router = useRouter();
  const { vibeId } = useLocalSearchParams();
  const dataContext = useContext(DataContext);

  const [vibe, setVibe] = useState(defaultVibe);
  const [text, setText] = useState(vibe.text);
  const [emoji, setEmoji] = useState(vibe.emoji);
  const [color, setColor] = useState(vibe.color);
  const [isConfirmable, setIsConfirmable] = useState(vibe.isConfirmable);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // State for ConfirmModal visibility
  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const [isValidUuid, setIsValidUuid] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [textError, setTextError] = useState('');
  const [isEmojiError, setIsEmojiError] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  useEffect(() => {
    setText(vibe.text.trim().substring(0, 16));
    setEmoji(vibe.emoji);
    setColor(vibe.color);
    setIsConfirmable(vibe.isConfirmable);
  }, [vibe])

  useEffect(() => {
    if (!dataContext) {
      return;
    }

    let isValidId = validate(vibeId)

    // Check for existing vibe
    if (isValidId) {
      const foundVibe = dataContext.vibes.find((v) => v.id === vibeId);
      setVibe(foundVibe!);
    }

    // Add new vibe
    else {
      const newVibe: Vibe = {
        id: uuidv4(),
        text: '',
        emoji: '',
        color: Color('red').rotate(360 * Math.random()).hex(),
        isConfirmable: false,
      };
      setVibe(newVibe);
    }

    setIsValidUuid(true);
  }, [vibeId, dataContext]);

  useEffect(() => {
    setIsSaveButtonDisabled(isTextError || isEmojiError);
  }, [isTextError, isEmojiError]);
  
  // Check for empty text
  useEffect(() => {
    if (text.trim().length == 0) {
      setIsTextError(true);
      setTextError('Your vibe cannot be empty');
    } else {
      setIsTextError(false);
      setTextError('');
    }
  }, [text])

  // Check for empty emoji
  useEffect(() => {
    setIsEmojiError(emoji == '');
  }, [emoji])
  
  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleChangeText = (value: string) => {
    setText(value.substring(0, 16));
  };

  const handleEmojiSelected = (emojiObject: EmojiType) => {
    setEmoji(emojiObject.emoji);
    setEmojiPickerVisible(false);
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setColorPickerVisible(false);
  };

  const handleLeave = async () => {
    if (
      vibe.text == text &&
      vibe.emoji == emoji &&
      vibe.color == color &&
      vibe.isConfirmable == isConfirmable
    ) {
      router.back();
      return;
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

    await dataContext?.addOrUpdateVibe(updatedVibe);

    router.back(); // this doesn't work?
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={<BackIcon width={32} height={32} />}
        onLeftPress={handleLeave}
      />

      {/* Content */}
      <ParallaxScrollView>
        {isValidUuid && (
          <>
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
                {text.trim()? text.trim() : " "}
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
                placeholderTextColor="#999"
                style={[
                  styles.input,
                  { borderColor: isTextError ? '#b0485b' : '#424242' },
                ]}
              />
              <Text style={[styles.errorLabel]}>
                {textError}
              </Text>
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
                <Text style={[styles.errorLabel]}>
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
              text="Ask to confirm before sending"
              iconStyle={{ borderColor: '#b0485b' }}
              innerIconStyle={{ borderWidth: 1, borderColor: '#999' }}
              style={styles.inputContainer}
              onPress={setIsConfirmable}
            />
          </>
        )}
        {!isValidUuid && (
          <ThemedText style={styles.loadingText}>Loading vibe...</ThemedText>
        )}
      </ParallaxScrollView>

      {/* Save button */}
      {isValidUuid && (
        <FloatingButton
          onPress={handleSave}
          color1="#3d9f3c"
          color2="#1b6e13"
          content={<SaveIcon height={50} width={50} />}
          disabled={isSaveButtonDisabled}
        />
      )}

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
        cancelText="Cancel"
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
    paddingBottom: 2,
  },
  errorLabel: {
    minHeight: 16,
    fontSize: 12,
    color: '#b0485b',
  },
  input: {
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
  },
  loadingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
});
