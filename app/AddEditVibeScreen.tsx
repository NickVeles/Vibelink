import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Vibe } from '@/models/Vibe';
import Header from '@/components/Header';
import { BackIcon, CheckIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ConfirmModal } from '@/components/ConfirmModal';

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

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleLeave = async () => {
    if (!isDirty) {
      router.back();
    }

    if (
      vibe.text == text ||
      vibe.emoji == emoji ||
      vibe.color == color ||
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
        onLeftPress={() => router.back()}
      />

      {/* Content */}
      <ParallaxScrollView></ParallaxScrollView>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <LinearGradient
          colors={['#3d9f3c', '#1b6e13']}
          start={[0, 1]}
          end={[1, 0]}
          style={{ borderRadius: '50%' }}
        >
          <CheckIcon height={50} width={50} />
        </LinearGradient>
      </TouchableOpacity>

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
});
