import {
  updateErrorDisplay,
  updateHitShips,
  updateWinnerDisplay,
  winnerDisplayVisibility,
  addClassHitToComputerShip,
} from "../populateDOM";
import Ship from "./ship";

export default function gameboard() {
  const createGrid = () => {
    const board = {
      grid: [],
      areAllSunk: false,
    };
    for (let i = 0; i < 10; i++) {
      const array = [];
      for (let j = 0; j < 10; j++) {
        array.push({
          ship: null,
          isHit: false,
        });
      }
      board.grid.push(array);
    }
    return board;
  };
  const gridPlayer = createGrid();
  const gridComputer = createGrid();

  const getGridPlayer = () => gridPlayer.grid;
  const getGridComputer = () => gridComputer.grid;

  const checkCoordinates = (shipSize, orientation, x, y) => {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Coordinates are out of bounds of the board");
    }

    if (orientation === "h" && y + shipSize > 10) {
      throw new Error("Cannot place ship horizontally. It goes out of bounds.");
    }

    if (orientation === "v" && x + shipSize > 10) {
      throw new Error("Cannot place ship vertically. It goes out of bounds.");
    }

    if (orientation === "h") {
      for (let i = y; i < y + shipSize; i++) {
        if (gridPlayer.grid[x][i].ship !== null) {
          throw new Error(
            "Cannot place ship. There is already a ship in the specified area."
          );
        }
      }
    } else {
      for (let i = x; i < x + shipSize; i++) {
        if (gridPlayer.grid[i][y].ship !== null) {
          throw new Error(
            "Cannot place ship. There is already a ship in the specified area."
          );
        }
      }
    }

    return true;
  };

  const placePlayerShip = (ship, orientation, x, y) => {
    try {
      if (checkCoordinates(ship.size, orientation, x, y)) {
        if (orientation === "h") {
          for (let i = y; i < y + ship.size; i++) {
            gridPlayer.grid[x][i].ship = ship;
          }
          return {
            start: {
              x,
              y,
            },
            end: {
              x,
              y: y + ship.size - 1,
            },
          };
        }
        // for vertical orientation
        for (let i = x; i < x + ship.size; i++) {
          gridPlayer.grid[i][y].ship = ship;
        }
        return {
          start: {
            x,
            y,
          },
          end: {
            x: x + ship.size - 1,
            y,
          },
        };
      }
    } catch (error) {
      return error;
    }

    return null;
  };

  const generateRandomCoordinates = () => {
    const coordinates = [];
    const shipSize = [5, 4, 3, 3, 2];
    while (shipSize.length > 0) {
      const orientation = Math.random() < 0.5 ? "h" : "v";
      let hasOverlap = false;
      let x = 0;
      let y = 0;
      if (orientation === "h") {
        x = Math.floor(Math.random() * 10); // Random row index
        y = Math.floor(Math.random() * (10 - shipSize[0])); // Random column index within bounds
        for (let i = y; i < y + shipSize[0]; i++) {
          if (gridComputer.grid[x][i].ship !== null) {
            hasOverlap = true;
          }
        }
      } else {
        x = Math.floor(Math.random() * (10 - shipSize[0])); // Random row index within bounds
        y = Math.floor(Math.random() * 10); // Random column index
        for (let i = x; i < x + shipSize[0]; i++) {
          if (gridComputer.grid[i][y].ship !== null) {
            hasOverlap = true;
          }
        }
      }
      if (!hasOverlap) {
        coordinates.push({ shipSize: shipSize[0], orientation, x, y });
        const ship = Ship(shipSize[0]);

        if (orientation === "h") {
          for (let i = y; i < y + shipSize[0]; i++) {
            gridComputer.grid[x][i].ship = ship;
          }
        } else {
          for (let i = x; i < x + shipSize[0]; i++) {
            gridComputer.grid[i][y].ship = ship;
          }
        }

        shipSize.shift();
      }
    }
    return coordinates;
  };

  const takeRandomComputerHit = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    // using a constant for a while loop is not a great practice
    // but I've used it here, because there can't be any side effects
    while (1) {
      if (!gridPlayer.grid[x][y].isHit) {
        gridPlayer.grid[x][y].isHit = true;
        if (gridPlayer.grid[x][y].ship) {
          gridPlayer.grid[x][y].ship.hit();
          updateErrorDisplay("Captain, one of our ships took an attack!");
        }
        break;
      } else {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }

    const areAllSunk = gridPlayer.grid.every((row) =>
      row.every((cell) => {
        if (cell.ship) {
          return cell.ship.getIsSunk();
        }
        return true; // Cell doesn't have a ship, so it's effectively "sunk"
      })
    );

    if (areAllSunk) {
      gridPlayer.areAllSunk = true;
    }

    // return the nth child of the grid to mark it on the board
    return x * 10 + y;
  };

  const checkForWin = () => {
    if (gridComputer.areAllSunk) {
      updateWinnerDisplay("Player wins");
      updateErrorDisplay("Well done captain!");
      winnerDisplayVisibility();
    } else if (gridPlayer.areAllSunk) {
      updateWinnerDisplay("Computer wins");
      updateErrorDisplay("Maybe next time..");
      winnerDisplayVisibility();
    }
  };
  // Cheks if the given coordinates have been hit, and if there is a ship.
  // It marks the ship and the cell as hit. The way that the mechanic works is
  // a ship that is set on several adjacent cells is a single object assigned to
  // to multiple coordinates, with each hit,the health of the object decreases.
  const hit = (x, y) => {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      updateErrorDisplay("Coordinates are out of bounds of the board");
    }
    if (!gridComputer.grid[x][y].isHit) {
      if (gridComputer.grid[x][y].ship !== null) {
        gridComputer.grid[x][y].ship.hit();
        addClassHitToComputerShip(x * 10 + y + 1);
        updateErrorDisplay("Captain, we hit the enemy!");
        // Introduce a check that verifies if all ships of the computer board have been sunk
        const areAllSunk = gridComputer.grid.every((row) =>
          row.every((cell) => {
            if (cell.ship) {
              return cell.ship.getIsSunk();
            }
            return true; // Cell doesn't have a ship, so it's effectively "sunk"
          })
        );

        if (areAllSunk) {
          gridComputer.areAllSunk = true;
        }
      }
      gridComputer.grid[x][y].isHit = true;
      updateHitShips(takeRandomComputerHit());
      checkForWin();
    } else {
      updateErrorDisplay("Cell already attacked and marked as hit");
    }
  };

  return {
    getGridPlayer,
    getGridComputer,
    placePlayerShip,
    hit,
    generateRandomCoordinates,
  };
}
