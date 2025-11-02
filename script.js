const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const gameSection = document.querySelector(".game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players!");
    return;
  }

  document.querySelector(".player-inputs").style.display = "none";

  // FIX: make sure the game board becomes visible
  gameSection.classList.add("active");

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
  gameActive = true;
});

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.id) - 1;

  if (!gameActive || board[index] !== "") return;

  board[index] = currentSymbol;
  cell.textContent = currentSymbol;

  if (checkWinner()) {
    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
    gameActive = false;
    return;
  }

  if (board.every(c => c !== "")) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "o";
  } else {
    currentPlayer = player1;
    currentSymbol = "x";
  }

  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}
