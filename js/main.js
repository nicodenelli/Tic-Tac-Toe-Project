// Base Variables
let highlightWinner = getComputedStyle(document.body).getPropertyValue('--winningCombo');//<- one of my
//favorite lines of code in my project
let winnerDisplay = document.getElementById('winnerDisplay'); //<- displays winner to board
let resetButton = document.getElementById('resetButton');
let gameEnded = false; // this will be used so that no further moves can be made after the winner is established
let squares = Array.from(document.getElementsByClassName('square')); // to prevent having to add an event
// listener to each square I will use the "array like function" to turn this line into an array
const playerX = "X";
const playerO = "O";
let activePlayer = playerO;
// If a user clicks one of the spaces to place their item 'x' or 'o' that space should now be 
// unable to be filled with another item as someone has already played that space
let boxes = Array(9).fill(null)
// until an item is now placed in one of these squares the space will already be filled with
// "null". if there is text there, the pointer changes, if null can place a value
let winTallyX = 0;
let winTallyO = 0;
let overallResetButton = document.getElementById('overallResetButton');
let gameMode;

//==========================================================================================

function launchGame() {
    let twoPlayerButton = document.getElementById('twoPlayerButton');
    twoPlayerButton.addEventListener('click', () => {
        gameMode = 'twoPlayer';
        resetBoard();
        squares.forEach(square => square.addEventListener('click', spaceClicked));
        twoPlayerButton.style.display = 'none';
        onePlayerButton.style.display = 'none';
    });

    let onePlayerButton = document.getElementById('onePlayerButton');
    onePlayerButton.addEventListener('click', () => {
        gameMode = 'onePlayer';
        resetBoard();
        squares.forEach(square => square.addEventListener('click', spaceClicked));
        onePlayerButton.style.display = 'none';
        twoPlayerButton.style.display = 'none';
        if (activePlayer === playerX) {
            makeComputerMove();
        }
    });
}

    

function isBoardFull() {
    // Check if all spaces on the board are filled
    for (let box of boxes) {
        if (!box) {
            return false;
        }
    }
    return true;
}

function updateWinTally() {
    if (theWinner() === playerX) {
        winnerDisplay.innerHTML = `Player ${playerX} wins!`;
        gameEnded = true;
        winTallyX++; // Increment Player X's win tally
        document.getElementById('winTallyX').innerHTML = `Player X Wins: ${winTallyX}`;
    } else if (theWinner() === playerO) {
        winnerDisplay.innerHTML = `Player ${playerO} wins!`;
        gameEnded = true;
        winTallyO++; // Increment Player O's win tally
        document.getElementById('winTallyO').innerHTML = `Player O Wins: ${winTallyO}`;
    } else if (isBoardFull()) {
        winnerDisplay.innerHTML = "It's a Draw!";
        gameEnded = true;
    }
}


//Box clicked function below
function spaceClicked(event) { // <- upon start of the game I want to add an event listener
    // for each square in my boxes array
     // console.log(event.target) <- current event.target to check - when checking this I 
     // can see in the console online that when selecting a square the value it reveals is
     // the coontainer class I created with an id of it's position in the array
    if (gameEnded) {
        return; // Exit the function if the game has ended, this will make it so no other moves other than
        // selecting the play agin button may be made
    }

    const id = event.target.id //<- applying event listener
    if(!boxes[id]) { //<- id from my html, checking to make sure the box selected does not contain
        // this id
        boxes[id] = activePlayer;
        event.target.innerText = activePlayer;

if(theWinner() !== false){ //<- if the below theWinner function does not return false then 
    // the result is a win
    winnerDisplay.innerHTML = `Player ${activePlayer} wins!` // <-this will also need to reset when
    // the reset button is clicked - BE SURE TO ADD THIS TO RESET FUNCTION
    let winningCombo = theWinner() //<- this new variable will equal the winning array
    // that was returned in theWinner() function
    // console.log(winningCombo) - can see when placing an x in one of the winnerVatiations
    // like 0, 1, 2 or 2, 5, 8 that one of the winningVariations is returned, now I need 
    // to use map so that at position squares[square]or at (square 0,1)(square 0,2)(square 0,3)
    // to add the highlightWinner value which is a style so the winning variation will
    // be highlighted when a player has won. Depending on if user x or o has won I need to 
    // return that so I can physically see the highlighted change

    winningCombo.map(square => squares[square].style.backgroundColor = highlightWinner)
    gameEnded = true; // game has ended is true, no further moves other than restting the board may be made
    
    if (activePlayer === 'X') {
        winTallyX++; // Increment Player X's win tally
        document.getElementById('winTallyX').innerHTML = `Player X Wins: ${winTallyX}`;
    } else {
        winTallyO++; // Increment Player O's win tally
        document.getElementById('winTallyO').innerHTML = `Player O Wins: ${winTallyO}`;
    }
    return;// mapping over the squares array and applying background color to the winning
    // combo, since I have winning combo= theWinner, once a win occurs, the three values
    // that show when console.logging the winningCombo will now be highlighted as I have attached
    // my highlightWinner variable to this map function.
} else if (isBoardFull()) {
    winnerDisplay.innerHTML = "It's a Draw!";
    gameEnded = true;
    return;
}

//   if ->
activePlayer = activePlayer == playerO ? playerX : playerO; //<- if activePlayer is equal to variable activePlayer
// that is equal to playerO then change it to playerX else change it to playerO. Essentially
// this allows the game to switch between O and X each time an O or an X is placed on the board
if (gameMode === 'onePlayer' && activePlayer === playerX) {
    makeComputerMove();
}
}
}

