/*-------------------------------- Constants --------------------------------*/
const choices = ['p','q'];


/*---------------------------- Variables (state) ----------------------------*/
let board;      // Array of 9 strings representing the board
let turn;       // "P" or "Q"
let winner;     // false or "P"/"Q"
let tie;        // true/false


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');


/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'p';
  winner = false;
  tie = false;
  render();
  console.log('Game initialized');
}

function render() {
  board.forEach((mark, idx) => {
    squareEls[idx].textContent = mark;
  });
  if (winner) {
    messageEl.textContent = `${winner} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Turn: ${turn}`;
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square, idx) => {
  square.addEventListener('click', () => handleClick(idx));
});

function handleClick(idx) {
  if (board[idx] || winner) return;
  board[idx] = turn;
  checkWin();
  checkTie();
  if (!winner && !tie) turn = turn === 'p' ? 'q' : 'p';
  render();
  if (winner || tie) {
    setTimeout(init, 2000); // Reset after 2 seconds
  }
}
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', init);
}
function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  winCombos.forEach(combo => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });
}

function checkTie() {
  tie = board.every(cell => cell) && !winner;
}

// Initialize the game on page load
init();