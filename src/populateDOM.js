export function drawGrid() {
  const containerPlayer = document.querySelector(".playerGrid");
  const containerComputer = document.querySelector(".computerGrid");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellPlayer = document.createElement("p");
      const cellComputer = document.createElement("p");
      cellPlayer.id = `player${i.toString()}${j.toString()}`;
      cellComputer.id = `computer${i.toString()}${j.toString()}`;
      cellPlayer.classList.add("cellPlayer");
      cellComputer.classList.add("cellComputer");
      containerPlayer.appendChild(cellPlayer);
      containerComputer.appendChild(cellComputer);
    }
  }
}
export function switchOrientation() {
  const btn = document.getElementById("switchOrientation");

  btn.dataset.orientation = btn.dataset.orientation === "v" ? "h" : "v";
  btn.innerHTML = btn.innerHTML === "Vertical" ? "Horizontal" : "Vertical";
}

export function updateErrorDisplay(err = null) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.innerHTML = err === null ? null : err;
}

export function placeShips(player) {
  const cells = document.querySelectorAll(".cellPlayer");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const id = cell.id.slice(6);
      const { orientation } =
        document.getElementById("switchOrientation").dataset;
      const x = parseInt(id.slice(0, 1), 10);
      const y = parseInt(id.slice(1), 10);
      const coordinatesToMark = player.setShipsToBoard(x, y, orientation);
      if (coordinatesToMark === undefined) {
        updateErrorDisplay("all ships placed");
      } else if (coordinatesToMark instanceof Error) {
        updateErrorDisplay(coordinatesToMark);
      } else {
        const { start, end } = coordinatesToMark;

        for (let i = start.x; i <= end.x; i++) {
          for (let j = start.y; j <= end.y; j++) {
            const cellWithShip = document.getElementById(`player${i}${j}`);
            cellWithShip.classList.add("ship");
          }
        }
      }
    });
  });
}
