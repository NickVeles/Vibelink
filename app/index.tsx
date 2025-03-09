import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated, // Import Animated from react-native
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import Header from '@/components/Header';
import { AddIcon, SettingsIcon } from '@/components/ui/Icon';
import { Vibe } from '@/models/Vibe';
import Color from 'color';
import { ContextMenuModal } from '@/components/ContextMenuModal';
import { ConfirmModal } from '@/components/ConfirmModal'; // Import ConfirmModal
import FloatingButton from '@/components/ui/FloatingButton';
import DataContext from '@/components/DataContext';

export default function HomeScreen() {
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const vibes = dataContext?.vibes;

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // State for ConfirmModal visibility
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [maxTextWidth, setMaxTextWidth] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const cooldownWidth = useRef(new Animated.Value(100)).current; // Initialize Animated.Value

  useEffect(() => {
    if (buttonsDisabled) {
      Animated.timing(cooldownWidth, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => cooldownWidth.setValue(100));
    }
  }, [buttonsDisabled]);

  const addVibe = async () => {
    router.push(`/vibe/add-vibe`);
  };

  const handleEdit = () => {
    if (selectedVibe) {
      router.push(`/vibe/${selectedVibe.id}`);
    }
  };

  const handleMoveUp = () => {
    if (selectedVibe) {
      const index = vibes!.findIndex((vibe) => vibe.id === selectedVibe.id);
      if (index > 0) {
        const updatedVibes = [...vibes!];
        [updatedVibes[index - 1], updatedVibes[index]] = [
          updatedVibes[index],
          updatedVibes[index - 1],
        ];
        dataContext?.updateVibes(updatedVibes);
      }
    }
  };

  const handleMoveDown = () => {
    if (selectedVibe) {
      const index = vibes!.findIndex((vibe) => vibe.id === selectedVibe.id);
      if (index < vibes!.length - 1) {
        const updatedVibes = [...vibes!];
        [updatedVibes[index + 1], updatedVibes[index]] = [
          updatedVibes[index],
          updatedVibes[index + 1],
        ];
        dataContext?.updateVibes(updatedVibes);
      }
    }
  };

  const handleDelete = () => {
    if (selectedVibe) {
      const updatedVibes = vibes!.filter((vibe) => vibe.id !== selectedVibe.id);
      dataContext?.updateVibes(updatedVibes);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVibe(null);
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleConfirm = () => {
    if (selectedVibe) {
      sendVibe();
    }
    closeConfirmModal();
  };

  const sendVibe = () => {
    setButtonsDisabled(true);
    setTimeout(() => setButtonsDisabled(false), 3000);

    //TODO: Send the vibe
  };

  return (
    <View style={{ flex: 1 }}>
      <Header leftButton={<SettingsIcon height={32} width={32} />} />

      {/* Vibe buttons */}
      <ParallaxScrollView>
        {dataContext &&
          vibes?.map((vibe) => (
            <LinearGradient
              key={vibe.id}
              colors={[
                Color(vibe.color).rotate(8).hex(),
                vibe.color,
                Color(vibe.color).rotate(-8).hex(),
              ]}
              start={[1, 0]}
              end={[0, 0.75]}
              style={{ borderRadius: 10, opacity: buttonsDisabled ? 0.5 : 1 }}
            >
              <TouchableOpacity
                style={styles.vibeButton}
                onPress={() => {
                  setSelectedVibe(vibe);

                  if (vibe.isConfirmable) {
                    setConfirmModalVisible(true);
                  } else {
                    sendVibe();
                  }
                }}
                onLongPress={() => {
                  setSelectedVibe(vibe);
                  setModalVisible(true);
                }}
                onLayout={(event) => {
                  // make space for the emojis
                  const { width } = event.nativeEvent.layout;
                  setMaxTextWidth(width - 128);
                }}
                disabled={buttonsDisabled}
              >
                {/* Button Content */}
                <ThemedText style={styles.emoji}>{vibe.emoji}</ThemedText>
                <ThemedText
                  style={[styles.vibeText, { maxWidth: maxTextWidth }]}
                >
                  {vibe.text}
                </ThemedText>
                <ThemedText style={[styles.emoji, { opacity: 0 }]}>
                  {vibe.emoji}
                </ThemedText>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        {!dataContext && (
          <ThemedText style={styles.loadingText}>Loading vibes...</ThemedText>
        )}
      </ParallaxScrollView>

      {/* Add button */}
      {dataContext && (
        <FloatingButton
          onPress={addVibe}
          color1="#ff6f61"
          color2="#b0485b"
          content={<AddIcon height={50} width={50} />}
        />
      )}

      {/* Cooldown indicator */}
      {buttonsDisabled && (
        <Animated.View
          style={[
            styles.cooldownIndicator,
            {
              width: cooldownWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={[
              Color(selectedVibe!.color).rotate(8).hex(),
              selectedVibe!.color,
              Color(selectedVibe!.color).rotate(-8).hex(),
            ]}
            start={[1, 0]}
            end={[0, 0.75]}
            style={{ flex: 1 }}
          />
        </Animated.View>
      )}

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

      {/* Confirm Modal */}
      {selectedVibe && (
        <ConfirmModal
          visible={confirmModalVisible}
          title="Are you sure you want to send this vibe?"
          acceptText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
          onClose={closeConfirmModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  cooldownIndicator: {
    position: 'absolute',
    height: 4,
    width: '100%',
    bottom: 0,
  },
  loadingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
});
