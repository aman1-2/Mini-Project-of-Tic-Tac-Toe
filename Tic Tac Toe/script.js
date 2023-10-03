const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

/*currentPlayer variable will store the value that which player is currently playing either is X or O. */
let currentPlayer;

/* This is too store all the posible winnning position Once any one sub-array is matched from the winning position stop the game.And enable new game button. */
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* This gameGrid is used for checking the status of the game not seen or used by user its for our purpose of solving and finding the game status whether we have to make a player win or still countinue the game or we have to tie this game as all the boxes are already filled. */
let gameGrid;

/* In the starting phase of the game we have to set few values like the default player should be X all the grid boxes should be empty and newGame button should be disable. */
function initGame() {
  /* By default in starting the current Player is X. */
  currentPlayer = "x";
  /*In starting the the all the boxes in grid are empty. */
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  /* In starting we have to apply css again to all the boxes in order to remove the green background color once a player win. */
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box-${index + 1}`;
  });
  /* In starting the new game Button is hidden. */
  newGamebtn.classList.remove("active");
  /* In starting the  Current Player value is X that we have to update it on our UI. */
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}

//Switching the Player once the turn is Over for the Current Player.
function swapTurn() {
  /* Swapping or changing the player if the currentPlayer was X then make it O and if the Current Player is O then make it X. */
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
  //Once we have swapped or changed our currentPlayer then we have to update it on UI too.
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}

/* Event Listener Handle click this function will look what will happen once a box gets clicked by user. */
function handleClick(index) {
  /* Here we are making it sure that only the empty cell are getting filled and non-emplty boxes are made unchnageable by disabling the property of click on it. */
    //if its empty then
  if (gameGrid[index] === "") {
    //Firstly fill the value in the UI of the grid.
    boxes[index].style.pointerEvents = "none";
    //And then make that box non-selective by making the pointer event none.
    boxes[index].innerHTML = currentPlayer.toUpperCase();
    //After completing the UI task update the gameGrid with which we actually matter this will only tell whether anyone won or still going or its tie.
    gameGrid[index] = currentPlayer;
    //After filling the chance of the currentPlayer we have to change or swap the value of currentPlayer so that the next person could play his chance.
    swapTurn();
    //After every turn we have to check whether any one has won or not (i.e wether the game has over or not.).
    checkGameOver();
  }
}

//Check if the game has over or not or its still going on.
function checkGameOver() {
  /* Created a result variable for storing the result of the game that is winners value. */
  let result = "";
    /* Checking if the winning position are filled or not and if filled then whether they are filled with same value or not */
  winningPostions.forEach((position) => {
    if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]]) {
      //If the winning sub-array is matched (i.e all the position are non-empty and are filled with same value then).
      boxes.forEach((box) => {
        //Then disable the futher clicking by making pointer event as none.
        box.style.pointerEvents = "none";
      });
      //Extarcting the result value if the value present in the winning combination position is X then X is winner otherwise O.
      if (gameGrid[position[0]] === "x") result = "X";
      else result = "O";

      //Filling the boxes of winning combination with light green background color.
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //If we have got our winner and result is not empty.
  if (result !== "") {
    //Then print the winner.
    gameInfo.innerText = `Winner Player - ${result}`;
    //And Start the new game.
    newGamebtn.classList.add("active");
    //If found the winner then we don't have to go futher and return from here only.
    return;
  }

  /* But let's say we haven't find the winner in that case we have to check whether the game is still going we have empty boxes or the grid if full. */
  let boardFilled = true; //Making grid as full.
  gameGrid.forEach((box) => {
    /* checking each box in the board or grid that whether its filled or not if it is filled then stop the game by printing tie and if there are still empty boxes then let them play. */
    if (box === "") boardFilled = false;
  });

  //If all the boxes are filled that means that board or grid is filled then its means that the game has tied.
  if (boardFilled) {
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
    return;
  }
}

//Adding an event Listener on each box.
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

initGame();

newGamebtn.addEventListener("click", initGame);
