import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/games"
    : "http://localhost:3001/api/v1/games";

export default axios.create({
  baseURL,
});