function makeComputerMove() {
    
    let emptyIndexes = [];
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i]) {
            emptyIndexes.push(i);
        }
    }

    let randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    let computerMove = emptyIndexes[randomIndex];

    setTimeout(() => {
        boxes[computerMove] = playerX;
        squares[computerMove].innerText = playerX;

        if (theWinner() !== false) {
            winnerDisplay.innerHTML = `Player ${playerX} wins!`;
            let winningCombo = theWinner();
            winningCombo.map(square => squares[square].style.backgroundColor = highlightWinner);
            gameEnded = true;
            updateWinTally();
            return;
        } else if (isBoardFull()) {
            winnerDisplay.innerHTML = "It's a Draw!";
            gameEnded = true;
            return;
        }

        activePlayer = playerO;
    }, 500);
}

// In order for the computer to recognize when a win has occured (3 of the same character)
// in a row. I need to tell the computer which varialtions to look for when determining a winner
//board index
// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8

const winnerVariations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]
// Since the above variable is an array of arrays I can use a for loop to loop over 
// winnerVariations to determine if there is a winner.

function theWinner() {
    for (const condition of winnerVariations) { // <- (const iterator of object)
         let [x, o, t] = condition // <- storing the values from the winnerVariations
         // array inside x, o, and t and the numbers will not need to be in order
// 0, 1, 2 is the same as 2, 1, 0 and 1, 2, 0 etc...
if (boxes[x] && (boxes[x] == boxes[o] && boxes[x] == boxes[t])) {//<- if the value of the boxes array at location x on the board [a]
    // is equal to the value of the box located at position o are the same, this will produce a win. 
    // The value of the boxes being x or o, so if an x is at position x, and x is at position o the
    // expression will continue to check if position t has the value of x to determine a win
    // if not all 3 values are the same, it will result in a false statement, and there will be no winner
    // until one of the above variation "conditions" have been met
return [x, o, t] // <- returning the winner variation

} 

    }
    return false //<- if none of the variations from my winnerVariations array have occured
    // then return false which will result also in a tie
}

resetButton.addEventListener('click', resetBoard);

function resetBoard() {// <-favorite function, succesfully clears board back to original state and changes title
    // back to it's original state
    boxes.fill(null) // <- this will override my spaces array now containing items and
    // fill the array with "null" items as it was in the beginning of the game
    squares.forEach(square => {
        square.innerText = ""; // <- remove the x's and o's displayed on my board
        // the highlighted squares need to be removed when I click the "Play Again!" button
        square.style.backgroundColor = "";//<- sets the background color of the winning squares back to nothing
    })
    winnerDisplay.innerHTML = ""; // <- changes the text at the top from displaying
// the winner back to nothing, just displaying the board, the title, and the play again button

    activePlayer = playerO;
    gameEnded = false;
    document.getElementById('winTallyX').innerHTML = `Player X Wins: ${winTallyX}`;
    document.getElementById('winTallyO').innerHTML = `Player O Wins: ${winTallyO}`;

}

overallResetButton.addEventListener('click', resetOverallTally);

function resetOverallTally() {
    winTallyX = 0; // Reset Player X's win tally
    winTallyO = 0; // Reset Player O's win tally
    document.getElementById('winTallyX').innerHTML = `Player X Wins: ${winTallyX}`;
    document.getElementById('winTallyO').innerHTML = `Player O Wins: ${winTallyO}`;
}

let refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', refreshGame);

function refreshGame() {
    // Reset all variables and win tallies to their original state
    gameMode = undefined;
    winTallyX = 0;
    winTallyO = 0;
    resetBoard();
    twoPlayerButton.style.display = 'block'; // Show the game mode selection buttons again
    onePlayerButton.style.display = 'block';
    document.getElementById('winTallyX').innerHTML = `Player X Wins: ${winTallyX}`;
    document.getElementById('winTallyO').innerHTML = `Player O Wins: ${winTallyO}`;
}


launchGame()

