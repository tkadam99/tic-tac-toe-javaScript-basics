// app.js

// Select all required elements from the DOM
let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-button');
let newGameButton = document.querySelector('#play-again-button');
let messageContainer = document.querySelector('.msg-container');
let message = document.querySelector('#message');

// Game State Variables
let currentPlayer = 'X';
let gameActive = true;

// All possible winning combinations (indices of the boxes)
const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event listeners to each box
boxes.forEach( (box,index) => {
    box.addEventListener('click', () => {
        handleBoxClick(index)
    }); 
});


// Handke click event on each box
function handleBoxClick(index) { 

    // Prevents further actions if the game is already won or drawn
    if (!gameActive) {
        return;
    }

    const box = boxes[index]

    // Update the box with the current player's symbol and switch turns
    if (currentPlayer === 'X') {
        box.style.color = 'red';
        box.innerText = 'X';
        currentPlayer = 'O';
    } else {
        box.style.color = 'blue';
        box.innerText = 'O';
        currentPlayer = 'X';
    }

    // Disable the box after it's clicked
    box.disabled = true;

    // Check for a win or draw after each move
    checkWin();
}


// Check if there's a winner or if the game is a draw
const checkWin = () => {

    // Loop through all winning conditions to check if any player has won
    for (let patterns of winningConditions) {   
        // console.log(patterns);
        const [a, b, c] = patterns;
        let boxA = boxes[a].innerText;
        let boxB = boxes[b].innerText;
        let boxC = boxes[c].innerText;

        // console.log(boxes[a].innerText, boxes[b].innerText, boxes[c].innerText);

        // Check if the boxes in the current pattern are all filled and match the same player's symbol
        if (boxA !== '' && boxB !== '' && boxC !== '') {
            if (boxA && boxA === boxB && boxA === boxC) {
                // alert(`Player ${boxA} wins!`);
                gameActive = false;
                showWinner(boxA); // Display the winner message
                resetButton.classList.add('hide');
                return;
            }
        }   
    }

    // Check for a draw if all boxes are filled and there's no winner
    let allFilled = [...boxes].every(box => box.innerText != '');
    if (allFilled && gameActive) {
        message.innerText = "It's a draw!";
        messageContainer.classList.remove('hide');
        resetButton.classList.add('hide');
        gameActive = false;
    }
}


// Display the winner message and show the message container
const showWinner = (winner) => {
    console.log(`Player ${winner} wins!`);
    message.innerText = `Player ${winner} wins!`;
    console.log(message.innerText);
    messageContainer.classList.remove('hide');
}


// Add click event listener to the "Play Again" button to reset the game state
newGameButton.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    messageContainer.classList.add('hide');
    message.innerText = '';
    resetButton.classList.remove('hide');
    currentPlayer = 'X';
    gameActive = true;
});


// Add click event listener to the "Reset Game" button to reset the game state
resetButton.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    messageContainer.classList.add('hide');
    message.innerText = '';
    resetButton.classList.remove('hide');
    currentPlayer = 'X';
    gameActive = true;
}); 


