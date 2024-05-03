import "./style.css";
import {
  drawGrid,
  placeShips,
  // markComputerShips,
  winnerDisplayVisibility,
} from "./populateDOM";
import player from "./game-logic/player";

// const btn = document.getElementById("switchOrientation");
// btn.addEventListener("click", switchOrientation);
function startGame() {
  drawGrid();
  const player1 = player();
  placeShips(player1);
  player1.setComputerShipsToBoard();
  // markComputerShips(coordinatesToMark);
}
const resetBtn = document.getElementById("resetGame");
resetBtn.addEventListener("click", () => {
  const grids = document.querySelectorAll(".grid");
  grids.forEach((element) => {
    const grid = element;
    grid.innerHTML = "";
  });
  winnerDisplayVisibility();
  startGame();
});

startGame();
