import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#f2f2f2', dark: '#1D3D47' }}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        {vibes.map((vibe) => (
          <TouchableOpacity key={vibe.id}>
            <ThemedText>{vibe.emoji} {vibe.text}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
      <TouchableOpacity style={styles.addButton} onPress={addVibe}>
        <AddIcon height={32} width={32} />
      </TouchableOpacity>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
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
});
