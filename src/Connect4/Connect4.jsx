import React, { useState } from 'react';
import Modal from '../components/Modal';
import Circle from '../components/Circle';

const createInitialBoard = () => Array.from({ length: 6 }, () => Array(7).fill(false));

const Connect4 = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [activePlayer, setActivePlayer] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counterMarker, setCounterMarker] = useState(0);
  const [counterMarker2, setCounterMarker2] = useState(0);
  
  

  const handleCircleClick = (row, column) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      // Encuentra la última fila sin pintar en la columna
      let newRow = -1;
      for (let i = newBoard.length - 1; i >= 0; i--) {
        if (!newBoard[i][column]) {
          newRow = i;
          break;
        }
      }
      if (newRow !== -1) {
        activePlayer ? 
        // Pinta el círculo en la última fila sin pintar
        newBoard[newRow][column] = 'red'
        :
        newBoard[newRow][column] = 'yellow'
      }
      if(checkFourInARow(newBoard[newRow][column])){
        // setWinner(activePlayer ? 'Jugador 1' : 'Jugador 2');
        activePlayer ? setCounterMarker(counterMarker+1) : setCounterMarker2(counterMarker2+1)
        setTimeout(() => {
          setIsModalOpen(true);
        }, 200);
        return newBoard;
      } 
      setActivePlayer(!activePlayer);
      return newBoard;
    });
  };
  
  const checkFourInARow = (color) => {
    // Verificar filas
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column <= board[row].length - 4; column++) {
        if (
          board[row][column] === color &&
          board[row][column + 1] === color &&
          board[row][column + 2] === color &&
          board[row][column + 3] === color
        ) {
          return true;
        }
      }
    }
  
    // Verificar columnas
    for (let column = 0; column < board[0].length; column++) {
      for (let row = 0; row <= board.length - 4; row++) {
        if (
          board[row][column] === color &&
          board[row + 1][column] === color &&
          board[row + 2][column] === color &&
          board[row + 3][column] === color
        ) {
          return true;
        }
      }
    }
  
    // Verificar diagonal ascendente (de izquierda a derecha)
    for (let row = 0; row <= board.length - 4; row++) {
      for (let column = 0; column <= board[row].length - 4; column++) {
        if (
          board[row][column] === color &&
          board[row + 1][column + 1] === color &&
          board[row + 2][column + 2] === color &&
          board[row + 3][column + 3] === color
        ) {
          return true;
        }
      }
    }
  
    // Verificar diagonal descendente (de derecha a izquierda)
    for (let row = 0; row <= board.length - 4; row++) {
      for (let column = 3; column < board[row].length; column++) {
        if (
          board[row][column] === color &&
          board[row + 1][column - 1] === color &&
          board[row + 2][column - 2] === color &&
          board[row + 3][column - 3] === color
        ) {
          return true;
        }
      }
    }
  
    return false;
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setBoard(createInitialBoard());
    setActivePlayer(true);
  };
  
  const resetMarker=()=>{
    setCounterMarker(0);
    setCounterMarker2(0);
  }

  const resetBoard=()=>{
    setBoard(createInitialBoard());
  }

  const currentPlayer = activePlayer ? 'jugador1' : 'jugador2'; // Cambia aquí por el nombre del jugador actual

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-700">
      <h1 className="text-2xl font-bold mb-4 text-slate-200">Conecta 4</h1>
      <h2 className="text-2xl font-bold mb-4 text-slate-200">{`Turno del jugador: ${currentPlayer}`}</h2>
      <div className="grid grid-cols-7 gap-2 w-96 h-80 border-2 border-gray-400">
        {board.map((row, rowIndex) => (
          row.map((circle, columnIndex) => (
            <Circle
              key={`${rowIndex}-${columnIndex}`}
              color={circle ? `bg-${circle}-500` : 'bg-gray-300'}
              handleClick={() => handleCircleClick(rowIndex, columnIndex)}
            />
          ))
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} winner={currentPlayer} />
      <div className="flex justify-end w-96 mt-4">
        <div className="flex items-center space-x-4 ml-auto">
          <h3 className="text-lg font-semibold">Marcador Jugador 1:</h3>
          <span className="bg-gray-200 px-2 py-1 rounded">{counterMarker}</span>
          <h3 className="text-lg font-semibold">Marcador Jugador 2:</h3>
          <span className="bg-gray-200 px-2 py-1 rounded">{counterMarker2}</span> 
        </div>
      </div>
      <div className="flex justify-center w-96 mt-4 ">
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-md ml-6" onClick={resetBoard}>Reiniciar Partida</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-6" onClick={resetMarker}>Reiniciar Marcadores</button>
      </div>
    </div>
  );
};

export default Connect4;
