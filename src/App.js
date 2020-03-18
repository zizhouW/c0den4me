import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreateGame from './pages/create-game/CreateGame';
import Game from './pages/game/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/games/:gameId">
            <Game />
          </Route>
          <Route path="/">
            <CreateGame />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
