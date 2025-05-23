import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Keyboard,
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
import { ColorPickerModal } from '@/components/ColorPickerModal';
import DataContext from '@/components/DataContext';
import { v4 as uuidv4, validate } from 'uuid';
import { DefaultVibe } from '@/utils/defaults';

export default function VibeEditScreen() {
  const router = useRouter();
  const { vibeId } = useLocalSearchParams();
  const dataContext = useContext(DataContext);
  const settings = dataContext?.settings;
  const inputEmojiRef = useRef<TextInput>(null);

  const [vibe, setVibe] = useState(DefaultVibe);
  const [text, setText] = useState(vibe.text);
  const [emoji, setEmoji] = useState(vibe.emoji);
  const [color, setColor] = useState(vibe.color);
  const [isConfirmable, setIsConfirmable] = useState(vibe.isConfirmable);

  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const [isValidUuid, setIsValidUuid] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [isEmojiError, setIsEmojiError] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  useEffect(() => {
    setText(vibe.text.trim().substring(0, 16));
    setEmoji(vibe.emoji);
    setColor(vibe.color);
    setIsConfirmable(vibe.isConfirmable);
  }, [vibe]);

  useEffect(() => {
    if (!dataContext) {
      return;
    }

    let isValidId = validate(vibeId);

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
        color: Color('red')
          .rotate(360 * Math.random())
          .hex(),
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
    setIsTextError(text.trim().length == 0);
  }, [text]);

  // Check for empty emoji
  useEffect(() => {
    setIsEmojiError(emoji == '');
  }, [emoji]);

  const handleChangeText = (value: string) => {
    setText(value.substring(0, 16));
  };

  const handleChangeEmoji = (value: string) => {
    const match = value.match(/[\p{Emoji_Presentation}\uFE0F]/u);
    setEmoji(match ? match[0] : '');
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setIsColorPickerVisible(false);
  };

  const handleLeave = () => {
    if (
      vibe.text == text &&
      vibe.emoji == emoji &&
      vibe.color == color &&
      vibe.isConfirmable == isConfirmable
    ) {
      router.back();
      return;
    }

    setIsConfirmModalVisible(true);
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
              <Text
                style={[
                  styles.emoji,
                  { opacity: settings?.isLeftEmojiVisible ? 1 : 0 },
                ]}
              >
                {emoji}
              </Text>
              <View style={[styles.vibeTextBox]}>
                <Text style={[styles.vibeText, styles.vibeTextLabel]}>
                  I am
                </Text>
                <Text style={[styles.vibeText, { maxWidth: maxTextWidth }]}>
                  {text.trim() ? text.trim() : ' '}
                </Text>
              </View>
              <Text
                style={[
                  styles.emoji,
                  { opacity: settings?.isRightEmojiVisible ? 1 : 0 },
                ]}
              >
                {emoji}
              </Text>
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
                  {
                    borderColor: isTextError ? '#b0485b' : '#424242',
                    padding: 8,
                  },
                ]}
              />
              <Text style={[styles.errorLabel]}>
                {isTextError ? 'Your vibe cannot be empty' : ''}
              </Text>
            </View>

            {/* Emoji */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Emoji</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.input,
                  {
                    borderColor: isEmojiError ? '#b0485b' : '#424242',
                    flexDirection: 'row',
                  },
                ]}
                onPress={() => inputEmojiRef.current?.focus()}
              >
                <LinearGradient
                  colors={['#b0485b', '#ff6f61']}
                  start={[1, 0]}
                  end={[0, 0.75]}
                  style={styles.inputButton}
                >
                  <Text style={styles.inputText}>Change</Text>
                </LinearGradient>
                <TextInput
                  ref={inputEmojiRef}
                  value={emoji}
                  placeholder="e.g. 😃"
                  placeholderTextColor="#999"
                  onChangeText={handleChangeEmoji}
                  textAlign="center"
                  style={[styles.inputEmoji]}
                />
              </TouchableOpacity>
              <Text style={[styles.errorLabel]}>
                {isEmojiError ? 'You have to pick an emoji' : ''}
              </Text>
            </View>

            {/* Color Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Color</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.input, { flexDirection: 'row' }]}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsColorPickerVisible(true);
                }}
              >
                <LinearGradient
                  colors={['#b0485b', '#ff6f61']}
                  start={[1, 0]}
                  end={[0, 0.75]}
                  style={styles.inputButton}
                >
                  <Text style={styles.inputText}>Change</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <View
                    style={[styles.inputColorBox, { backgroundColor: color }]}
                  />
                </View>
              </TouchableOpacity>
              <View style={[styles.errorLabel]} />
            </View>

            {/* Is Confirmable? */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ask me before sending this vibe</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.input, { flexDirection: 'row' }]}
                onPress={() => setIsConfirmable(!isConfirmable)}
              >
                <LinearGradient
                  colors={
                    !isConfirmable
                      ? ['#b0485b', '#ff6f61']
                      : ['#f9f9f9', '#f9f9f9']
                  }
                  start={[1, 0]}
                  end={[0, 0.75]}
                  style={styles.inputButton}
                >
                  <Text
                    style={[
                      styles.inputText,
                      { color: !isConfirmable ? '#f9f9f9' : '#121212' },
                    ]}
                  >
                    Off
                  </Text>
                </LinearGradient>
                <LinearGradient
                  colors={
                    isConfirmable
                      ? ['#b0485b', '#ff6f61']
                      : ['#f9f9f9', '#f9f9f9']
                  }
                  start={[0, 0.75]}
                  end={[1, 0]}
                  style={[
                    styles.inputButton,
                    {
                      borderRadius: 0,
                      borderTopRightRadius: 3.5,
                      borderBottomRightRadius: 3.5,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.inputText,
                      { color: isConfirmable ? '#f9f9f9' : '#121212' },
                    ]}
                  >
                    On
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
        {!isValidUuid && (
          <Text style={styles.loadingText}>Loading vibe...</Text>
        )}
      </ParallaxScrollView>

      {/* Save button */}
      {isValidUuid && (
        <FloatingButton
          onPress={handleSave}
          color2="#ff6f61"
          color1="#b0485b"
          content={<SaveIcon height={46} width={46} />}
          disabled={isSaveButtonDisabled}
        />
      )}

      {/* Color Picker Modal */}
      <ColorPickerModal
        visible={isColorPickerVisible}
        color={color}
        onColorSelect={handleColorSelect}
        onClose={() => setIsColorPickerVisible(false)}
      />

      {/* Confirm modal */}
      <ConfirmModal
        visible={isConfirmModalVisible}
        title="Discard changes?"
        acceptText="Yes"
        cancelText="Cancel"
        onConfirm={() => router.back()}
        onClose={() => setIsConfirmModalVisible(false)}
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
    userSelect: 'none',
  },
  vibeTextBox: {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'rgba(255, 255, 255, 0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  vibeText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#121212',
    paddingHorizontal: 4,
    paddingBottom: 8,
    userSelect: 'none',
  },
  vibeTextLabel: {
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 0,
  },
  label: {
    fontSize: 18,
    color: '#424242',
    paddingBottom: 2,
    userSelect: 'none',
  },
  errorLabel: {
    minHeight: 22,
    fontSize: 16,
    color: '#b0485b',
    userSelect: 'none',
  },
  inputContainer: {
    paddingTop: 8,
  },
  input: {
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    height: 45,
  },
  inputButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 3.5,
    borderBottomLeftRadius: 3.5,
  },
  inputEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    borderTopRightRadius: 3.5,
    borderBottomRightRadius: 3.5,
    fontSize: 22,
    minWidth: 0,
  },
  inputText: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#f2f2f2',
    userSelect: 'none',
  },
  inputColorBox: {
    flex: 1,
    margin: 5,
    borderRadius: 3.5,
  },
  loadingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
    userSelect: 'none',
  },
});
