import React  from 'react';
import './App.css';

import Container from "./components/Container";
import { GlobalProvider } from "./context/GlobalState";
import Score from "./components/Score";
import Next from "./components/Next";
import Paused from "./components/Paused";
import GameOver from "./components/GameOver";


function App() {
  return (
      <GlobalProvider>
        <div className="App">
          <Score />
          <Container />
          <Next />
        </div>
        <Paused />
        <GameOver />
      </GlobalProvider>
  );
}

export default App;
