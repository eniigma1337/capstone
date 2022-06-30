import React from "react";
import Header from "../components/Header";
import AddGame from "../components/AddGame";
import GameList from "../components/GameList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddGame />
      <GameList />
    </div>
  );
};

export default Home;
