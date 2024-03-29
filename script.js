// Initialise the variables
const resultText = document.querySelector('#result');
const playerMoveText = document.querySelector('#playerMove');
const computerMoveText = document.querySelector('#computerMove');
const playerScoreText = document.querySelector('#playerScore');
playerScoreText.textContent = "Your score: ";
const computerScoreText = document.querySelector('#computerScore');
computerScoreText.textContent = "Computer score: ";
const currentRoundBox = document.querySelector('#currentRound');
currentRoundBox.textContent = "Current round: 1";

const playAgainButton = document.querySelector('#playAgain');
const paperButton = document.getElementById("paperButton");
const scissorsButton = document.getElementById("scissorsButton");
const rockButton = document.getElementById("rockButton");

let currentRound = 1;
let playerScore = 0;
let computerScore = 0;

// Function to generate the computer's response
function getComputerMove() {
    let currentPlay = Math.floor(Math.random() * 3);
    if (currentPlay === 1) {
        computerMove = "Paper";
    } else if (currentPlay === 2) {
        computerMove = "Scissors";
    } else {
        computerMove = "Rock";
    }
    return computerMove;
}

// See who wins one round
function evaluateWinner(player, computer) {
    if ( (playerMove == "Paper" && computerMove == "Paper") || (playerMove == "Scissors" && computerMove == "Scissors") || (playerMove == "Rock" && computerMove == "Rock") ) {
        return "draw";
    } else if ( (playerMove == "Paper" && computerMove == "Rock") || (playerMove == "Scissors" && computerMove == "Paper") || (playerMove == "Rock" && computerMove == "Scissors") ) {
        playerScore ++;
        return "win";
    } else {
        computerScore ++;
        return "lose";
    }
}

// Put everything into the round itself
function newRound(player) {
    computerMove = getComputerMove();
    playerMove = player;
    roundResult = evaluateWinner(playerMove, computerMove);

    // Print results of the current round
    playerMoveText.textContent = `Your move: ${playerMove}`;
    computerMoveText.textContent = `Computer move: ${computerMove}`;
    result.textContent = `You ${roundResult}!`;
    playerScoreText.textContent = `Your score: ${playerScore}`;
    computerScoreText.textContent = `Computer score: ${computerScore}`;

    function addComputerHighlight(computerButton, winState) {
        winState = winState[0].toUpperCase() + winState.substring(1);
    
        // Get rid of all old styles
        rockButton.classList.remove("computerSelectedUserWin", "computerSelectedUserWin:hover", "computerSelectedUserDraw", "computerSelectedUserDraw:hover", "computerSelectedUserLose", "computerSelectedUserLose:hover");
        scissorsButton.classList.remove("computerSelectedUserWin", "computerSelectedUserWin:hover", "computerSelectedUserDraw", "computerSelectedUserDraw:hover", "computerSelectedUserLose", "computerSelectedUserLose:hover");
        paperButton.classList.remove("computerSelectedUserWin", "computerSelectedUserWin:hover", "computerSelectedUserDraw", "computerSelectedUserDraw:hover", "computerSelectedUserLose", "computerSelectedUserLose:hover");
    
        // Add computer selection highlight
        console.log(`computerSelectedUser${winState}`, `computerSelectedUser${winState}:hover`);
        computerButton.classList.add(`computerSelectedUser${winState}`, `computerSelectedUser${winState}:hover`);
    }

    // Change highlight colour of computer's selection
    let computerButton = document.getElementById(computerMove.toLowerCase() + "Button");
    addComputerHighlight(computerButton, roundResult);
    
    // Update current round
    currentRound ++;
    currentRoundBox.textContent = `Current round: ${currentRound}`;
    return;
}

function gameOver(){
    playerMoveText.textContent = `Your final score: ${playerScore}`;
    computerMoveText.textContent = `Computer final score: ${computerScore}`;
    gameIsDone = true;
    if (playerScore > computerScore) {
        result.textContent = `You won!`;
    } else {
        result.textContent = `You lost!`;
    }
}

function newGame() {
    playerScore = 0;
    computerScore = 0;

    function addUserHighlight(playerSelection) {
        // Remove old styles
        paperButton.classList.remove("userSelected", "userSelected:hover");
        rockButton.classList.remove("userSelected", "userSelected:hover");
        scissorsButton.classList.remove("userSelected", "userSelected:hover");

        // Apply new style
        let userButton = document.getElementById(playerSelection.toLowerCase() + "Button");
        userButton.classList.add("userSelected", "userSelected:hover"); 
    }

    paperButton.addEventListener("click", function(){
        let playerSelection = "Paper";
        addUserHighlight(playerSelection);
        newRound(playerSelection);
        return;
    });
    scissorsButton.addEventListener("click", function(){
        let playerSelection = "Scissors";
        addUserHighlight(playerSelection);
        newRound(playerSelection);
        return;
    });
    rockButton.addEventListener("click", function(){
        let playerSelection = "Rock";
        addUserHighlight(playerSelection);
        newRound(playerSelection);
        return;
    });
}

// Call the start of the game
playAgainButton.addEventListener("click", function(){

    // Clear results
    playerMoveText.textContent = ``;
    computerMoveText.textContent = ``;
    result.textContent = ``;
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    playerScoreText.textContent = `Your score: ${playerScore}`;
    computerScoreText.textContent = `Computer score: ${computerScore}`;
    currentRoundBox.textContent = `Current round: ${currentRound}`;
    newGame();
});
newGame();