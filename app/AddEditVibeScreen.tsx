import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Vibe } from '@/models/Vibe';
import { saveVibes, getVibes } from '@/utils/storage';
import Header from '@/components/Header';
import { BackIcon, CheckIcon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';

interface EditVibeScreenProps {
  vibe: Vibe;
  onSave: (vibe: Vibe) => void;
}

export default function EditVibeScreen({ vibe, onSave }: EditVibeScreenProps) {
  const router = useRouter();
  const [text, setText] = useState(vibe.text);
  const [emoji, setEmoji] = useState(vibe.emoji);
  const [color, setColor] = useState(vibe.color);
  const [isConfirmable, setIsConfirmable] = useState(vibe.isConfirmable);

  const handleSave = async () => {
    const updatedVibe = { ...vibe, text, emoji, color };
    const vibes = await getVibes();
    const updatedVibes = vibes.map((v) => (v.id === vibe.id ? updatedVibe : v));
    await saveVibes(updatedVibes);
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftButton={<BackIcon width={32} height={32} />}
        onLeftPress={() => router.back()}
      />

      {/* Content */}
      
      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <LinearGradient
          colors={['#3d9f3c', '#1b6e13']}
          start={[0, 1]}
          end={[1, 0]}
          style={{ borderRadius: '50%' }}>
          <CheckIcon height={50} width={50} />
        </LinearGradient>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});