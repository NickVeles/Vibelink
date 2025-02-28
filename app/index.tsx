import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { v4 as uuidv4 } from 'uuid';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import Header from '@/components/Header';
import { AddIcon } from '@/components/ui/Icon';
import { Vibe } from '@/models/Vibe';
import { getVibes, saveVibes } from '@/utils/storage';
import Color from 'color';

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
      <ParallaxScrollView>
      {vibes.map((vibe) => (
        <LinearGradient
          colors={[ Color(vibe.color).lighten(0.5).toString(), vibe.color, Color(vibe.color).lighten(0.5).toString()]}
          start={[1, 0]}
          end={[0, 0.75]}
          style={{ borderRadius: 10 }}>
          <TouchableOpacity key={vibe.id} style={styles.vibeButton}>

            {/* Button Content */}
            <ThemedText style={{ fontSize: 32 }}>
              {vibe.emoji}
            </ThemedText>
            <ThemedText style={{ fontSize: 24, color: Color(vibe.color).isDark() ? '#f2f2f2' : '#121212' }}>
              {vibe.text}
            </ThemedText>
            <ThemedText style={{ fontSize: 32, opacity: 0 }}>
              {vibe.emoji}
            </ThemedText>
          </TouchableOpacity>
        </LinearGradient>
      ))}
      </ParallaxScrollView>

      {/* Add button */}
      <TouchableOpacity style={styles.addButton} onPress={addVibe}>
        <LinearGradient
          colors={['#ff6f61', '#b0485b']}
          start={[0, 1]}
          end={[1, 0]}
          style={{ borderRadius: '50%' }}>
          <AddIcon height={50} width={50}/>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
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
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});