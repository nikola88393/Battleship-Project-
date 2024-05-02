import Ship from "./ship";
import gameboard from "./gameboard";

export default function Player() {
  const board = gameboard();
  const ships = [
    Ship(5), // carrier
    Ship(4), // battleship
    Ship(3), // cruiser
    Ship(3), // submarine
    Ship(2), // destroyer
  ];
  const getPlayerBoard = () => board.getGridPlayer();

  const setShipsToBoard = (x, y, orientation) => {
    let result;
    if (ships[0]) {
      result = board.placePlayerShip(ships[0], orientation, x, y);
      if (result instanceof Error) {
        // skip this line if the result of the function calling is an error message
      } else {
        ships.shift();
      }
    } else {
      result = undefined;
    }

    return result;
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
  };
}
