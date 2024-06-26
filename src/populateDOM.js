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
  const shipsSizes = [5, 4, 3, 3, 2];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      updateErrorDisplay("Plan carefully!");
      // Temporary solution for removing leftover hover class on last ship cells
      cells.forEach((element) => {
        element.classList.remove("hover");
      });
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
        shipsSizes.shift();
      }
    });

    cell.addEventListener("mouseover", () => {
      const index = Array.from(cell.parentElement.children).indexOf(cell);
      const { orientation } =
        document.getElementById("switchOrientation").dataset;
      const cellsToHighlight = [];
      if (orientation === "h") {
        if ((index % 10) + shipsSizes[0] <= 10) {
          for (let i = 0; i < shipsSizes[0]; i++) {
            const nextCell = cell.parentElement.children[index + i];
            cellsToHighlight.push(nextCell);
          }
        } else {
          for (let i = 0; i < 10 - (index % 10); i++) {
            const nextCell = cell.parentElement.children[index + i];
            cellsToHighlight.push(nextCell);
          }
        }

        if (cellsToHighlight.length === shipsSizes[0]) {
          cellsToHighlight.forEach((element) => element.classList.add("hover"));
        } else {
          cellsToHighlight.forEach((element) =>
            element.classList.add("hoverInvalid")
          );
        }
      } else {
        if (Math.floor(index / 10) + shipsSizes[0] <= 10) {
          for (let i = 0; i < shipsSizes[0]; i++) {
            const nextCell = cell.parentElement.children[index + 10 * i];
            cellsToHighlight.push(nextCell);
          }
        } else {
          for (let i = 0; i < 10 - Math.floor(index / 10); i++) {
            const nextCell = cell.parentElement.children[index + 10 * i];
            cellsToHighlight.push(nextCell);
          }
        }

        if (cellsToHighlight.length === shipsSizes[0]) {
          cellsToHighlight.forEach((element) => element.classList.add("hover"));
        } else {
          cellsToHighlight.forEach((element) =>
            element.classList.add("hoverInvalid")
          );
        }
      }
    });

    cell.addEventListener("mouseout", () => {
      const index = Array.from(cell.parentElement.children).indexOf(cell);
      const { orientation } =
        document.getElementById("switchOrientation").dataset;
      const cellsToUnhighlight = [];
      if (orientation === "h") {
        if ((index % 10) + shipsSizes[0] <= 10) {
          for (let i = 0; i < shipsSizes[0]; i++) {
            const nextCell = cell.parentElement.children[index + i];
            cellsToUnhighlight.push(nextCell);
          }
        } else {
          for (let i = 0; i < 10 - (index % 10); i++) {
            const nextCell = cell.parentElement.children[index + i];
            cellsToUnhighlight.push(nextCell);
          }
        }

        if (cellsToUnhighlight.length === shipsSizes[0]) {
          cellsToUnhighlight.forEach((element) =>
            element.classList.remove("hover")
          );
        } else {
          cellsToUnhighlight.forEach((element) =>
            element.classList.remove("hoverInvalid")
          );
        }
      } else {
        if (Math.floor(index / 10) + shipsSizes[0] <= 10) {
          for (let i = 0; i < shipsSizes[0]; i++) {
            const nextCell = cell.parentElement.children[index + 10 * i];
            cellsToUnhighlight.push(nextCell);
          }
        } else {
          for (let i = 0; i < 10 - Math.floor(index / 10); i++) {
            const nextCell = cell.parentElement.children[index + 10 * i];
            cellsToUnhighlight.push(nextCell);
          }
        }

        if (cellsToUnhighlight.length === shipsSizes[0]) {
          cellsToUnhighlight.forEach((element) =>
            element.classList.remove("hover")
          );
        } else {
          cellsToUnhighlight.forEach((element) =>
            element.classList.remove("hoverInvalid")
          );
        }
      }
    });
  });
}
// remove all event listeneners by cloning each cell node
export function disableShipPlacement() {
  const cells = document.querySelectorAll(".cellPlayer");
  cells.forEach((cell) => {
    cell.replaceWith(cell.cloneNode(true));
  });
}

export function enableAttacks(player) {
  const cells = document.querySelectorAll(".cellComputer");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      updateErrorDisplay("Time to attack!");
      const id = cell.id.slice(8);
      const x = parseInt(id.slice(0, 1), 10);
      const y = parseInt(id.slice(1), 10);
      cell.classList.add("hit");
      player.hit(x, y);
    });
  });
}

export const updateHitShips = (n) => {
  const hitCell = document.querySelector(`.playerGrid p:nth-child(${n + 1})`);
  hitCell.classList.add("hit");
};

export const updateWinnerDisplay = (input) => {
  const winner = document.getElementById("winner");
  winner.innerHTML = input;
};

export const winnerDisplayVisibility = () => {
  const winnerScreen = document.querySelector(".winnerScreen");
  const computedStyle = window.getComputedStyle(winnerScreen);
  const display = computedStyle.getPropertyValue("display");

  if (display === "none") {
    winnerScreen.style.display = "flex";
  } else {
    winnerScreen.style.display = "none";
  }
};

export const addClassHitToComputerShip = (n) => {
  const computerGrid = document.querySelector(`.cellComputer:nth-child(${n})`);
  computerGrid.classList.add("ship");
};

const btn = document.getElementById("switchOrientation");
btn.addEventListener("click", switchOrientation);
function toggleInstructions() {
  const instructions = document.querySelector(".instructionsContainer");
  const displayValue = window
    .getComputedStyle(instructions)
    .getPropertyValue("display");

  if (displayValue === "none") {
    instructions.style.display = "flex";
  } else {
    instructions.style.display = "none";
  }
}
const toogleInstructionsBtns = document.querySelectorAll(".toggleInstructions");
toogleInstructionsBtns.forEach((element) => {
  element.addEventListener("click", toggleInstructions);
});
