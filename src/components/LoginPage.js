// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
      navigate('/second-page');
    } else {
      alert('Please enter a valid user name.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Welcome to Tic Tac Toe Game!</h2>
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Log in
          </button>
        </form>
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
    backgroundImage: 'url("https://cdn.leonardo.ai/users/75a2816c-41df-4dc3-bcb5-9700ff6d6764/generations/fd4d28e9-6619-4feb-af77-92bd27780aa9/Leonardo_Diffusion_XL_xox_game_0.jpg")',
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
    marginTop: '-200px',
  },
  title: {
    fontSize: '30px',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'courier, sans-serif',
  },
  label: {
    color: '#333',
    marginBottom: '8px',
    fontFamily: 'courier, sans-serif',

  },
  input: {
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '80%',
    backgroundColor: 'rgba(180, 6, 4, 0.31)',
    fontFamily: 'courier, sans-serif',

  },
  button: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: 'rgba(180, 6, 4, 0.7)',
    fontFamily: 'courier, sans-serif',

  },
};

export default LoginPage;
