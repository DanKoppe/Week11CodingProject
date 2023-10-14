
const cells = document.querySelectorAll(".cell"); //targeting all elements with the cell class in my HTML file using query selector all and storing them in the cell constant
const gameStatus = document.querySelector(".game--status"); //targeting my game status class and storing it in the gameStatus constant
const restartButton = document.querySelector(".game--restart"); //targeting my game restart class (button) and storing it in the restartButton constant
const winConditions = [  //an array of arrays of winning combinations and storing it in my winConditions constant
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""]; //variable of 9 empty strings to initilize and empty game board
let currentPlayer = "X"; //variable to store current/starting player as "X" to keep track of turns
let running = false; //variable to control if game is currently running or a win condition has been met or a restart has occured

initializeGame(); //starting the game with our initializeGame function


function initializeGame(){ //function to run at game start 
     cells.forEach(cell => cell.addEventListener("click", cellCLicked)); //click event listener for each cell using for each to to loop through each celland calling our cellClicked function when clicked
     restartButton.addEventListener("click", restartGame); //click event listener for restart button that calls restartGame function when clicked
     gameStatus.textContent = `${currentPlayer}'s turn`; //updating text content of our game status to current players turn
     running = true; //setting game running status boolean to true
}

function cellCLicked(){ //function to be called when a cell is clicked
     const cellIndex = this.getAttribute("data-index"); //getting the data index of the clicked cell from our HTML file and storing it in the cellIndex constant

     if(options[cellIndex] != "" || !running){ //if statement to check if the cell is not empty and if the game is not running
          return; //exiting the function if the conditions are met since move is not valid
     }

     updateCell(this, cellIndex); //updateCell function is called on the current cell index if the conditions of the if loop are not met
     checkWinner(); //calling the checkWinner function to check for a winning conbination after the most recent input
}

function updateCell(cell, index){  //function to update a cell if valid move is made taking arguments of cell and index
     options[index] = currentPlayer; //upating the game state array stored in options at the specified index with the symbol corrisponding to the current player
     cell.textContent = currentPlayer;  //changing the text of the slected cell to either "X" or "O" for the current player
}

function changePlayer(){ //function to change between players
     currentPlayer = (currentPlayer == "X") ? "O" : "X"; //toggling the value of current player between "X" and "O" by checking to see if the current player is X and if so assigning O and then vice versa
     gameStatus.textContent = `${currentPlayer}'s turn`; //updating the game status text with the correct current player
}

function checkWinner(){ //function to check for a winner
     let roundWon = false; //variable to keep track of a win, intially set to false

     for(let i = 0; i < winConditions.length; i++){ //for looping through win conditions array
          const condition = winConditions[i]; //getting the current win condition from the array
          const cellA = options[condition[0]]; //value for first cell in win condition
          const cellB = options[condition[1]]; //value for second cell
          const cellC = options[condition[2]]; //value for third cell

          if(cellA == "" || cellB == "" || cellC == ""){ //checking to see if any of the cells are empty
               continue; //if any cells are empty continue to itterate through the array
          }

          if(cellA == cellB && cellB == cellC){ //checking to see if all three cells in the win condition have the same symbol ("X" or "O") if so winner declared
               roundWon = true; //setting round won bolean to true if winning combination is detected
               break; //exiting the loop when winning combition is declared
          }
     }

     if(roundWon){ //if statement for when winner declared
          gameStatus.textContent = `${currentPlayer} is the Winner!`; //updating game status text to displayed correct player as winner
          displayAlert(`${currentPlayer} is the Winner!`, 'alert-success'); //displaying alert when round won
          running = false; //ending the game by setting running to false
     }
     else if(!options.includes("")){ //else if statement to run if there are no more empty cells
          gameStatus.textContent = `Game is a Draw!`; //updating game status text to declare the game as a draw
          displayAlert('Game is a draw', 'alert-warning'); //display alert in case of a draw
          running = false; //ending the game by setting running to false
     }
     else{ // else statement
          changePlayer(); //call the change player method to change players
     }
}

function displayAlert(message, alertClass) { //display alert function with message and class parameters
     const alertElement = document.querySelector('.game--alert'); //targeting HTML game alert
     const alertTextElement = document.querySelector('.game--alert-text'); //targeting HTML game alert text

     alertElement.classList.remove('alert-success', 'alert-warning', 'alert-info', 'alert-danger'); //removing bootstrap classes since I was having some issues with display styling
     alertElement.classList.add(alertClass); //adding alertClass
     alertTextElement.textContent = message; //setting text content of the alert to passed message
     alertElement.classList.remove('d-none'); //removing hidden so alert displays
}

function hideAlert() { //function to hide alert after restart game button is clicked
     const alertElement = document.querySelector('.game--alert'); //targeting HTML alert
     alertElement.classList.add('d-none'); //setting class to d-none to hide alert
 }


function restartGame(){ //function to call when restart game button is clicked
     currentPlayer = "X"; //resetting current player to X
     options = ["", "", "", "", "", "", "", "", "",]; //emptying the cells array stored in options or clearing the gameboard
     gameStatus.textContent = `${currentPlayer}'s turn`; //resetting game status text to current player
     cells.forEach(cell => cell.textContent = ""); //clearing the cell text and removing X and O
     hideAlert(); //rehiding the alert
     running = true; //setting game state to running
}


