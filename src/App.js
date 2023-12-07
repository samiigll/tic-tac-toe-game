// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GameOptionsPage from './components/GameOptionsPage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/second-page" element={<GameOptionsPage />} />
        <Route path="/game" element={<GameOptionsPage />} />
        <Route path="/game-page/:boardSize/:backgroundColor" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
