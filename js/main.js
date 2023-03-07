// Base Variables
let highlightWinner = getComputedStyle(document.body).getPropertyValue('--winningCombo');
let titleDisplay = document.getElementById('titleDisplay');
let resetButton = document.getElementById('resetButton');
let squares = Array.from(document.getElementsByClassName('square')); // to prevent having to add an event
// listener to each square I will use the array like function to turn this line into an array
const playerO = "O";
const playerX = "X";
let activePlayer = playerO;
// If a user clicks one of the spaces to place their item 'x' or 'o' that space should now be 
// unable to be filled with another item as someone has already played that space
let boxes = Array(9).fill(null)
// until an item is now placed in one of these squares the space will already be filled with
// "null" now all spaces are technically full and will be until the game is completed

//==========================================================================================
