import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import GameDetailPage from "./routes/GameDetailPage";
import { GamesContextProvider } from "./context/GamesContext";
const App = () => {
  return (
    <GamesContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/games/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/games/:id"
              component={GameDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </GamesContextProvider>
  );
};

export default App;
