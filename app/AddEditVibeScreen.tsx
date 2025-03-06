import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Vibe } from '@/models/Vibe';
import Header from '@/components/Header';
import { BackIcon, CheckIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ConfirmModal } from '@/components/ConfirmModal';
import FloatingButton from '@/components/ui/FloatingButton';
import Color from 'color';

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

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
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
    const updatedVibe = { ...vibe, text, emoji, color, isConfirmable };
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
          colors={[Color(color).rotate(8).hex(), color, Color(color).rotate(-8).hex()]}
          start={[1, 0]}
          end={[0, 0.75]}
          style={styles.vibeButton}
          onLayout={(event) => {
            // make space for the emojis
            const { width } = event.nativeEvent.layout;
            setMaxTextWidth(width - 128);
          }}>
            {/* Button Content */}
            <Text style={styles.emoji}>
              {emoji}
            </Text>
            <Text style={[styles.vibeText, { maxWidth: maxTextWidth }]}>
              {text}
            </Text>
            <Text style={[styles.emoji, { opacity: 0 }]}>
              {emoji}
            </Text>
        </LinearGradient>
      </ParallaxScrollView>

      {/* Save button */}
      <FloatingButton 
        onPress={handleSave}
        color1="#3d9f3c"
        color2="#1b6e13"
        content={<CheckIcon height={50} width={50} />}
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
});
