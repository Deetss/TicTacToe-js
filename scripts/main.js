/*jshint esversion: 6 */

var gameboard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

const markers = ["X", "O"];
var curTurn = 0;

const Player = (nameInput, playerNum) => {
  let mark = markers[playerNum - 1];
  let name = nameInput;
  
  return { name, mark };
};

const player1 = Player(prompt("Enter a name for Player 1:"), 1);
const player2 = Player(prompt("Enter a name for Player 2:"), 2);
var players = [player1, player2];

var currentPlayer;

function generateBoard() {
  var container = document.createElement("div");
  currentPlayer = players[0];
  document.querySelector('body').appendChild(container);
  container.classList.add("board");

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      var cell = document.createElement("div");
      var content = document.createElement("span");

      container.appendChild(cell);
      cell.setAttribute("id", "cell-"+ x + "-" + y);
      cell.setAttribute("style", "background-color: white;");
      cell.appendChild(content);

      content.innerHTML = gameboard[y][x];

      cell.addEventListener("click", function() {
        if (validMove(x, y)) {
          placeMark(currentPlayer.mark, x, y);
        }
      });
    }
  }
}

function clearBoard() {
  var container = document.querySelector(".board");
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      var cell = document.querySelector("#cell-"+ x + "-" + y);
      var content = cell.childNodes[0];
      cell.removeChild(content);
      container.removeChild(cell);
    }
  }
  container.parentNode.removeChild(container);
}

function resetGame() {
  gameboard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  curTurn = 0;
  players = [player1, player2];
  clearBoard();
  generateBoard();
}

function placeMark(mark, posX, posY) {
  var cell = document.querySelector("#cell-"+ posX + "-" + posY);
  var content = cell.childNodes[0];
  
  gameboard[posY][posX] = mark;
  
  content.innerHTML = gameboard[posY][posX];
  
  checkBoard(currentPlayer);
  rotatePlayer();
}

function validMove(posX, posY) {
  return gameboard[posY][posX] == " ";
}

function checkBoard(currentTurnPlayer) {
  if (gameboard[0][0] == currentTurnPlayer.mark && gameboard[0][1] == currentTurnPlayer.mark && gameboard[0][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[1][0] == currentTurnPlayer.mark && gameboard[1][1] == currentTurnPlayer.mark && gameboard[1][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[2][0] == currentTurnPlayer.mark && gameboard[2][1] == currentTurnPlayer.mark && gameboard[2][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[0][0] == currentTurnPlayer.mark && gameboard[1][0] == currentTurnPlayer.mark && gameboard[2][0] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[0][1] == currentTurnPlayer.mark && gameboard[1][1] == currentTurnPlayer.mark && gameboard[2][1] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[0][2] == currentTurnPlayer.mark && gameboard[1][2] == currentTurnPlayer.mark && gameboard[2][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[0][0] == currentTurnPlayer.mark && gameboard[1][1] == currentTurnPlayer.mark && gameboard[2][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (gameboard[2][0] == currentTurnPlayer.mark && gameboard[1][1] == currentTurnPlayer.mark && gameboard[0][2] == currentTurnPlayer.mark) {
    gameOver();
  } else if (curTurn >= 8){
    gameOver("tie");
  }else {
    console.log("Still playing!");
  }
}

function rotatePlayer() {
  players.reverse();
  currentPlayer = players[0];
  curTurn++;
}

function gameStart() {
  generateBoard();
}

function gameOver(result = "") {
  if (result == "tie"){
    alert("Its a tie!!!");
  } else {
    alert(currentPlayer.name + " is the winner!");
  }
  resetGame();
}

gameStart();
