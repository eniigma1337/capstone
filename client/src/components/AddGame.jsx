import React, { useState, useContext } from "react";
import GameFinder from "../apis/GameFinder";
import { GamesContext } from "../context/GamesContext";

const AddGame = () => {
  const { addGames } = useContext(GamesContext);
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GameFinder.post("/", {
        name,
        developer,
        price_range: priceRange,
      });
      console.log(response.data.data);
      addGames(response.data.data.game);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="form-control"
              type="text"
              placeholder="developer"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame;