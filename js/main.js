// Base Variables
let highlightWinner = getComputedStyle(document.body).getPropertyValue('--winningCombo');//<- added at end
let squares = Array.from(document.getElementsByClassName('square')); // to prevent having to add an event
// listener to each square I will use the array like function to turn this line into an array
let titleDisplay = document.getElementById('titleDisplay');
let resetButton = document.getElementById('resetButton');
const playerO = "O";
const playerX = "X";
let activePlayer = playerO;
// If a user clicks one of the spaces to place their item 'x' or 'o' that space should now be 
// unable to be filled with another item as someone has already played that space
let boxes = Array(9).fill(null)
// until an item is placed in one of these squares the space will already be filled with
// "null" now all spaces are technically full and will be until the game is completed

//==========================================================================================

// The game will begin once one of the squares is "clicked", after I will add the functionality
// of adding the value of X or O when clicking on a specific square.
const launchGame = () => {
    squares.forEach(square => square.addEventListener('click', spaceClicked));
}

// Box clicked function:
function spaceClicked(event) { // upon start of game I want to add an event listener
// for each square in my boxes array.
// <- console.log(event.target) <- current event.target to check - when checking this I 
// can see in the console online that when selecting a square the value it reveals is
// the container class I created with an id of it's position in the array (<container class="square" id="0"></container>)
const id = event.target.id //<- applying the event listener
if(!boxes[id]) { // <- id from my html - checking to make sure the box selected does not contain this id
    boxes[id] =  activePlayer;
    event.target.innerText =  activePlayer;

    if(theWinner()){
        titleDisplay.innerHTML = `Player ${activePlayer} wins!`
        let winningCombo = theWinner() // <- this new variable will equal the winning array
    //that was returned in theWinner() function
    // console.log(winningCombo) - can see when placing an X in one of the winnerVariations
    // like 0, 1, 2 or 2, 5, 8 that one of the winningVariations is returned, now I need 
    // to use map so that at position squares[square]or at (square 0,1)(square 0,2)(square 0,3)
    // to add the highlightWinner value which is a style so the winning variation will
    // be highlighted when a player has won. Depending on if user x or o has won I need to 
    // return that so I can physically see the highlighted change

    winningCombo.map(square => squares[square].style.backgroundColor = highlightWinner)
    return
    }

    // if ->
    activePlayer = activePlayer == playerO ? playerX : playerO; //<- if activePlayer is equal to 
    // variable activePlayer that is equal to playerO then change it to playerX else change it 
    // to playerO. Essentially this allows the game to switch between O and X each time an O or 
    // an X is placed on the board
    }
}

