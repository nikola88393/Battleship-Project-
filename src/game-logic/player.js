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
      if (ships[0]) {
        board.placePlayerShip(ships[0], orientation, x, y);
        ships.shift(0);
      } else {
        return "All ships placed";
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
  };
}
