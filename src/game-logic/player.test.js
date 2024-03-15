import Player from "./player.js";

describe("Player factory works", () => {
  let player = Player();
  it("places ships on the board", () => {
    player.setShipsToBoard(0, 0);
    expect(player.getPlayerBoard()[0][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[1][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][0].ship).not.toBeNull();
    expect(player.getPlayerBoard()[4][0].ship).not.toBeNull();

    player.setShipsToBoard(1, 2);
    expect(player.getPlayerBoard()[1][2].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][2].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][2].ship).not.toBeNull();
    expect(player.getPlayerBoard()[4][2].ship).not.toBeNull();

    player.setShipsToBoard(1, 3);
    expect(player.getPlayerBoard()[1][3].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][3].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][3].ship).not.toBeNull();

    player.setShipsToBoard(1, 5);
    expect(player.getPlayerBoard()[1][5].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][5].ship).not.toBeNull();
    expect(player.getPlayerBoard()[3][5].ship).not.toBeNull();

    player.setShipsToBoard(1, 6);
    expect(player.getPlayerBoard()[1][6].ship).not.toBeNull();
    expect(player.getPlayerBoard()[2][6].ship).not.toBeNull();

    //After placing all 5 ships the function returns that all ships
    //have been placed even if the coordinates are out of bounds
    expect(player.setShipsToBoard(1, 7)).toBe("All ships placed");
    expect(player.setShipsToBoard(10, 10)).toBe("All ships placed");
  });
});
