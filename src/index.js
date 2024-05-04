import "./style.css";
import { drawGrid, placeShips, winnerDisplayVisibility } from "./populateDOM";
import player from "./game-logic/player";

function startGame() {
  drawGrid();
  const player1 = player();
  placeShips(player1);
  player1.setComputerShipsToBoard();
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
