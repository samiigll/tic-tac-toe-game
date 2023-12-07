// src/components/GameOptionsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameOptionsPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [boardSize, setBoardSize] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedGames = localStorage.getItem('gameList');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedGames) {
      setGameList(JSON.parse(storedGames));
    }
  }, []);

  const handleGameStart = () => {
    const newGame = {
      username,
      boardSize,
      backgroundColor,
      timestamp: new Date().toLocaleString(),
    };

    setGameList([newGame]);
    localStorage.setItem('gameList', JSON.stringify([newGame]));

    navigate(`/game-page/${boardSize}/${backgroundColor.replace('#', '')}`);
  };

  const handleClearList = () => {
    setGameList([]);
    localStorage.removeItem('gameList');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
      <p style={styles.welcomeMessage}>Welcome, {username}!</p>
        <h2 style={styles.title}>Game Options</h2>

        

        <label style={styles.label}>Board Size: </label>
        <select
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value))}
          style={styles.input}
        >
          <option value={3}>3x3</option>
          <option value={5}>5x5</option>
          <option value={7}>7x7</option>
        </select>

        <br />

        <label style={styles.label}>Background Color: </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          style={styles.input}
        />

        <br />

        <h3 style={styles.gameListTitle}>Game List</h3>
        <ul style={styles.gameList}>
          {gameList.map((game, index) => (
            <li key={index} style={styles.gameListItem}>
              {`${game.username === username ? username : game.username} | ${game.boardSize}x${game.boardSize} | ${game.timestamp}`}
            </li>
          ))}
        </ul>

        {/* Start Game butonu */}
        <button onClick={handleGameStart} style={styles.button}>
          Start Game
        </button>

        {/* Temizle butonu */}
        <button onClick={handleClearList} style={styles.button}>
          Clean
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #000428, #004e92)',
    backgroundImage: 'url("https://cdn.leonardo.ai/users/75a2816c-41df-4dc3-bcb5-9700ff6d6764/generations/fd4d28e9-6619-4feb-af77-92bd27780aa9/Leonardo_Diffusion_XL_xox_game_2.jpg")',
    backgroundSize: 'cover',
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'courier, sans-serif',

  },
  title: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'courier, sans-serif',
    

  },
  welcomeMessage: {
    fontSize: '26px',
    marginBottom: '10px',
    fontWeight: 'bold',
    
  },
  label: {
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
  },
  gameListTitle: {
    fontSize: '18px',
    color: '#333',
    margin: '15px 0 10px',
  },
  gameList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  gameListItem: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '8px',
  },
  button: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '8px',
    backgroundColor: 'rgba(180, 6, 4, 0.7)',
    fontFamily: 'courier, sans-serif',

  },
};

export default GameOptionsPage;
