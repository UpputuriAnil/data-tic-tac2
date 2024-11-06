const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const checkWinner = () => {
    let won = false;
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = Player ${board[a]} Wins!;
            won = true;
            isGameActive = false;
        }
    });

    if (!won && !board.includes("")) {
        statusText.textContent = "It's a Draw!";
        isGameActive = false;
    }
};

const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (isGameActive) statusText.textContent = Player ${currentPlayer}'s Turn;
    }
};

const restartGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = Player ${currentPlayer}'s Turn;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = Player ${currentPlayer}'s Turn;