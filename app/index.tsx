import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import Header from '@/components/Header';
import { AddIcon } from '@/components/ui/Icon';
import { Vibe } from '@/models/Vibe';
import { getVibes, saveVibes } from '@/utils/storage';

export default function HomeScreen() {
  const [vibes, setVibes] = useState<Vibe[]>([]);

  useEffect(() => {
    const loadVibes = async () => {
      const storedVibes = await getVibes();
      setVibes(storedVibes);
    };

    loadVibes();
  }, []);

  const addVibe = async () => {
    const newVibe: Vibe = {
      id: uuidv4(),
      text: 'Happy',
      emoji: '😊',
      color: 'yellow',
      isConfirmable: true,
    };

    const updatedVibes = [...vibes, newVibe];
    setVibes(updatedVibes);
    await saveVibes(updatedVibes);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Vibe buttons */}
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#f2f2f2', dark: '#1D3D47' }}
      >
      {vibes.map((vibe) => (
        <TouchableOpacity key={vibe.id} style={styles.vibeButton}>
        <ThemedText style={{ fontSize: 24 }}>
          {vibe.emoji}
        </ThemedText>
        <ThemedText style={{ marginLeft: 10 }}>
          {vibe.text}
        </ThemedText>
        </TouchableOpacity>
      ))}
      </ParallaxScrollView>

      {/* Add button */}
      <TouchableOpacity style={styles.addButton} onPress={addVibe}>
      <AddIcon height={32} width={32} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#b0485b',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10,
  },
  vibeButton: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});