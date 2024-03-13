import Ship from "./ship";

describe("Ship factory function", () => {
  it("returns object with correct properties", () => {
    expect(Ship(3)).toBeInstanceOf(Object);
    expect(Ship(3)).toHaveProperty("size", 3);
    expect(Ship(3).getHealth()).toBe(3);
  });

  it("method hit checks if ship is sunk and adjusts health if not", () => {
    let ship3 = Ship(3);

    expect(ship3.size).toBe(3);
    expect(ship3.getHealth()).toBe(3);
    ship3.hit();
    expect(ship3.getHealth()).toBe(2);
    ship3.hit();
    expect(ship3.getHealth()).toBe(1);
    ship3.hit();
    expect(ship3.getHealth()).toBe(0);
    ship3.hit();
    expect(ship3.getHealth()).toBe(0);
    expect(ship3.size).toBe(3);

    let ship0 = Ship(0);
    ship0.hit();

    expect(ship0).toHaveProperty("size", 0);
    expect(ship0.getHealth()).toBe(0);
  });
});
