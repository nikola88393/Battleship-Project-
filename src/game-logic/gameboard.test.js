import gameboard from "./gameboard";

describe("gameboard executes correctly", () => {
  let board = gameboard();

  it("places ships on the grid correctly", () => {
    board.placePlayerShip(3, "v", 0, 0);
    expect(board.getGridPlayer()[0][0].ship).not.toBeNull();
    expect(board.getGridPlayer()[1][0].ship).not.toBeNull();
    expect(board.getGridPlayer()[2][0].ship).not.toBeNull();
    expect(board.getGridPlayer()[0][3].ship).toBeNull();

    board.placePlayerShip(3, "h", 0, 1);
    expect(board.getGridPlayer()[0][1].ship).not.toBeNull();
    expect(board.getGridPlayer()[0][2].ship).not.toBeNull();
    expect(board.getGridPlayer()[0][3].ship).not.toBeNull();
    expect(board.getGridPlayer()[0][4].ship).toBeNull();

    expect(() => {
      board.placePlayerShip(3, "h", 0, 7);
    }).toThrow("Cannot place ship horizontally. It goes out of bounds.");
    expect(() => {
      board.placePlayerShip(3, "v", 7, 0);
    }).toThrow("Cannot place ship vertically. It goes out of bounds.");
    expect(() => {
      board.placePlayerShip(3, "h", 10, 10);
    }).toThrow("Coordinates are out of bounds of the board");

    expect(() => {
      board.placePlayerShip(3, "v", 0, 0);
    }).toThrow(
      "Cannot place ship. There is already a ship in the specified area."
    );
    expect(() => {
      board.placePlayerShip(3, "h", 0, 1);
    }).toThrow(
      "Cannot place ship. There is already a ship in the specified area."
    );
  });

  it("Hits ships on the board", () => {
    expect(() => {
      board.hit(10, 10);
    }).toThrow("Coordinates are out of bounds of the board");
    let shipObj = board.getGridPlayer()[0][0].ship;
    expect(
      board.getGridPlayer()[1][0].ship && board.getGridPlayer()[2][0].ship
    ).toMatchObject(shipObj);

    board.hit(0, 0);
    expect(board.getGridPlayer()[0][0].isHit).toEqual(true);
    expect(board.getGridPlayer()[1][0].isHit).toEqual(false);
    expect(board.getGridPlayer()[2][0].isHit).toEqual(false);
    expect(board.getGridPlayer()[0][0].ship.getHealth()).toEqual(2);
    expect(board.getGridPlayer()[1][0].ship.getHealth()).toEqual(2);
    expect(board.getGridPlayer()[2][0].ship.getHealth()).toEqual(2);

    expect(board.getGridPlayer()[0][0].ship.getIsSunk()).toEqual(false);
    expect(board.getGridPlayer()[1][0].ship.getIsSunk()).toEqual(false);
    expect(board.getGridPlayer()[2][0].ship.getIsSunk()).toEqual(false);

    board.hit(1, 0);
    board.hit(2, 0);
    expect(board.getGridPlayer()[0][0].ship.getHealth()).toEqual(0);
    expect(board.getGridPlayer()[1][0].ship.getHealth()).toEqual(0);
    expect(board.getGridPlayer()[2][0].ship.getHealth()).toEqual(0);
    expect(board.getGridPlayer()[0][0].ship.getIsSunk()).toEqual(true);
    expect(board.getGridPlayer()[1][0].ship.getIsSunk()).toEqual(true);
    expect(board.getGridPlayer()[2][0].ship.getIsSunk()).toEqual(true);

    expect(board.getGridPlayer()[0][1].ship.getHealth()).toEqual(3);
  });
});