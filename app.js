let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-button');
let newGameButton = document.querySelector('#play-again-button');
let messageContainer = document.querySelector('.msg-container');
let message = document.querySelector('#message');

let currentPlayer = 'X';

let gameActive = true;

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

function handleBoxClick(index) { 

    if (!gameActive) {
        return;
    }

    const box = boxes[index]
    if (currentPlayer === 'X') {
        box.innerText = 'X';
        currentPlayer = 'O';
    } else {
        box.innerText = 'O';
        currentPlayer = 'X';
    }
    box.disabled = true;

    checkWin();
}

boxes.forEach( (box,index) => {
    box.addEventListener('click', () => {
        handleBoxClick(index)
    }); 
});

const checkWin = () => {
    for (let patterns of winningConditions) {   
        console.log(patterns);
        const [a, b, c] = patterns;
        let boxA = boxes[a].innerText;
        let boxB = boxes[b].innerText;
        let boxC = boxes[c].innerText;

        // console.log(boxes[a].innerText, boxes[b].innerText, boxes[c].innerText);

        if (boxA !== '' && boxB !== '' && boxC !== '') {
            if (boxA && boxA === boxB && boxA === boxC) {
                // alert(`Player ${boxA} wins!`);
                gameActive = false;
                showWinner(boxA);
                resetButton.classList.add('hide');
                return;
            }
        }   
    }

    let allFilled = [...boxes].every(box => box.innerText != '');
    if (allFilled && gameActive) {
        message.innerText = "It's a draw!";
        messageContainer.classList.remove('hide');
        resetButton.classList.add('hide');
        gameActive = false;
    }
}

const showWinner = (winner) => {
    console.log(`Player ${winner} wins!`);
    message.innerText = `Player ${winner} wins!`;
    console.log(message.innerText);
    messageContainer.classList.remove('hide');
}

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


