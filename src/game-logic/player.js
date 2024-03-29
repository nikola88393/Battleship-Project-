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

  // eslint-disable-next-line consistent-return
  const setShipsToBoard = (x, y, orientation) => {
    try {
      let result;
      if (ships[0]) {
        result = board.placePlayerShip(ships[0], orientation, x, y);
        ships.shift();
      } else {
        result = "All ships placed";
      }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
  };
}
