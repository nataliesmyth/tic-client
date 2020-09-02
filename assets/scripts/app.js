'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js');

$(() => {
  authEvents.addHandlers()

  const winningCombos = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [0, 3, 6], 
      [1, 4, 7],
      [2, 4, 6],
      [3, 4, 5],
      [2, 5, 8],
      [6, 7, 8]      
      ];
  
      let win;
  let board;
  let turn = 'X';
 
    
  const squares = Array.from(document.querySelectorAll('#board div'));
  

  document.getElementById('board').addEventListener('click', handleTurn);
  const messages = document.querySelector('h3');
  document.getElementById('reset-button').addEventListener('click', init);
  
  
  /*----- functions -----*/
  
  function getWinner() {
      let winner = null;
      winningCombos.forEach(function(combo, index) {
          if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
          });
          return winner ? winner : board.includes('') ? null : 'T';
  };
  
  function handleTurn() {
      let playerX = squares.findIndex(function(square) {
          return square === event.target;
      });
      board[playerX] = turn;
      turn = turn === 'X' ? 'O' : 'X';
      win = getWinner();
      render();
  };
  
  function init() {
      board = [
      '', '', '',
      '', '', '',
      '', '', ''
      ];
      render();
  };
  
  function render() {
      board.forEach(function(mark, index) {
      //this moves the value of the board item into the squares[playerX]
      squares[index].textContent = mark;
      });
      messages.textContent = win === 'T' ? `It's a tie!!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
      };
  
  init();})
