import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibe } from '../models/Vibe';
import { Settings } from '@/models/Settings';

const VIBES_KEY = 'vibes';
const SETTINGS_KEY = 'settings'

const DefaultVibe: Vibe = {
  id: '',
  text: '',
  emoji: '',
  color: '#000',
  isConfirmable: false,
};

export const DefaultSettings: Settings = {
  isLeftEmojiVisible: true,
  isRightEmojiVisible: false,
  isCustomConnection: false,
};

export const saveVibes = async (vibes: Vibe[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(vibes);
    await AsyncStorage.setItem(VIBES_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save vibes to AsyncStorage', e);
  }
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save settings to AsyncStorage', e);
  }
};

export const loadVibes = async (): Promise<Vibe[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(VIBES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load vibes from AsyncStorage', e);
    return [];
  }
};

export const loadSettings = async (): Promise<Settings> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : DefaultSettings;
  } catch (e) {
    console.error('Failed to load settings from AsyncStorage', e);
    return DefaultSettings;
  }
};

export const saveOrUpdateVibe = async (vibeToSave: Vibe): Promise<void> => {
  try {
    const existingVibes = await loadVibes();
    const vibeIndex = existingVibes.findIndex((vibe) => vibe.id === vibeToSave.id);

    if (vibeIndex !== -1) {
      // Vibe exists, update it
      existingVibes[vibeIndex] = vibeToSave;
    } else {
      // Vibe does not exist, add it
      existingVibes.push(vibeToSave);
    }

    await saveVibes(existingVibes);
  } catch (e) {
    console.error('Failed to save or update vibe in AsyncStorage', e);
  }
};