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