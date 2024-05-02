import Player from "./player";

describe("Player factory works", () => {
  const player = Player();
  it("places ships on the board while keeping constraints", () => {
    player.setShipsToBoard(0, 0, "v");
    expect(player.getPlayerBoard()[0][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[4][0].ship).not.toBeNull();

    // player.setShipsToBoard(1, 2);
    player.setShipsToBoard(0, 1, "v");
    expect(player.getPlayerBoard()[0][1].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][1].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][1].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][1].ship).not.toBeNull();

    player.setShipsToBoard(0, 2, "v");
    expect(player.getPlayerBoard()[0][2].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][2].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][2].ship).not.toBeNull();

    player.setShipsToBoard(0, 3, "v");
    expect(player.getPlayerBoard()[0][3].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][3].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][3].ship).not.toBeNull();

    // Function throws if there is a ship placed in the cell
    const test = player.setShipsToBoard(0, 3, "v");
    expect(test).toBeInstanceOf(Error);

    player.setShipsToBoard(0, 4, "v");
    expect(player.getPlayerBoard()[0][4].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][4].ship).not.toBeNull();

    // After placing all 5 ships the function returns that all ships
    // have been placed even if the coordinates are out of bounds
    expect(player.setShipsToBoard(1, 7, "v")).toBeUndefined();
    expect(player.setShipsToBoard(10, 10, "v")).toBeUndefined();
  });
});
