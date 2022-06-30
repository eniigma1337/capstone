import React, { useState, createContext } from "react";

export const GamesContext = createContext();

export const GamesContextProvider = (props) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const addGames = (game) => {
    setGames([...games, game]);
  };
  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        addGames,
        selectedGame,
        setSelectedGame,
      }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};
