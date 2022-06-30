import React, { useEffect, useContext } from "react";
import GameFinder from "../apis/GameFinder";
import { GamesContext } from "../context/GamesContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const GameList = (props) => {
  const { games, setGames } = useContext(GamesContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameFinder.get("/");
        console.log(response.data.data);
        setGames(response.data.data.games);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await GameFinder.delete(`/${id}`);
      setGames(
        games.filter((game) => {
          return game.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/games/${id}/update`);
  };

  const handleGameSelect = (id) => {
    history.push(`/games/${id}`);
  };

  const renderRating = (game) => {
    if (!game.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={game.id} />
        <span className="text-warning ml-1">({game.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Game</th>
            <th scope="col">Developer</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((game) => {
              return (
                <tr
                  onClick={() => handleGameSelect(game.id)}
                  key={game.id}
                >
                  <td>{game.name}</td>
                  <td>{game.developer}</td>
                  <td>{"$".repeat(game.price_range)}</td>
                  <td>{renderRating(game)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, game.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, game.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
