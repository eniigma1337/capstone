import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { GamesContext } from "../context/GamesContext";
import GameFinder from "../apis/GameFinder";

const UpdateGame = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { games } = useContext(GamesContext);
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await GameFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.game.name);
      setDeveloper(response.data.data.game.developer);
      setPriceRange(response.data.data.game.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGame = await GameFinder.put(`/${id}`, {
      name,
      developer,
      price_range: priceRange,
    });
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="developer">Developer</label>
          <input
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            id="developer"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateGame;
