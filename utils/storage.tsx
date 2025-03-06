import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibe } from '../models/Vibe';

const VIBES_KEY = 'vibes';

export const saveVibes = async (vibes: Vibe[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(vibes);
    await AsyncStorage.setItem(VIBES_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save vibes to AsyncStorage', e);
  }
};

export const getVibes = async (): Promise<Vibe[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(VIBES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load vibes from AsyncStorage', e);
    return [];
  }
};

export const saveOrUpdateVibe = async (vibeToSave: Vibe): Promise<void> => {
  try {
    const existingVibes = await getVibes();
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