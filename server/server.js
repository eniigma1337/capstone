require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all games
app.get("/api/v1/games", async (req, res) => {
  try {
    //const results = await db.query("select * from games");
    const gameRatingsData = await db.query(
      "select * from games left join (select game_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by game_id) reviews on games.id = reviews.game_id;"
    );

    res.status(200).json({
      status: "success",
      results: gameRatingsData.rows.length,
      data: {
        games: gameRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a game
app.get("/api/v1/games/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const game = await db.query(
      "select * from games left join (select game_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by game_id) reviews on games.id = reviews.game_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where game_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "success",
      data: {
        game: game.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a game

app.post("/api/v1/games", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO games (name, developer, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.developer, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        game: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update games

app.put("/api/v1/games/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE games SET name = $1, developer = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.developer, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        game: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete game

app.delete("/api/v1/games/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM games where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/games/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (game_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
