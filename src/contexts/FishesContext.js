import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const FishesContext = createContext();
export const useFishes = () => {
  return useContext(FishesContext);
};
export const FishesProvider = ({ children }) => {
  const [fishes, setFishes] = useState();
  const [fishesUpdated, setFishesUpdated] = useState();
  useEffect(() => {
    const unsubscribe = (async () => {
      const fishesResponse = await axios.get("//localhost:8989/fishes");
      const fishes = fishesResponse.data;
      setFishes(fishes);
    })();
    return unsubscribe;
  }, [fishesUpdated]);
  const value = {
    fishes,
    setFishesUpdated,
  };
  return (
    <FishesContext.Provider value={value}>{children}</FishesContext.Provider>
  );
};
