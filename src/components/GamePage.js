import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  const { boardSize, backgroundColor } = useParams();
  const [board, setBoard] = useState(Array(Number(boardSize) * Number(boardSize)).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares, boardSize) => {
    const lines = [];

    for (let i = 0; i < boardSize; i++) {
      lines.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
      lines.push(Array.from({ length: boardSize }, (_, j) => j * boardSize + i));
    }

    lines.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
    lines.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let countX = 0;
      let countO = 0;

      for (let j = 0; j < line.length; j++) {
        const index = line[j];
        const square = squares[index];

        if (square === 'X') {
          countX++;
        } else if (square === 'O') {
          countO++;
        }
      }

      if (countX === boardSize) {
        return 'X'; // X kazandı
      } else if (countO === boardSize) {
        return 'O'; // O kazandı
      }
    }

    return null; // Kazanan yok
  };

  const handleClick = (index) => {
    const squares = [...board];

    if (calculateWinner(squares, Number(boardSize)) || squares[index]) {
      return;
    }

    squares[index] = isXNext ? 'X' : 'O';
    setBoard(squares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(squares, Number(boardSize));
    if (winner) {
      alert(`Player ${winner} won. New game starting.`);
      setBoard(Array(Number(boardSize) * Number(boardSize)).fill(null));
      navigate('/second-page');
    } else if (!squares.includes(null)) {
      // Berabere durumu
      alert('Game is tie. New game starting.');
      setBoard(Array(Number(boardSize) * Number(boardSize)).fill(null));
    } else {
      // Bilgisayarın hamlesi için gecikme ekleniyor
      setTimeout(() => {
        // Berabere durumu kontrolü (oyuncu hamlesi sonrasında)
        if (!squares.includes(null)) {
          alert('Game is tie. New game starting.');
          setBoard(Array(Number(boardSize) * Number(boardSize)).fill(null));
          return;
        }

        // Bilgisayarın hamlesi
        const emptyCells = squares.reduce((acc, cell, i) => (cell === null ? [...acc, i] : acc), []);
        if (emptyCells.length > 0) {
          const computerMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          squares[computerMove] = 'O';
          setBoard(squares);
          setIsXNext(true); // Sırayı tekrar oyuncuya geçir

          const computerWinner = calculateWinner(squares, Number(boardSize));
          if (computerWinner) {
            alert(`Computer won. New game starting.`);
            setBoard(Array(Number(boardSize) * Number(boardSize)).fill(null));
            navigate('/second-page');
          }
        }
      }, 1000); // 1000 milisaniye (1 saniye)
    }
  };

  const handleGameEnd = () => {
    navigate('/second-page');
  };

  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
    },
    title: {
      color: '#3498db',
      fontFamily: 'courier, sans-serif',
      fontSize: '24px',

    },
    board: {
      display: 'grid',
      gridTemplateColumns: `repeat(${boardSize}, 100px)`,
      gridTemplateRows: `repeat(${boardSize}, 100px)`,
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px',
      borderRadius: '10px',
     
     
    },
    cell: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '36px',
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      backgroundColor: `#${backgroundColor}`,
      border: '2px solid #3498db',
      borderRadius: '8px',
      transition: 'background-color 0.3s',
    },
    button: {
      padding: '10px 20px',
      background: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '10%',
      fontFamily: 'courier, sans-serif',

      
    },

    con:{
      backgroundImage: 'url("https://cdn.leonardo.ai/users/75a2816c-41df-4dc3-bcb5-9700ff6d6764/generations/fd4d28e9-6619-4feb-af77-92bd27780aa9/Leonardo_Diffusion_XL_xox_game_1.jpg")',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
    }
  };
 
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tic Tac Toe Game</h2>
      <div style={styles.con}>
      <div className="board" style={styles.board}>
      
        {board.map((cell, index) => (
          <div key={index} className="cell" style={styles.cell} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      
      <button onClick={handleGameEnd} style={styles.button}>
        Exit Game
      </button>
      </div>
    </div>
  );
};

export default GamePage;

