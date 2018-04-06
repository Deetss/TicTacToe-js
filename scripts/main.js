/*jshint esversion: 6 */

var gameboard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

const markers = ["X", "O"];
var curTurn = 0;

const Player = (name, playerNum) => {
  let mark = markers[playerNum - 1];

  return { name, mark };
};

const player1 = Player(prompt("Enter a name for Player 1:"), 1);
const player2 = Player(prompt("Enter a name for Player 2:"), 2);
var players = [player1, player2];

var currentPlayer = players[0];

function generateBoard() {
  var container = document.createElement("div");
  currentPlayer = players[0];
  document.querySelector('body').appendChild(container);
  container.classList.add("sticky-note");

  for (let y = 0; y < 3; y++) {
    var row = document.createElement("div");
    var curRow = container.appendChild(row);
    curRow.setAttribute("id", "row-" + y);
    for (let x = 0; x < 3; x++) {
      var cell = document.createElement("div");
      var content = document.createElement("span");

      curRow.appendChild(cell);
      cell.setAttribute("class", "cell-" + x);
      cell.appendChild(content);
      cell.setAttribute('data-id', x + " " + y);

      content.innerHTML = gameboard[y][x];

      cell.addEventListener("click", function() {
        if (validMove(x, y)) {
          placeMark(currentPlayer.mark, x, y);
          rotatePlayer();
        }
        refreshBoard();
      });
    }
  }
}

function clearBoard() {
  var container = document.getElementById("board-container");
  for (let y = 0; y < 3; y++) {
    var curRow = document.getElementById("row-" + y);
    for (let x = 0; x < 3; x++) {
      var cell = document.querySelector(".cell-" + x);
      curRow.removeChild(cell);
    }
    container.removeChild(curRow);
  }
}

function refreshBoard() {
  clearBoard();
  generateBoard();
}

function resetGame() {
  gameboard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];

  players = [player1, player2];
}

function placeMark(mark, posX, posY) {
  gameboard[posY][posX] = mark;
  checkBoard(currentPlayer);
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
  players = players.reverse();
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
