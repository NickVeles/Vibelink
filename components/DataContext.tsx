import React, { createContext, useState, useEffect } from "react";
import { getVibes, saveVibes, saveOrUpdateVibe } from "@/utils/storage";
import { Vibe } from "@/models/Vibe";

interface DataContextType {
  vibes: Vibe[];
  addOrUpdateVibe: (vibe: Vibe) => Promise<void>;
  updateVibes: (vibes: Vibe[]) => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vibes, setVibes] = useState<Vibe[]>([]);

  // Load vibes from AsyncStorage once when the app starts
  useEffect(() => {
    getVibes().then(setVibes);
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
    setVibes(updatedVibes); // No need to re-fetch
  };

  return (
    <DataContext.Provider value={{ vibes, addOrUpdateVibe, updateVibes }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
