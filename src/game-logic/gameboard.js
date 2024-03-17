export default function gameboard() {
  // The possible hits you can make are 17, because there are
  // are five ships that have health as follows: 5, 4, 3, 3, 2.
  // When this number hits 0, all ships will be sunk, therefor the game ends
  let possibleHits = 17;
  // IIFE that creates the grid object
  // it consists of a 2D array filled with objects that
  // contain the properies 'ship' and 'hit'
  const gridPlayer = (function createGrid() {
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
  })();

  const getGridPlayer = () => gridPlayer.grid;

  const checkCoordinates = (shipSize, orientation, x, y) => {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Coordinates are out of bounds of the board");
    }

    if (orientation === "h" && y + shipSize > 9) {
      throw new Error("Cannot place ship horizontally. It goes out of bounds.");
    }

    if (orientation === "v" && x + shipSize > 9) {
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
    // let ship = Ship(shipSize);
    try {
      if (checkCoordinates(ship.size, orientation, x, y)) {
        if (orientation === "h") {
          for (let i = y; i < y + ship.size; i++) {
            gridPlayer.grid[x][i].ship = ship;
          }
        }
        if (orientation === "v") {
          for (let i = x; i < x + ship.size; i++) {
            gridPlayer.grid[i][y].ship = ship;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updatePossibleHits = () => {
    possibleHits -= 1;
    if (!possibleHits) {
      // implement logic later on
      throw new Error("Game over");
    }
  };
  // Cheks if the given coordinates have been hit, and if there is a ship.
  // It marks the ship and the cell as hit. The way that the mechanic works is
  // a ship that is set on several adjacent cells is a single object assigned to
  // to multiple coordinates, with each hit,the health of the object decreases.
  const hit = (x, y) => {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Coordinates are out of bounds of the board");
    }
    if (!gridPlayer.grid[x][y].isHit) {
      if (gridPlayer.grid[x][y].ship !== null) {
        gridPlayer.grid[x][y].ship.hit();
      }
      gridPlayer.grid[x][y].isHit = true;
      try {
        updatePossibleHits();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new Error("Cell already attacked and marked as hit");
    }
  };

  return {
    getGridPlayer,
    placePlayerShip,
    hit,
  };
}

// let board = gameboard();
// board.placePlayerShip(5, "h", 1, 1);
// board.placePlayerShip(5, "h", 2, 4);
// board.placePlayerShip(3, "h", 3, 2);
// board.placePlayerShip(3, "v", 0, 0);
// // board.placePlayerShip(4, "v", 3, 4);
// // console.log(board.getGridPlayer());
// // board.hit(1, 1);
// // board.hit(1, 2);
// // board.hit(1, 3);
// // board.hit(1, 4);
// // board.hit(1, 5);
// // board.hit(4, 5);
// // board.hit(2, 3);
// // board.hit(3, 4);
// console.log(board.getGridPlayer());
