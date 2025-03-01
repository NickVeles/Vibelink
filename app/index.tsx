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
  const [maxTextWidth, setMaxTextWidth] = useState(0);

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
      text: 'This is some lengthy dummy text to test the layout of the vibe button.',
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

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVibe(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Vibe buttons */}
      <ParallaxScrollView>
        {vibes.map((vibe) => (
          <LinearGradient
            key={vibe.id}
            colors={[Color(vibe.color).rotate(8).hex(), vibe.color, Color(vibe.color).rotate(-8).hex()]}
            start={[1, 0]}
            end={[0, 0.75]}
            style={{ borderRadius: 10 }}>
            <TouchableOpacity
              style={styles.vibeButton}
              onLongPress={() => {
                setSelectedVibe(vibe);
                setModalVisible(true);
              }}
              onLayout={(event) => {
                // make space for the emojis
                const { width } = event.nativeEvent.layout;
                setMaxTextWidth(width - 128);
              }}
            >
              {/* Button Content */}
              <ThemedText style={styles.emoji}>
                {vibe.emoji}
              </ThemedText>
              <ThemedText style={[styles.vibeText, { maxWidth: maxTextWidth }]}>
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
          onClose={closeModal}
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