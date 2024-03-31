import { useState } from 'react';
import './App.css';
import './styles.css';

// cuadro de tablero que recibirá el valor de donde tira el jugador. 
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
// Tablero completo
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // función que ayudará a calcular el ganador de la partida
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // nextSquares determina que jugador es quien va a tirar y define si cambia el valor de la casilla de nulo a (X, O)
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
// Calcula quien ha ganado de la partida 
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner;
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// permite el manejo de la partida, muestra movimiento a movimiento el juego y permite guardar los cambios paso a paso. 
// Como historial y como reseteo de la partida. Generando una matriz utilizando indice se puede controlar el desarrollo del juego
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
// Para transportarnos a un momento exacto de el juego
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
// Si no se determina el momento exacto de la partida, se puede ir al inicio de la partida
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir hacia la jugada #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
// Matriz de elementos que permiten determinar el ganador, combinaciones, las coincidencias determinan al ganador
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
