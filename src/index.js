import "./style.css";
import { drawGrid, placeShips, markComputerShips } from "./populateDOM";
import player from "./game-logic/player";

// const btn = document.getElementById("switchOrientation");
// btn.addEventListener("click", switchOrientation);
function startGame() {
  drawGrid();
  const player1 = player();
  placeShips(player1);
  const coordinatesToMark = player1.setComputerShipsToBoard();
  markComputerShips(coordinatesToMark);
}

startGame();
