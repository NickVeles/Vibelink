import React, { createContext, useState, useEffect } from "react";
import { getVibes, saveOrUpdateVibe } from "@/utils/storage";
import { Vibe } from "@/models/Vibe";

interface DataContextType {
  vibes: Vibe[];
  addOrUpdateVibe: (vibe: Vibe) => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vibes, setVibes] = useState<Vibe[]>([]);

  // Load vibes from AsyncStorage when the app starts
  useEffect(() => {
    const loadVibes = async () => {
      const storedVibes = await getVibes();
      setVibes(storedVibes);
    };
    loadVibes();
  }, []);

  // Function to update the vibes list and persist it
  const addOrUpdateVibe = async (vibe: Vibe) => {
    await saveOrUpdateVibe(vibe);
    setVibes(await getVibes()); // Refresh state after update
  };

  return (
    <DataContext.Provider value={{ vibes, addOrUpdateVibe }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
