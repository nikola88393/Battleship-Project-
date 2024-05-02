import Ship from "./ship";
import gameboard from "./gameboard";
import { updateErrorDisplay } from "../populateDOM";

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
        if (typeof result === "object") {
          ships.shift();
        } else {
          updateErrorDisplay(result);
        }
      } else {
        result = null;
      }

      return result;
    } catch (err) {
      updateErrorDisplay(err);
      // throw new Error(err);
    }
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
  };
}
