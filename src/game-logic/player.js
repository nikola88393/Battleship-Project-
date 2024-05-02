import Ship from "./ship";
import gameboard from "./gameboard";
import { disableShipPlacement } from "../populateDOM";

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
      if (ships.length === 1) {
        result = board.placePlayerShip(ships[0], orientation, x, y);
        if (result instanceof Error) {
          // skip the line below if the result of the function calling is an error message
        } else {
          ships.shift();
          disableShipPlacement();
        }
      } else {
        result = board.placePlayerShip(ships[0], orientation, x, y);
        if (result instanceof Error) {
          // skip the line below if the result of the function calling is an error message
        } else {
          ships.shift();
        }
      }
    } else {
      result = undefined;
    }

    return result;
  };

  const setComputerShipsToBoard = () => {
    const coordinates = board.generateRandomCoordinates();
    return coordinates;
  };

  return {
    getPlayerBoard,
    setShipsToBoard,
    setComputerShipsToBoard,
  };
}
