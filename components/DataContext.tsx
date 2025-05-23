import React, { createContext, useState, useEffect } from 'react';
import {
  loadVibes,
  saveVibes,
  saveOrUpdateVibe,
  loadSettings,
  saveSettings,
} from '@/utils/storage';
import { Vibe } from '@/models/Vibe';
import { Settings } from '@/models/Settings';
import { DefaultSettings } from '@/utils/defaults';
import { initializeApp, FirebaseApp } from 'firebase/app';

import Constants from 'expo-constants';

const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig ?? {
  apiKey: "dummyApiKey",
  authDomain: "dummyProjectId.firebaseapp.com",
  projectId: "dummyProjectId",
  storageBucket: "dummyProjectId.appspot.com",
  messagingSenderId: "dummySenderId",
  appId: "dummyAppId",
};

const firebaseApp = initializeApp(firebaseConfig);

interface DataContextType {
  vibes: Vibe[];
  settings: Settings;
  firebaseApp: FirebaseApp;
  addOrUpdateVibe: (vibe: Vibe) => Promise<void>;
  updateVibes: (vibes: Vibe[]) => Promise<void>;
  updateSettings: (settings: Settings) => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [settings, setSettings] = useState<Settings>(DefaultSettings);

  // Load data from AsyncStorage once when the app starts
  useEffect(() => {
    loadVibes().then(setVibes);
    loadSettings().then(setSettings);
  }, []);

  const addOrUpdateVibe = async (vibe: Vibe) => {
    await saveOrUpdateVibe(vibe);
    setVibes((prevVibes) => {
      const updatedVibes = prevVibes.some((v) => v.id === vibe.id)
        ? prevVibes.map((v) => (v.id === vibe.id ? vibe : v))
        : [...prevVibes, vibe];
      return updatedVibes;
    });
  };

  const updateVibes = async (updatedVibes: Vibe[]) => {
    await saveVibes(updatedVibes);
    setVibes(updatedVibes);
  };

  const updateSettings = async (updatedSettings: Settings) => {
    await saveSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <DataContext.Provider
      value={{
        vibes,
        settings,
        firebaseApp,
        addOrUpdateVibe,
        updateVibes,
        updateSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
