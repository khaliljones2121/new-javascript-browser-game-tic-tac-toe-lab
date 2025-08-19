
// --- Tic Tac Toe Game Logic ---
const board = Array(9).fill(null);
let currentPlayer = 'X';
const iconMap = {
  'X': '❌', // for player X
  'O': '🐙'  // for player O
};

const statusEl = document.getElementById('status');
const gameBoardEl = document.getElementById('gameBoard');

function renderBoard() {
  gameBoardEl.innerHTML = '';
  board.forEach((cell, i) => {
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';
    cellEl.dataset.index = i;
    cellEl.innerHTML = cell ? iconMap[cell] : '';
    cellEl.addEventListener('click', handleMove);
    gameBoardEl.appendChild(cellEl);
  });
}

function handleMove(e) {
  const i = e.target.dataset.index;
  if (board[i] || checkWinner()) return;

  board[i] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    statusEl.textContent = `🎉 Player ${currentPlayer} wins! ${iconMap[currentPlayer]}`;
  } else if (board.every(cell => cell)) {
    statusEl.textContent = `🤝 It's a draw!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s Turn ${iconMap[currentPlayer]}`;
  }
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winCombos.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function resetGame() {
  for (let i = 0; i < board.length; i++) board[i] = null;
  currentPlayer = 'X';
  statusEl.textContent = `Player X's Turn ${iconMap.X}`;
  renderBoard();
}

// Initialize board on page load
renderBoard();



