import "./style.css";
import { drawGrid, placeShips, switchOrientation } from "./populateDOM";
import player from "./game-logic/player";

const btn = document.getElementById("switchOrientation");
btn.addEventListener("click", switchOrientation);
drawGrid();
const player1 = player();
placeShips(player1);
