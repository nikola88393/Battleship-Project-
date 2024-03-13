export default function Ship(length) {
  const size = length;
  let health = size;
  let isSunk = false;

  const getHealth = () => {
    return health;
  };

  const getIsSunk = () => {
    return isSunk;
  };

  const hit = () => {
    if (health === 0) {
      isSunk = true;
    }
    if (!isSunk) {
      health--;
    }
  };

  return {
    size,
    getHealth,
    getIsSunk,
    hit,
  };
}
