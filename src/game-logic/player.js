import Ship from "./ship.js";
import gameboard from "./gameboard.js";

export default function Player() {
  const board = gameboard();
  const ships = [
    Ship(5), // carrier
    Ship(4), // battleship
    Ship(3), // cruiser
    Ship(3), // submarine
    Ship(2), // destroyer
  ];
  const getPlayerBoard = () => {
    return board.getGridPlayer();
  };
  const setShipsToBoard = (x, y) => {
    try {
      if (ships[0]) {
        board.placePlayerShip(ships[0], "v", x, y);
        ships.shift(0);
      } else {
        return "All ships placed";
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
  };
}
