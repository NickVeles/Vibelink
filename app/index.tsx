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
import { ContextMenuModal } from '@/components/ContextMenuModal';

export default function HomeScreen() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);

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
      color: Color('red').rotate(Math.random() * 360).hex(),
      isConfirmable: true,
    };

    const updatedVibes = [...vibes, newVibe];
    setVibes(updatedVibes);
    await saveVibes(updatedVibes);
  };

  const handleEdit = () => {
    // Do nothing for now
  };

  const handleMoveUp = () => {
    if (selectedVibe) {
      const index = vibes.findIndex((vibe) => vibe.id === selectedVibe.id);
      if (index > 0) {
        const updatedVibes = [...vibes];
        [updatedVibes[index - 1], updatedVibes[index]] = [updatedVibes[index], updatedVibes[index - 1]];
        setVibes(updatedVibes);
        saveVibes(updatedVibes);
      }
    }
  };

  const handleMoveDown = () => {
    if (selectedVibe) {
      const index = vibes.findIndex((vibe) => vibe.id === selectedVibe.id);
      if (index < vibes.length - 1) {
        const updatedVibes = [...vibes];
        [updatedVibes[index + 1], updatedVibes[index]] = [updatedVibes[index], updatedVibes[index + 1]];
        setVibes(updatedVibes);
        saveVibes(updatedVibes);
      }
    }
  };

  const handleDelete = () => {
    if (selectedVibe) {
      const updatedVibes = vibes.filter((vibe) => vibe.id !== selectedVibe.id);
      setVibes(updatedVibes);
      saveVibes(updatedVibes);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Vibe buttons */}
      <ParallaxScrollView>
        {vibes.map((vibe) => (
          <LinearGradient
            key={vibe.id}
            colors={[Color(vibe.color).rotate(5).hex(), vibe.color, Color(vibe.color).rotate(-5).hex()]}
            start={[1, 0]}
            end={[0, 0.75]}
            style={{ borderRadius: 10 }}>
            <TouchableOpacity
              style={styles.vibeButton}
              onLongPress={() => {
                setSelectedVibe(vibe);
                setModalVisible(true);
              }}
            >
              {/* Button Content */}
              <ThemedText style={styles.emoji}>
                {vibe.emoji}
              </ThemedText>
              <ThemedText style={{ fontSize: 24, color: Color(vibe.color).isDark() ? '#f2f2f2' : '#121212' }}>
                {vibe.text}
              </ThemedText>
              <ThemedText style={[styles.emoji, { opacity: 0 }]}>
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
          <AddIcon height={50} width={50} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Context Menu Modal */}
      {selectedVibe && (
        <ContextMenuModal
          visible={modalVisible}
          onEdit={handleEdit}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={handleDelete}
        />
      )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  emoji: {
    fontSize: 32,
  }
});