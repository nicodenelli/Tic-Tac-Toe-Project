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
}

}