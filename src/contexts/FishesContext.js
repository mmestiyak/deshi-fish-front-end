import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const FishesContext = createContext();
export const useFishes = () => {
  return useContext(FishesContext);
};
export const FishesProvider = ({ children }) => {
  const [fishes, setFishes] = useState();
  const [selectedFishId, setSelectedFishId] = useState();
  const [fishesUpdated, setFishesUpdated] = useState();
  useEffect(() => {
    const unsubscribe = (async () => {
      const fishesResponse = await axios.get(
        "https://deshi-app.herokuapp.com/fishes"
      );
      const fishes = fishesResponse.data;
      setFishes(fishes);
    })();
    return unsubscribe;
  }, [fishesUpdated]);
  const value = {
    fishes,
    setFishesUpdated,
    selectedFishId,
    setSelectedFishId,
  };
  return (
    <FishesContext.Provider value={value}>{children}</FishesContext.Provider>
  );
};
